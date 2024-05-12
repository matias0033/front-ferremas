import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import App from '../App.vue'

import en from '../locales/en.json'
import es from '../locales/es.json'

const i18n = createI18n({
    legacy: false,
    globalInjection: true,
    locale: 'en',
    messages: {
      en,
      es
    }
  })

const app = createApp(App)

app.use(i18n)