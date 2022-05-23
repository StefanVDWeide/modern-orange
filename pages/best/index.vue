<template>
  <div v-if="storyIDs">
    <ClientOnly>
      <div v-for="(id, index) in storyIDs" v-bind:key="index">
        <Suspense>
          <IndividualStoryInFeed :itemID="id" :itemRanking="index" />
          <template #fallback> <IndividualStoryInFeedLoader /> </template>
        </Suspense>
      </div>
    </ClientOnly>
    <div class="mb-8">
      <FetchMoreStoriesButton @click="fetchAdditionalTopStories" />
    </div>
  </div>
</template>

<script setup>
// Component name
name: "bestStories";

// Meta Data
useHead({
  title: "Best Stories | Modern Orange",
});

// Reactive variables
const storyIDs = ref([]);
const storyKeys = ref([]);

// TODO: Add error handling
// Fetch user data
const { data, error } = await useFetch(
  `${useRuntimeConfig().apiBaseUrl}/api/getinitialstories/best`
);

storyIDs.value = data.value.storyIDs;
storyKeys.value = data.value.itemIDs;

// TODO: Add error handling
// Methods
const fetchAdditionalTopStories = async () => {
  const data = await $fetch(
    `${useRuntimeConfig().apiBaseUrl}/api/getadditionalstories/best`,
    {
      method: "POST",
      body: {
        lastKey: (
          Number(storyKeys.value[storyKeys.value.length - 1]) + 1
        ).toString(),
      },
    }
  );
  for (const item in data) {
    storyIDs.value.push(data[item]);
    storyKeys.value.push(item);
  }
};
</script>
