import postsService from '@/api/postsService';
import type { Module } from 'vuex';
import type { RootState } from '../index';

export interface IPost {
  userId: number;
  id: number;
  title: string;
  body: string;
}

interface IPostWithIsWatched extends IPost {
  isWatched: boolean;
}

export interface IPostsModuleState {
  posts: IPostWithIsWatched[];
}

export const postsModule: Module<IPostsModuleState, RootState> = {
  namespaced: true,
  state: () => ({
    posts: []
  }),
  getters: {
    totalPostsCount: (state) => state.posts.length
  },
  mutations: {
    setPosts: (state, data: IPost[]) => {
      state.posts = data.map((post) => ({ ...post, isWatched: false }));
    },
    togglePostIsWatched: (state, id: number) => {
      const post = state.posts.find((post) => post.id === id);

      if (post) {
        post.isWatched = !post.isWatched;
      }
    },
    deletePost: (state, id: number) => {
      state.posts = state.posts.filter((post) => post.id !== id);
    },
    getPostsFromLocalStorage: (state) => {
      const postsJSON = localStorage.getItem('posts');

      if (typeof postsJSON === 'string') {
        const postsFromLocalStorage = JSON.parse(postsJSON);

        if (Array.isArray(postsFromLocalStorage) && postsFromLocalStorage[0].id) {
          state.posts = postsFromLocalStorage as IPostWithIsWatched[];
        }
      }
    }
  },
  actions: {
    getPosts: async (context) => {
      const { data } = await postsService.getPosts();

      context.commit('setPosts', data);
    }
  }
};
