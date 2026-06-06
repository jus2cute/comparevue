import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const articles = await getCollection('articles');
  const comparisons = await getCollection('comparisons');

  const items = [...articles, ...comparisons]
    .sort((a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime())
    .map(item => ({
      title: item.data.title,
      description: item.data.description,
      pubDate: item.data.pubDate,
      link: item.collection === 'comparisons'
        ? '/comparisons/' + item.id
        : '/articles/' + item.id,
    }));

  return rss({
    title: 'CompareVue',
    description: 'Honest, data-driven SaaS and software comparisons to help you pick the right tools.',
    site: context.site,
    items,
    customData: '<language>en-us</language>',
  });
}
