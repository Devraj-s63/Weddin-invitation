import { useState, useEffect, useCallback } from 'react';
import {
  getOrRecordRealVisitor,
  toDevanagariNumerals,
  formatStandardNumber,
  getLocalBlessingCount,
  addLocalBlessing,
} from '../utils/visitorCounter';
import { WEDDING_DATA } from '../data/weddingData';

export interface UseVisitorCounterReturn {
  count: number;
  formattedStandard: string;
  formattedDevanagari: string;
  isLoading: boolean;
  isNewPerson: boolean;
  blessingCount: number;
  sendBlessing: () => number;
  hasBlessed: boolean;
}

export function useVisitorCounter(): UseVisitorCounterReturn {
  const config = WEDDING_DATA.visitorCounter;
  const namespace = config?.namespace || 'devraj-madhu-wedding-2026-v2';
  const key = config?.key || 'visitors';

  const [count, setCount] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('rj_wedding_real_person_count_v2');
      return saved ? parseInt(saved, 10) || 1 : 1;
    } catch {
      return 1;
    }
  });

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isNewPerson, setIsNewPerson] = useState<boolean>(false);
  const [blessingCount, setBlessingCount] = useState<number>(() => getLocalBlessingCount());
  const [hasBlessed, setHasBlessed] = useState<boolean>(() => getLocalBlessingCount() > 0);

  useEffect(() => {
    let isMounted = true;

    async function initRealCounter() {
      try {
        const result = await getOrRecordRealVisitor(namespace, key);
        if (isMounted) {
          setCount(result.realCount);
          setIsNewPerson(result.isNewPerson);
          setIsLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    initRealCounter();

    return () => {
      isMounted = false;
    };
  }, [namespace, key]);

  const formattedStandard = formatStandardNumber(count);
  const formattedDevanagari = toDevanagariNumerals(count);

  const sendBlessing = useCallback(() => {
    const updated = addLocalBlessing();
    setBlessingCount(updated);
    setHasBlessed(true);
    return updated;
  }, []);

  return {
    count,
    formattedStandard,
    formattedDevanagari,
    isLoading,
    isNewPerson,
    blessingCount,
    sendBlessing,
    hasBlessed,
  };
}
