import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import type { RegisterFunnelStep } from '../_components/user-info/register-funnel';

interface RegisterState {
  currentStep: RegisterFunnelStep;
  userInfo: {
    name: string;
    phoneNumber: string;
    school: {
      id: number | undefined;
      name: string;
    };
    grade: string;
    class: string;
  };
  actions: RegisterActions;
}

interface RegisterActions {
  setPhoneNumber: (phoneNumber: string) => void;
  setName: (name: string) => void;
  setSchoolInfo: (updates: Partial<Pick<RegisterState['userInfo'], 'school' | 'grade' | 'class'>>) => void;
  goNext: () => void;
  goBack: () => void;
  reset: () => void;
}

const STEPS: RegisterFunnelStep[] = ['name', 'school', 'class'];

const useRegisterStore = create<RegisterState>()(
  immer((set) => ({
    currentStep: 'name',
    userInfo: {
      name: '',
      phoneNumber: '',
      school: {
        id: undefined,
        name: '',
      },
      grade: '',
      class: '',
    },
    actions: {
      setPhoneNumber: (phoneNumber) => {
        set((state) => {
          state.userInfo.phoneNumber = phoneNumber;
        });
      },
      setName: (name) => {
        set((state) => {
          state.userInfo.name = name;
        });
      },
      setSchoolInfo: (updates) => {
        set((state) => {
          state.userInfo = {
            ...state.userInfo,
            ...updates,
          };
        });
      },
      goNext: () => {
        set((state) => {
          const currentIndex = STEPS.indexOf(state.currentStep);
          if (currentIndex < STEPS.length - 1) {
            const nextStep = STEPS[currentIndex + 1];
            if (nextStep) {
              state.currentStep = nextStep;
            }
          }
        });
      },
      goBack: () => {
        set((state) => {
          const currentIndex = STEPS.indexOf(state.currentStep);
          if (currentIndex > 0) {
            const prevStep = STEPS[currentIndex - 1];
            if (prevStep) {
              state.currentStep = prevStep;
            }
          }
        });
      },
      reset: () => {
        set((state) => {
          state.currentStep = 'name';
          state.userInfo = {
            ...state.userInfo,
            name: '',
            school: {
              id: undefined,
              name: '',
            },
            grade: '',
            class: '',
          };
        });
      },
    },
  })),
);

// state selectors
export const useRegisterState = () => useRegisterStore((state) => state);
export const useUserInfo = () => useRegisterStore((state) => state.userInfo);
export const useCurrentStep = () => useRegisterStore((state) => state.currentStep);
export const useIsLastStep = () => useRegisterStore((state) => STEPS.indexOf(state.currentStep) === STEPS.length - 1);

// actions selector
export const useRegisterActions = () => useRegisterStore((state) => state.actions);
