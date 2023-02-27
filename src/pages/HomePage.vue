<template>
  <h2>This is a Home page</h2>
  
  <div>{{ title }}</div>
  <div>Counter: {{ counter }}</div>
  <div>Double counter: {{ doubleCounter }}</div>

  <button @click="increment">Increment</button>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useStore } from '@/store';

const store = useStore();

const title = computed(() => store.state.couterModule.title);
const counter = computed(() => store.state.couterModule.counter);
const doubleCounter = computed(() => store.getters['couterModule/doubleCounter']);

const increment = () => store.commit('couterModule/increment');
</script>
