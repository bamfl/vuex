<template>
  <h2>This is an About page</h2>

  <div>Counter: {{ counter }}</div>

  <button @click="decrement">Decrement</button>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useStore } from '@/store';

const store = useStore();

const counter = computed(() => store.state.couterModule.counter);

const decrement = () => store.commit('couterModule/decrement');
</script>
