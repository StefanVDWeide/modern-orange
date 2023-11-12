<template>
  <div v-if="storyIDs">
    <ClientOnly>
      <div v-for="(id, index) in storyIDs" v-bind:key="index">
        <Suspense>
          <IndividualStoryInFeed :itemID="id" :itemRanking="index" />
          <template #fallback>
            <IndividualStoryInFeedLoader />
          </template>
        </Suspense>
      </div>
    </ClientOnly>
    <div class="mb-8">
      <FetchMoreStoriesButton @click="fetchAdditionalTopStories" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { hash } from 'ohash'

// Define the types for your data
interface APIBody {
  storyIDs: number[],
  itemIDs: number[],
}

interface FetchResponse {
  storyIDs: number[];
  itemIDs: number[];
}

// Reactive variables
const storyIDs = ref<number[]>([]);
const storyKeys = ref<number[]>([]);

// Fetch user data with better error handling
try {
  const { data } = await useFetch<APIBody>(`/api/getinitialstories/top`, {
    key: hash(['api-fetch']),
  });

  if (data.value?.storyIDs && data.value?.itemIDs) {
    storyIDs.value = data.value.storyIDs;
    storyKeys.value = data.value.itemIDs;
  } else {
    // Handle the case where data is not in the expected format
    console.error('Invalid data format received from API');
  }
} catch (error) {
  console.error('Failed to fetch initial stories:', error);
}

// Method to fetch additional stories with better error handling
const fetchAdditionalTopStories = async () => {
  try {
    const response = await $fetch<FetchResponse>(`/api/getadditionalstories/top`, {
      method: "POST",
      body: {
        lastKey: (
          Number(storyKeys.value[storyKeys.value.length - 1]) + 1
        ).toString(),
      },
    });

    response.storyIDs.forEach((id, index) => {
      storyIDs.value.push(id);
      storyKeys.value.push(response.itemIDs[index]);
    });
  } catch (error) {
    console.error('Failed to fetch additional stories:', error);
  }
};
</script>
