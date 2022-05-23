<template>
  <div class="flex items-center justify-center min-h-screen">
    <div>
      <div v-if="error.statusCode === '404'" class="mb-4">
        <h1 class="text-6xl font-semibold">404 - Page not found!</h1>
      </div>
      <div v-else>
        <h1 class="text-6xl font-bold">
          {{ error.statusCode }} - Internal error!
        </h1>
      </div>
      <div class="flex justify-center">
        <button
          @click="handleError"
          class="
            px-6
            py-3
            text-xl
            font-medium
            text-white
            bg-orange-600
            rounded-md
            hover:bg-orange-700
          "
        >
          Back
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  error: Object,
});

const handleError = () => clearError({ redirect: "/" });
</script>
