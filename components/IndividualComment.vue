<template>
  <div class="mb-4 pl-2 border-l-2 border-gray-200">
    <ul class="space-x-2 text-sm text-gray-400">
      <li class="inline-block">
        <NuxtLink :to="`/user/${commentObject.by}`">{{
          commentObject.by
        }}</NuxtLink>
      </li>
      <li class="inline-block">·</li>
      <li class="inline-block">
        {{ commentObject.time }}
      </li>
      <li class="inline-block">·</li>
      <li @click="toggleShowComment()" class="inline-block cursor-pointer">
        [ - ]
      </li>
    </ul>
    <p
      v-show="showComment"
      v-html="commentObject.text"
      class="prose max-w-none dark:prose-invert"
    ></p>
    <div
      v-show="showComment"
      v-for="kid in commentObject.kids"
      v-bind:key="kid"
      class="ml-2 mt-6"
    >
      <Suspense>
        <IndividualComment :commentID="kid" />
        <template #fallback> <IndividualCommentLoader /> </template>
      </Suspense>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  commentID: Number,
});

// Reactive variables
const commentObject = ref({});
const showComment = ref(true);

// Fetch comment data
const { data, error } = await useFetch(
  `${useRuntimeConfig().apiBaseUrl}/api/getIndividualComment`,
  {
    method: "POST",
    body: {
      itemID: props.commentID,
    },
  }
);

commentObject.value = data.value;

// Methods
const toggleShowComment = () => {
  showComment.value = !showComment.value;
};
</script>
