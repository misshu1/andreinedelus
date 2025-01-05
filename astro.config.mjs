// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import icon from 'astro-icon';

// https://astro.build/config
export default defineConfig({
  integrations: [react(), icon({
    include: {
        ri: ['github-fill', 'linkedin-box-fill', 'alert-line', 'checkbox-circle-line'],
    },
    iconDir: "src/assets/icons",
  })]
});
