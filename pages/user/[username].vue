<template>
  <div v-if="userObject">
    <h1 class="text-6xl font-bold mb-4">{{ userObject.value.id }}</h1>
    <p v-html="userObject.value.about" class="text-xl mb-8" />
    <ul class="space-x-8">
      <li class="inline-block">
        <span class="block text-2xl font-semibold">Created</span>
        <span class="block">{{
          formatCreatedDate(userObject.value.created)
        }}</span>
      </li>
      <li class="inline-block">
        <span class="block text-2xl font-semibold">Karma</span>
        <span class="block">{{ userObject.value.karma }}</span>
      </li>
    </ul>
  </div>
</template>

<script setup>
// Name
name: "IndivdualUser";

// Route data
const route = useRoute();

// Meta Data
useHead({
  title: `${route.params.username} | Modern Orange`,
});

// Reactive variables
const userObject = ref({});

// TODO: Add error handling
// Fetch user data
const { data, error } = await useFetch(
  `${useRuntimeConfig().apiBaseUrl}/api/getindividualuser/${
    route.params.username
  }`
);

userObject.value = data;

// Methods
const formatCreatedDate = (timestamp) => {
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
