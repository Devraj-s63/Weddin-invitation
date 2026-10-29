/**
 * Royal Rajputana Wedding Visitor Counter Utility
 * Provides resilient, privacy-friendly visitor counting with:
 * - Session-based deduplication (counts 1 visit per session)
 * - Offline caching via localStorage (never breaks or displays 0)
 * - AbortController timeout protection
 * - Authentic Devanagari numerals converter
 */

const API_BASE = 'https://countapi.mileshilliard.com/api/v1';
const STORAGE_COUNT_KEY = 'royal_wedding_visitor_cache_v1';
const SESSION_VISIT_KEY = 'royal_wedding_session_visited_v1';
const BLESSINGS_COUNT_KEY = 'royal_wedding_blessings_given_v1';
const DEFAULT_TIMEOUT_MS = 4000;

/**
 * Converts any number or numeric string to authentic Devanagari numerals
 * e.g., 1008 -> १,००८
 */
export function toDevanagariNumerals(num: number | string): string {
  const devanagariDigits = ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९'];
  const formatted = typeof num === 'number' ? num.toLocaleString('en-IN') : String(num);
  return formatted.replace(/[0-9]/g, (digit) => devanagariDigits[parseInt(digit, 10)] ?? digit);
}

/**
 * Formats a number with Indian thousand separators (e.g., 1,00,000 or 1,008)
 */
export function formatIndianNumber(num: number): string {
  return num.toLocaleString('en-IN');
}

/**
 * Safely fetches with an automatic abort timeout
 */
async function fetchWithTimeout(url: string, timeoutMs: number = DEFAULT_TIMEOUT_MS): Promise<Response> {
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

export interface VisitorCountResult {
  rawCount: number;
  isNewSession: boolean;
  fromCache: boolean;
}

/**
 * Records a new visit if not already visited in this session,
 * or simply retrieves the current visit count if already counted.
 */
export async function recordOrGetVisit(apiKey: string): Promise<VisitorCountResult> {
  let isNewSession = false;
  let cachedCount = 1;

  // 1. Read cached count from localStorage
  try {
    const saved = localStorage.getItem(STORAGE_COUNT_KEY);
    if (saved) {
      const parsed = parseInt(saved, 10);
      if (!isNaN(parsed) && parsed > 0) {
        cachedCount = parsed;
      }
    }
  } catch {
    // LocalStorage might be disabled or full; ignore safely
  }

  // 2. Check if this session already counted a hit
  try {
    const hasVisitedThisSession = sessionStorage.getItem(SESSION_VISIT_KEY);
    isNewSession = !hasVisitedThisSession;
  } catch {
    isNewSession = true;
  }

  // 3. Determine endpoint: 'hit' for new session, 'get' for returning session
  const endpoint = isNewSession ? `${API_BASE}/hit/${apiKey}` : `${API_BASE}/get/${apiKey}`;

  try {
    const res = await fetchWithTimeout(endpoint);

    if (res.ok) {
      const data = await res.json();
      const val = typeof data.value === 'number' ? data.value : parseInt(data.value, 10);

      if (!isNaN(val) && val > 0) {
        // Mark session as visited
        try {
          sessionStorage.setItem(SESSION_VISIT_KEY, 'true');
        } catch {
          // ignore
        }

        // Cache latest count
        try {
          localStorage.setItem(STORAGE_COUNT_KEY, String(val));
        } catch {
          // ignore
        }

        return {
          rawCount: val,
          isNewSession,
          fromCache: false,
        };
      }
    }
  } catch (err) {
    console.warn('[VisitorCounter] Network request failed, using cached count:', err);
  }

  // 4. Fallback: If network failed but this was a new session, increment cached count locally
  if (isNewSession) {
    cachedCount += 1;
    try {
      sessionStorage.setItem(SESSION_VISIT_KEY, 'true');
      localStorage.setItem(STORAGE_COUNT_KEY, String(cachedCount));
    } catch {
      // ignore
    }
  }

  return {
    rawCount: cachedCount,
    isNewSession,
    fromCache: true,
  };
}

/**
 * Digital blessing interaction counter (stored locally per device)
 */
export function getLocalBlessingsCount(): number {
  try {
    const val = localStorage.getItem(BLESSINGS_COUNT_KEY);
    return val ? parseInt(val, 10) || 0 : 0;
  } catch {
    return 0;
  }
}

export function incrementLocalBlessing(): number {
  try {
    const current = getLocalBlessingsCount();
    const updated = current + 1;
    localStorage.setItem(BLESSINGS_COUNT_KEY, String(updated));
    return updated;
  } catch {
    return 1;
  }
}
