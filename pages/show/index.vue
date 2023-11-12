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
// Meta Data
useHead({
  title: "Show HN | Modern Orange",
});

// Reactive variables
const storyIDs = ref([]);
const storyKeys = ref([]);

// useFetch interfact 
interface APIBody {
  storyIDs: string[],
  itemIDs: string[],
}

// TODO: Add error handling
// Fetch user data
const { data } = await useFetch<APIBody>(
  `/api/getinitialstories/show`
);

storyIDs.value = data.value.storyIDs;
storyKeys.value = data.value.itemIDs;

// TODO: Add error handling
// Methods
const fetchAdditionalTopStories = async () => {
  const data: string[] = await $fetch(
    `/api/getadditionalstories/show`,
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
