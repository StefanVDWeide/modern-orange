import { defineNuxtConfig } from "nuxt/config";

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  modules: [
    "@nuxt/image",
    "@nuxtjs/tailwindcss",
    "@nuxtjs/plausible"
  ],

  runtimeConfig: {
    maxStoriesPerFeedPage: "25",
    public: {
      apiBaseUrl: ""
    }
  },

  css: ["~/assets/css/tailwind.css"],

  build: {
    postcss: {
      postcssOptions: {
        plugins: {
          tailwindcss: {},
          autoprefixer: {}
        }
      }
    }
  },
  plausible: {
    // Prevent tracking on localhost
    ignoredHostnames: ["localhost"],
    apiHost: "https://stats.weidev.nl"
  },
  compatibilityDate: "2024-08-27"
});
