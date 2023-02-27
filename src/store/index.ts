import type { InjectionKey } from 'vue';
import { createStore, useStore as baseUseStore, Store } from 'vuex';
import { couterModule, type ICouterModuleState } from './modules/counter';
import { postsModule, type IPostsModuleState } from './modules/posts';

export interface RootState {
  couterModule: ICouterModuleState;
  postsModule: IPostsModuleState
}

export const key: InjectionKey<Store<RootState>> = Symbol();

export const store = createStore<RootState>({
  modules: {
    couterModule,
    postsModule
  }
});

export function useStore() {
  return baseUseStore(key);
}
