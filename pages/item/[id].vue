<template>
  <div v-if="cleanStoryObject">
    <div class="mb-6">
      <div class="inline-block mr-4 align-middle mb-4 md:mb-0">
        <a :href="cleanStoryObject.storyURL" target="_blank">
          <div v-if="previewImageURL === 'standard' || imgError" class="
              flex
              rounded-md
              bg-orange-700
              h-24
              w-24
              text-white text-6xl
              font-semibold
              justify-center
              items-center
            ">
            <span>{{
                cleanStoryObject.formattedURL.charAt(0).toUpperCase()
            }}</span>
          </div>
          <img v-else :src="previewImageURL" @error="handleImgError" alt="" class="h-24 w-24 object-cover rounded-md" />
        </a>
      </div>
      <div class="inline-block align-middle">
        <div class="mb-2">
          <a href="">
            <span class="
                inline-flex
                items-center
                px-3
                py-0.5
                rounded-full
                text-sm
                font-medium
                leading-5
                bg-orange-100
                text-orange-800
              ">{{ cleanStoryObject.storyType }}</span>
          </a>
        </div>
        <a :href="cleanStoryObject.storyURL" target="_blank" class="text-lg font-semibold">
          {{ cleanStoryObject.storyTitle }}</a>
        <ul class="space-x-4 mt-2 text-sm">
          <li class="inline-block text-gray-400">
            <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
              x="0px" y="0px" viewBox="0 0 217.408 217.408" style="enable-background: new 0 0 217.408 217.408"
              xml:space="preserve" width="20px" height="20px" class="fill-gray-400 inline-block align-middle">
              <path d="M194.078,22.682c-10.747-8.193-22.606-12.348-35.248-12.348c-15.951,0-33.181,6.808-50.126,19.754
	C91.759,17.142,74.529,10.334,58.578,10.334c-12.642,0-24.501,4.155-35.248,12.348C7.606,34.671-0.24,49.8,0.006,67.648
	c0.846,61.117,100.093,133.233,104.317,136.273l4.381,3.153l4.381-3.153c4.225-3.04,103.472-75.156,104.317-136.273
	C217.648,49.8,209.802,34.671,194.078,22.682z M153.833,149.017c-18.374,18.48-36.915,33.188-45.129,39.453
	c-8.214-6.265-26.755-20.972-45.129-39.453c-31.479-31.661-48.274-59.873-48.57-81.585c-0.178-13.013,5.521-23.749,17.421-32.822
	c8.073-6.156,16.872-9.277,26.152-9.277c17.563,0,34.338,10.936,45.317,20.11l4.809,4.018l4.809-4.018
	c10.979-9.174,27.754-20.11,45.317-20.11c9.28,0,18.079,3.121,26.152,9.277c11.9,9.073,17.599,19.809,17.421,32.822
	C202.107,89.145,185.311,117.356,153.833,149.017z" />
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
              <g></g>
            </svg>
            {{ cleanStoryObject.storyScore }}
          </li>
          <li class="inline-block text-gray-400">
            <NuxtLink :to="cleanStoryObject.storyItemLink">
              <svg width="20px" height="20px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
                class="fill-gray-400 inline-block align-middle">
                <path
                  d="M20.25 6H19v2h1v8h-3a1 1 0 0 0-1 1v1.586l-2.293-2.293A1 1 0 0 0 13 16h-2.172l-2 2h3.758l3.707 3.707A1 1 0 0 0 18 21v-3h2.25A1.752 1.752 0 0 0 22 16.25v-8.5A1.752 1.752 0 0 0 20.25 6z" />
                <path
                  d="M7 18a1 1 0 0 1-1-1v-3H3.75A1.752 1.752 0 0 1 2 12.25v-8.5A1.752 1.752 0 0 1 3.75 2h12.5A1.752 1.752 0 0 1 18 3.75v8.5a1.762 1.762 0 0 1-.514 1.238A1.736 1.736 0 0 1 16.25 14h-4.836l-3.707 3.707A1 1 0 0 1 7 18zm-3-6h3a1 1 0 0 1 1 1v1.586l2.293-2.293A1 1 0 0 1 11 12h5V4H4v8z" />
              </svg>
              {{ cleanStoryObject.storyDescendants }}
            </NuxtLink>
          </li>
          <li class="inline-block text-gray-600">
            <svg width="16px" height="16px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" version="1.1"
              fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"
              class="inline-block text-gray-600">
              <circle cx="8" cy="6" r="3.25" />
              <path d="m2.75 14.25c0-2.5 2-5 5.25-5s5.25 2.5 5.25 5" />
            </svg>

            <NuxtLink :to="cleanStoryObject.storyByLink" class="align-middle">{{
                cleanStoryObject.storyBy
            }}</NuxtLink>
          </li>
          <li class="inline-block text-gray-400">
            {{ cleanStoryObject.storyTime }}
          </li>
          <li class="inline-block text-blue-400">
            <a :href="cleanStoryObject.storyURL" target="_blank">{{
                cleanStoryObject.formattedURL
            }}</a>
          </li>
        </ul>
      </div>
      <hr class="border-0 bg-gray-200 h-0.5 mt-4" />
    </div>
    <div v-for="kid in cleanStoryObject.storyKids" v-bind:key="kid">
      <Suspense>
        <IndividualComment :commentID="kid" />
        <template #fallback>
          <IndividualCommentLoader />
        </template>
      </Suspense>
    </div>
  </div>
</template>

<script setup lang="ts">
// Route data
const route = useRoute();

// Reactive variables
const cleanStoryObject = ref<cleanStoryObject>({});
const previewImageURL = ref("standard");
const imgError = ref(false);

// interface for the clean story object
interface cleanStoryObject {
  storyURL?: string,
  formattedURL?: string,
  storyRanking?: number,
  storyKids?: number[],
  storyType?: string,
  storyTitle?: string,
  storyScore?: number,
  storyItemLink?: string,
  storyDescendants?: number,
  storyByLink?: string,
  storyBy?: string,
  storyTime?: string,
}

// TODO: Add error handling
// Fetch user data
const { data } = await useFetch(
  `${useRuntimeConfig().apiBaseUrl}/api/getIndividualStory`,
  {
    method: "POST",
    body: {
      itemID: route.params.id,
    },
  }
);

cleanStoryObject.value = data.value;

// Meta Data
useHead({
  title: `${cleanStoryObject.value.storyTitle} | Modern Orange`,
});

// Methods
const handleImgError = () => {
  imgError.value = true;
};

const fetchPreviewImage = async () => {
  const data: string = await $fetch<string>(
    `${useRuntimeConfig().apiBaseUrl}/api/getStoryPreviewImage`,
    {
      method: "post",
      body: {
        storyURL: cleanStoryObject.value.storyURL,
      },
    }
  );
  previewImageURL.value = data;
};

// Call the fetch preview image function on mounted so that images can be loaded asynchronously
onMounted(async () => {
  await fetchPreviewImage();
});
</script>
