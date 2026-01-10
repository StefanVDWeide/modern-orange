<template>
  <div :class="theme">
    <div class="dark:bg-gray-800 dark:text-white">
      <div class="container min-h-screen mx-auto pb-24 px-6 md:px-12">
        <Navbar />
        <Transition name="page">
          <div>
            <NuxtPage />
          </div>
        </Transition>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: "Modern Orange",
  meta: [
    {
      name: "description",
      content: "A modern Hacker News client",
    },
  ],
});

const theme = useTheme();

const setTheme = (newTheme: string) => {
  localStorage.setItem("theme", newTheme);
  theme.value = newTheme;
};

onMounted(() => {
  const isDarkModePreferred = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;

  const themeFromLocalStorage: string = localStorage.getItem("theme");

  if (themeFromLocalStorage) {
    setTheme(themeFromLocalStorage);
  } else {
    setTheme(isDarkModePreferred ? "dark" : "light");
  }
});
</script>

<style>
.page-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}

.page-enter-active,
.page-leave-active {
  transition: all 0.2s;
}

.page-enter,
.page-leave-to {
  opacity: 0;
}
</style>
