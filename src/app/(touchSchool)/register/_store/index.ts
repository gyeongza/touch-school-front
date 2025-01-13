import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import type { RegisterFunnelStep } from '../_components/register-funnel';

interface RegisterState {
  currentStep: RegisterFunnelStep;
  userInfo: {
    name: string;
    phoneNumber: string;
    schoolName: string;
    grade: string;
    class: string;
  };
  actions: RegisterActions;
}

interface RegisterActions {
  goNext: () => void;
  goBack: () => void;
  setPhoneNumber: (phoneNumber: string) => void;
  setName: (name: string) => void;
  setSchoolInfo: (schoolName: string, grade: string, className: string) => void;
  reset: () => void;
}

const STEPS: RegisterFunnelStep[] = ['name', 'school', 'class'];

const useRegisterStore = create<RegisterState>()(
  immer((set) => ({
    currentStep: 'name',
    userInfo: {
      name: '',
      phoneNumber: '',
      schoolName: '',
      grade: '',
      class: '',
    },
    actions: {
      goNext: () => {
        set((state) => {
          const currentIndex = STEPS.indexOf(state.currentStep);
          if (currentIndex < STEPS.length - 1) {
            state.currentStep = STEPS[currentIndex + 1];
          }
        });
      },
      goBack: () => {
        set((state) => {
          const currentIndex = STEPS.indexOf(state.currentStep);
          if (currentIndex > 0) {
            state.currentStep = STEPS[currentIndex - 1];
          }
        });
      },
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
      setSchoolInfo: (schoolName, grade, className) => {
        set((state) => {
          state.userInfo.schoolName = schoolName;
          state.userInfo.grade = grade;
          state.userInfo.class = className;
        });
      },
      reset: () => {
        set((state) => {
          state.currentStep = 'name';
          state.userInfo = {
            ...state.userInfo,
            name: '',
            schoolName: '',
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
