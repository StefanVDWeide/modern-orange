<template>
  <div v-if="userObject">
    <h1 class="text-6xl font-bold mb-4">{{ userObject.id }}</h1>
    <p v-html="userObject.about" class="text-xl mb-8" />
    <ul class="space-x-8">
      <li class="inline-block">
        <span class="block text-2xl font-semibold">Created</span>
        <span class="block">{{
          formatCreatedDate(userObject.created)
        }}</span>
      </li>
      <li class="inline-block">
        <span class="block text-2xl font-semibold">Karma</span>
        <span class="block">{{ userObject.karma }}</span>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
// Route data
const route = useRoute();

// Meta Data
useHead({
  title: `${route.params.username} | Modern Orange`,
});

interface userObject {
  id?: number,
  about?: string,
  created?: number
  karma?: number
}

// Reactive variables
const userObject = ref<userObject>({});

// TODO: Add error handling
// Fetch user data
const { data } = await useFetch<userObject>(
  `/api/getindividualuser/${route.params.username
  }`
);

userObject.value = data.value;

// Methods
const formatCreatedDate = (timestamp: number): string => {
  const date = new Date(timestamp * 1000);
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return `${date.getDate()} ${months[date.getMonth()]}, ${date.getFullYear()}`;
};
</script>
