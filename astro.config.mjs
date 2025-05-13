// @ts-check
import { defineConfig, envField} from 'astro/config';
import react from '@astrojs/react';
import netlify from '@astrojs/netlify';
import sitemap from '@astrojs/sitemap';
import icon from 'astro-icon';


// https://astro.build/config
export default defineConfig({
  site:'https://andreinedelus.com',
  integrations: [
    react({include: ['**/react/*']}),
    icon({
        include: {
            ri: ['github-fill', 'linkedin-box-fill', 'alert-line','checkbox-circle-line', 'external-link-line', 'home-4-fill', 'instagram-line'],
        },
        iconDir: "src/assets/icons",
    }),
    sitemap()
  ],
  adapter: netlify(),
  vite: {
      build :{
          sourcemap: true,
      }
  },
  env: {
      schema: {
          INSTAGRAM_QUERY_HASH: envField.string({ context: "server", access: "secret" }),
          INSTAGRAM_ID: envField.number({ context: "server", access: "secret" }),
      }
    },
});
