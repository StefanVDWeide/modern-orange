<template>
  <div>
    <h1 class="text-6xl mb-8 font-semibold">About this project</h1>
    <div class="grid auto-rows-auto prose max-w-none dark:prose-invert">
      <div>
        <h2 class="text-4xl">What is this project?</h2>
        <p class="text-2xl">
          Modern Orange is an alternative Hacker News client build with Nuxt 3
          and the official HN API. It is meant to make using HN on more modern
          systems with higher resolutions larger screens more user friendly.
          Also, I wanted to play with Nuxt 3. It's great :)
        </p>
      </div>
      <div>
        <h2 class="text-4xl">Is this better than the official website?</h2>
        <p class="text-2xl">No.</p>
      </div>
      <div>
        <h2 class="text-4xl">Why not? Is modern not better?</h2>
        <p class="text-2xl">
          Both the official site and this project have their own advantages. One
          huge difference is the absences of user login (and accompanying
          features such as the ability upvote and comment). Other than that,
          this site has a lower information density per full screen. Where the
          official site shows about 15-20 items depending on your screen size,
          here it is around 5. I chose to do this on purpose so that you can
          focus on what is actually on screen instead of scanning the 15-20
          items to see if anything seems interesting, potentially missing
          something you might like. Use which ever version suites your needs
          best.
        </p>
      </div>
      <div>
        <h2 class="text-4xl">Why can I not login?</h2>
        <p class="text-2xl">
          The official HN API does not support this (yet?) and I have not found
          a different, reliable way of accomplishing this.
        </p>
      </div>
      <div>
        <h2 class="text-4xl">Can I see the code?</h2>
        <p class="text-2xl">
          Yes, here you go:
          <a href="" target="_blank" class="underline text-blue-400">Link</a>
        </p>
      </div>
    </div>
  </div>
</template>
