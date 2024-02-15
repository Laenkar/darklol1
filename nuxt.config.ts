// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  //   devtools: { enabled: true }
  ui: {
    notifications: {
      // Show toasts at the top right of the screen
      position: 'top-0 bottom-auto'
    }
  },
  colormode: {
    preference: 'light'
  },
  app: {
    head: {
      title: "darklol",
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
      htmlAttrs: {
        lang: "ru",
      },
      link: [
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Exo+2&family=Inter:wght@200;300;400;500;600;700;800;900&family=Roboto+Mono&display=swap",
        },
      ],
    },
  },
  modules: [
    "vuetify-nuxt-module",
    // "@nuxtjs/tailwindcss",
    "@nuxtjs/html-validator",
    "nuxt-snackbar",
    '@nuxt/ui',
  ],
  vuetify: {
    moduleOptions: {
      /* module specific options */
    },
    vuetifyOptions: {
      /* vuetify options */
    },
  },
  runtimeConfig: {
    public: {
      baseURL: 'https://localhost:9443',
    },
  },
});
