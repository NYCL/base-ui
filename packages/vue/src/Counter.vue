<template>
  <div class="p-6 border-2 border-emerald-400 bg-emerald-50 rounded-xl my-4 text-center">
    <h3 class="text-xl font-bold text-emerald-900 mb-2">Vue Component 💚</h3>
    <p class="text-emerald-700 font-mono text-lg mb-4">Count: {{ count }}</p>
    <button 
      @click="count++"
      class="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors cursor-pointer font-semibold"
    >
      Increment Vue
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const count = ref(0);
</script>