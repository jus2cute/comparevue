import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://comparevue.com',
  integrations: [
    sitemap({
      // Dynamic priority based on page type
      serialize(item) {
        // Homepage: highest priority
        if (item.url === 'https://comparevue.com/' || item.url === 'https://comparevue.com') {
          item.priority = 1.0;
          item.changefreq = 'daily';
        }
        // Comparison pages: high priority (money pages)
        else if (item.url.includes('/comparisons/') && !item.url.endsWith('/comparisons/')) {
          item.priority = 0.9;
          item.changefreq = 'weekly';
        }
        // Article pages: medium-high
        else if (item.url.includes('/articles/') && !item.url.endsWith('/articles/')) {
          item.priority = 0.8;
          item.changefreq = 'monthly';
        }
        // Index pages
        else if (item.url.endsWith('/comparisons/') || item.url.endsWith('/articles/')) {
          item.priority = 0.8;
          item.changefreq = 'weekly';
        }
        // Utility pages (about, contact): medium
        else if (item.url.includes('/about/') || item.url.includes('/contact/')) {
          item.priority = 0.6;
          item.changefreq = 'monthly';
        }
        // Legal pages: lower priority
        else if (item.url.includes('/privacy/') || item.url.includes('/terms/')) {
          item.priority = 0.3;
          item.changefreq = 'yearly';
        }
        // Redirect pages (/go/*): lowest — don't index
        else if (item.url.includes('/go/')) {
          item.priority = 0.1;
          item.changefreq = 'monthly';
        }

        // Set lastmod per item
        item.lastmod = new Date().toISOString();

        return item;
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  markdown: {
    shikiConfig: {
      theme: 'github-dark',
      wrap: true,
    },
  },
  prefetch: {
    prefetchAll: true,
  },
});
