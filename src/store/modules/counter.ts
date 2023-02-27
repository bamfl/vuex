import type { Module } from 'vuex';
import type { RootState } from '../index';

export interface ICouterModuleState {
  counter: number;
  title: string;
}

export const couterModule: Module<ICouterModuleState, RootState> = {
  namespaced: true,
  state: (): ICouterModuleState => ({
    counter: 0,
    title: 'Counter State',
  }),
  getters: {
    doubleCounter: (state) => state.counter * 2
  },
  mutations: {
    increment(state) {
      state.counter++;
    },
    decrement(state) {
      state.counter--;
    }
  }
};
