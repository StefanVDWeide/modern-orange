<template>
  <nav class="border-gray-200 mb-8 py-2.5 rounded">
    <div class="container flex flex-wrap justify-between items-center mx-auto">
      <NuxtLink to="/">
        <span class="
            self-center
            text-xl
            font-semibold
            whitespace-nowrap
            text-orange-700
          ">Modern Orange</span>
      </NuxtLink>
      <button @click="toggleMenu" data-collapse-toggle="mobile-menu" type="button" class="
          inline-flex
          items-center
          p-2
          ml-3
          text-sm text-gray-500
          rounded-lg
          md:hidden
          focus:outline-none focus:ring-2 focus:ring-gray-200
        " aria-controls="mobile-menu" aria-expanded="false">
        <span class="sr-only">Open main menu</span>
        <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd"
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
            clip-rule="evenodd"></path>
        </svg>
        <svg class="hidden w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clip-rule="evenodd"></path>
        </svg>
      </button>
      <div class="w-full md:block md:w-auto" id="mobile-menu" :class="menuState">
        <ul class="
            flex flex-col
            mt-4
            md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium
          ">
          <li>
            <NuxtLink to="/new" class="block py-2 pr-4 pl-3 rounded md:bg-transparent md:p-0" aria-current="page">New
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/best" class="block py-2 pr-4 pl-3 rounded md:bg-transparent md:p-0" aria-current="page">Best
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/ask" class="block py-2 pr-4 pl-3 rounded md:bg-transparent md:p-0" aria-current="page">Ask
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/show" class="block py-2 pr-4 pl-3 rounded md:bg-transparent md:p-0" aria-current="page">Show
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/jobs" class="block py-2 pr-4 pl-3 rounded md:bg-transparent md:p-0" aria-current="page">Jobs
            </NuxtLink>
          </li>
          <li>
            <NuxtLink to="/about" class="block py-2 pr-4 pl-3 rounded md:bg-transparent md:p-0" aria-current="page">
              About</NuxtLink>
          </li>
          <li>
            <button @click="toggleTheme">
              <svg v-if="theme !== 'dark'" id="theme-toggle-dark-icon" class="w-5 h-5" fill="currentColor"
                viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
              </svg>
              <svg v-else class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                  fill-rule="evenodd" clip-rule="evenodd"></path>
              </svg>
            </button>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
const menuState = ref("hidden");
const theme = useTheme();

const toggleMenu = () => {
  if (menuState.value == "") {
    menuState.value = "hidden";
  } else {
    menuState.value = "";
  }
};

const toggleTheme = () => {
  if (theme.value == "light") {
    theme.value = "dark";
    localStorage.setItem("theme", "dark");
  } else {
    theme.value = "light";
    localStorage.setItem("theme", "light");
  }
};
</script>
