import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind()],
  output: 'static',
  markdown: {
    shikiConfig: {
      themes: {
        light: 'github-light',
        dark: 'github-dark'
      }
    }
  },
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'zh-cn', 'ja', 'zh-tw'],
    routing: {
      prefixDefaultLocale: false
    }
  }
}); 