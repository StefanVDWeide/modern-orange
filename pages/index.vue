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

// Reactive variables
const storyIDs = ref<number[]>([]);
const storyKeys = ref<number[]>([]);

// useFetch interfact 
interface APIBody {
  storyIDs: number[],
  itemIDs: number[],
}

// TODO: Add error handling
// Fetch user data
const { data } = await useFetch<APIBody>(
  `${useRuntimeConfig().apiBaseUrl}/api/getinitialstories/top`,
  {
    key: hash(['api-fetch']),
  }
);

storyIDs.value = data.value.storyIDs;
storyKeys.value = data.value.itemIDs;

// TODO: Add error handling
// Methods
const fetchAdditionalTopStories = async () => {
  const data: number[] = await $fetch(
    `${useRuntimeConfig().apiBaseUrl}/api/getadditionalstories/top`,
    {
      method: "POST",
      body: {
        lastKey: (
          Number(storyKeys.value[storyKeys.value.length - 1]) + 1
        ).toString(),
      },
    }
  );
  let item: any;
  for (item in data) {
    storyIDs.value.push(data[item]);
    storyKeys.value.push(item);
  }
};
</script>
