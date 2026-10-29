import { useState, useEffect, useCallback } from 'react';
import {
  recordOrGetVisit,
  toDevanagariNumerals,
  formatIndianNumber,
  getLocalBlessingsCount,
  incrementLocalBlessing,
} from '../utils/visitorCounter';
import { WEDDING_DATA } from '../data/weddingData';

export interface UseVisitorCounterReturn {
  rawCount: number;
  totalCount: number;
  formattedStandard: string;
  formattedDevanagari: string;
  isLoading: boolean;
  isNewSession: boolean;
  numeralMode: 'devanagari' | 'standard';
  toggleNumeralMode: () => void;
  blessingCount: number;
  handleSendBlessing: () => number;
  hasBlessed: boolean;
}

export function useVisitorCounter(): UseVisitorCounterReturn {
  const config = WEDDING_DATA.visitorCounter;
  const baseOffset = config?.enableOffset ? (config.baseAuspiciousCount || 0) : 0;
  const apiKey = config?.apiKey || 'devraj_madhu_royal_wedding_2026';

  const [rawCount, setRawCount] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('royal_wedding_visitor_cache_v1');
      return saved ? parseInt(saved, 10) || 1 : 1;
    } catch {
      return 1;
    }
  });

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isNewSession, setIsNewSession] = useState<boolean>(false);
  const [numeralMode, setNumeralMode] = useState<'devanagari' | 'standard'>('devanagari');
  const [blessingCount, setBlessingCount] = useState<number>(() => getLocalBlessingsCount());
  const [hasBlessed, setHasBlessed] = useState<boolean>(() => getLocalBlessingsCount() > 0);

  useEffect(() => {
    let isMounted = true;

    async function initCounter() {
      try {
        const result = await recordOrGetVisit(apiKey);
        if (isMounted) {
          setRawCount(result.rawCount);
          setIsNewSession(result.isNewSession);
          setIsLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    initCounter();

    return () => {
      isMounted = false;
    };
  }, [apiKey]);

  const totalCount = baseOffset + rawCount;
  const formattedStandard = formatIndianNumber(totalCount);
  const formattedDevanagari = toDevanagariNumerals(totalCount);

  const toggleNumeralMode = useCallback(() => {
    setNumeralMode((prev) => (prev === 'devanagari' ? 'standard' : 'devanagari'));
  }, []);

  const handleSendBlessing = useCallback(() => {
    const updated = incrementLocalBlessing();
    setBlessingCount(updated);
    setHasBlessed(true);
    return updated;
  }, []);

  return {
    rawCount,
    totalCount,
    formattedStandard,
    formattedDevanagari,
    isLoading,
    isNewSession,
    numeralMode,
    toggleNumeralMode,
    blessingCount,
    handleSendBlessing,
    hasBlessed,
  };
}
