// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import icon from 'astro-icon';


// https://astro.build/config
export default defineConfig({
    site:'https://andreinedelus.com',
    integrations: [react(), icon({
        include: {
            ri: ['github-fill', 'linkedin-box-fill', 'alert-line','checkbox-circle-line', 'external-link-line'],
        },
        iconDir: "src/assets/icons",
    }), sitemap()],
    vite: {
        build :{
            sourcemap: true,
        }
    }
});
