'use client';

import type { ReactElement, ReactNode } from 'react';
import { createContext, useContext, useMemo } from 'react';

interface FunnelProps<T> {
  children: ReactNode;
  currentStep: T;
}

interface StepProps<T> {
  children: ReactElement;
  name: T;
}

const StepContext = createContext<unknown>(null);

/**
 * 여러 단계로 구성된 퍼널 플로우를 관리하기 위한 커스텀 훅입니다.
 *
 * @template T 단계의 타입입니다.
 * @param {T[]} steps 단계의 배열입니다.
 * @param {T} [defaultStep] 시작할 기본 단계입니다.
 */
function useFunnel<T>() {
  const Funnel = useMemo(() => {
    return function MemoFunnel({ children, currentStep }: FunnelProps<T>) {
      return <StepContext.Provider value={currentStep}>{children}</StepContext.Provider>;
    };
  }, []);

  const Step = useMemo(() => {
    return function MemoStep({ name, children }: StepProps<T>) {
      const currentFunnelStep = useContext(StepContext);

      if (currentFunnelStep !== name) {
        return null;
      }

      return children;
    };
  }, []);

  return {
    Funnel,
    Step,
  };
}

export default useFunnel;
