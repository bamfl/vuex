<template>
  <h2>Posts page</h2>

  <div style="margin-bottom: 10px">Total posts count: {{ totalPostsCount }}</div>

  <button @click="getPosts">Get posts</button>

  <div v-for="post in posts" :key="post.id" style="margin: 10px 0">
    {{ post.id }}: {{ post.title }} - isWatched: {{ post.isWatched }}

    <div>
      <button @click="deletePost(post.id)" style="margin-right: 10px">Delete</button>

      <button @click="togglePostIsWatched(post.id)">Toggle isWatched</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, watch } from 'vue';
import { computed } from 'vue';
import { useStore } from '@/store';

const store = useStore();

const posts = computed(() => store.state.postsModule.posts);
const totalPostsCount = computed(() => store.getters['postsModule/totalPostsCount']);

const getPosts = () => store.dispatch('postsModule/getPosts');
const togglePostIsWatched = (id: number) => store.commit('postsModule/togglePostIsWatched', id);
const deletePost = (id: number) => store.commit('postsModule/deletePost', id);
const getPostsFromLocalStorage = () => store.commit('postsModule/getPostsFromLocalStorage');

watch(
  posts,
  (newVal) => {
    localStorage.setItem('posts', JSON.stringify(newVal));
  },
  { deep: true }
);

onMounted(() => {
  getPostsFromLocalStorage();
});
</script>
