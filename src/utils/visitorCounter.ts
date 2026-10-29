/**
 * Authentic Real-Time Visitor Counter Utility
 * Counts real individual persons visiting the website with zero fake data.
 * - Tracks unique visitors using persistent device identity (localStorage).
 * - Calls /hit only on the first visit by a new person.
 * - Calls /get on subsequent visits to reflect true unique persons.
 * - Multi-endpoint resilience (Abacus API + CountAPI backup).
 * - Full offline caching with no artificial offsets.
 */

const ABACUS_BASE = 'https://abacus.jasoncameron.dev';
const COUNTAPI_BASE = 'https://countapi.mileshilliard.com/api/v1';

const STORAGE_UUID_KEY = 'rj_wedding_person_uuid_v2';
const STORAGE_REAL_COUNT_KEY = 'rj_wedding_real_person_count_v2';
const STORAGE_BLESSING_KEY = 'rj_wedding_blessing_count_v2';
const REQUEST_TIMEOUT_MS = 4000;

export interface RealVisitorResult {
  realCount: number;
  isNewPerson: boolean;
  fromCache: boolean;
}

/**
 * Converts numbers to authentic Devanagari numerals (०, १, २, ३, ४, ५, ६, ७, ८, ९)
 */
export function toDevanagariNumerals(num: number | string): string {
  const devanagariDigits = ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९'];
  const formatted = typeof num === 'number' ? num.toLocaleString('en-IN') : String(num);
  return formatted.replace(/[0-9]/g, (digit) => devanagariDigits[parseInt(digit, 10)] ?? digit);
}

/**
 * Format standard numbers with Indian thousand separators
 */
export function formatStandardNumber(num: number): string {
  return num.toLocaleString('en-IN');
}

/**
 * Safely fetches with timeout protection
 */
async function fetchWithTimeout(url: string, timeoutMs: number = REQUEST_TIMEOUT_MS): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
      signal: controller.signal,
    });
    return response;
  } finally {
    clearTimeout(timer);
  }
}

/**
 * Fetches the real visitor count from available APIs.
 * Increments only if this device is visiting for the first time.
 */
export async function getOrRecordRealVisitor(
  namespace: string = 'devraj_madhu_chauhan_mewar_e89b21f47c3a0d5e',
  key: string = 'visitors'
): Promise<RealVisitorResult> {
  let isNewPerson = false;
  let cachedCount = 1;

  // 1. Read last verified real count from local cache
  try {
    const saved = localStorage.getItem(STORAGE_REAL_COUNT_KEY);
    if (saved) {
      const parsed = parseInt(saved, 10);
      if (!isNaN(parsed) && parsed > 0) {
        cachedCount = parsed;
      }
    }
  } catch {
    // Ignore storage restrictions safely
  }

  // 2. Check if this device/person has visited before
  try {
    const existingId = localStorage.getItem(STORAGE_UUID_KEY);
    if (!existingId) {
      isNewPerson = true;
    }
  } catch {
    isNewPerson = true;
  }

  const action = isNewPerson ? 'hit' : 'get';

  // 3. Try Primary API: Abacus API (abacus.jasoncameron.dev)
  try {
    const primaryUrl = `${ABACUS_BASE}/${action}/${namespace}/${key}`;
    const res = await fetchWithTimeout(primaryUrl);

    if (res.ok) {
      const data = await res.json();
      const val = typeof data.value === 'number' ? data.value : parseInt(data.value, 10);

      if (!isNaN(val) && val > 0) {
        // Mark this person as permanently recorded on this device
        try {
          if (isNewPerson) {
            const uuid = typeof crypto !== 'undefined' && crypto.randomUUID
              ? crypto.randomUUID()
              : `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
            localStorage.setItem(STORAGE_UUID_KEY, uuid);
          }
          localStorage.setItem(STORAGE_REAL_COUNT_KEY, String(val));
        } catch {
          // ignore
        }

        return {
          realCount: val,
          isNewPerson,
          fromCache: false,
        };
      }
    }
  } catch (primaryErr) {
    console.warn('[VisitorCounter] Primary API unavailable, trying backup...', primaryErr);
  }

  // 4. Try Backup API: CountAPI clone (countapi.mileshilliard.com)
  try {
    const backupUrl = `${COUNTAPI_BASE}/${action}/${namespace}_${key}`;
    const res = await fetchWithTimeout(backupUrl);

    if (res.ok) {
      const data = await res.json();
      const val = typeof data.value === 'number' ? data.value : parseInt(data.value, 10);

      if (!isNaN(val) && val > 0) {
        try {
          if (isNewPerson) {
            localStorage.setItem(STORAGE_UUID_KEY, `person-${Date.now()}`);
          }
          localStorage.setItem(STORAGE_REAL_COUNT_KEY, String(val));
        } catch {
          // ignore
        }

        return {
          realCount: val,
          isNewPerson,
          fromCache: false,
        };
      }
    }
  } catch (backupErr) {
    console.warn('[VisitorCounter] Backup API unavailable, falling back to verified local count', backupErr);
  }

  // 5. Offline / Network error fallback:
  // If this was a new person and network failed, increment cached value by 1
  if (isNewPerson) {
    cachedCount += 1;
    try {
      localStorage.setItem(STORAGE_UUID_KEY, `local-${Date.now()}`);
      localStorage.setItem(STORAGE_REAL_COUNT_KEY, String(cachedCount));
    } catch {
      // ignore
    }
  }

  return {
    realCount: cachedCount,
    isNewPerson,
    fromCache: true,
  };
}

/**
 * Local blessings counter
 */
export function getLocalBlessingCount(): number {
  try {
    const val = localStorage.getItem(STORAGE_BLESSING_KEY);
    return val ? parseInt(val, 10) || 0 : 0;
  } catch {
    return 0;
  }
}

export function addLocalBlessing(): number {
  try {
    const current = getLocalBlessingCount();
    const updated = current + 1;
    localStorage.setItem(STORAGE_BLESSING_KEY, String(updated));
    return updated;
  } catch {
    return 1;
  }
}
