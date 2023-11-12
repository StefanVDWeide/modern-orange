import { defineNuxtConfig } from 'nuxt/config'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    modules: [
        "@nuxt/image",
        "@nuxtjs/tailwindcss"
    ],
    runtimeConfig: {
        maxStoriesPerFeedPage: '25',
        public: {
            apiBaseUrl: '',
        }
    },
    css: ["~/assets/css/tailwind.css"],
    build: {
        postcss: {
            postcssOptions: {
                plugins: {
                    tailwindcss: {},
                    autoprefixer: {},
                },
            },
        },
    },
})
