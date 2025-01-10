import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

interface RegisterState {
  userState: UserState;
  registerActions: RegisterActions;
}

interface UserState {
  name: string;
  phoneNumber: string;
  schoolName: string;
  grade: string;
  class: string;
}

interface RegisterActions {
  setUser: (user: UserState) => void;
  reset: () => void;
}
export const useRegisterStore = create<RegisterState>()(
  immer((set) => ({
    userState: {
      name: '',
      phoneNumber: '',
      schoolName: '',
      grade: '',
      class: '',
    },
    registerActions: {
      setUser: (user) => {
        set((state) => {
          state.userState = user;
        });
      },
      reset: () => {
        set((state) => {
          state.userState = { name: '', phoneNumber: '', schoolName: '', grade: '', class: '' };
        });
      },
    },
  })),
);

// state selectors
export const useUserState = () => useRegisterStore((state) => state.userState);

// actions selector
export const useRegisterActions = () => useRegisterStore((state) => state.registerActions);
