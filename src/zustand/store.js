import create from 'zustand';
import { getToken } from '../utils/cookies';

const useStore = create((set) => ({
  token: '0',
  setToken: () => set((state) => ({ token: getToken() })),
  removeToken: () => set({ token: '' }),
}));

export { useStore };
