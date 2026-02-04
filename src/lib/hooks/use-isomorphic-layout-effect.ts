import { useEffect, useLayoutEffect } from 'react';

// SSR-safe layout effect hook
export const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;
