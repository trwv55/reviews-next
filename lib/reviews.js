import { readdir, readFile } from 'node:fs/promises';
import matter from 'gray-matter';
import { marked } from 'marked';
import qs from 'qs';

const CMS_URL = 'http://localhost:1337';

export async function getReview(slug) {
    // const text = await readFile(`./content/reviews/${slug}.md`, 'utf-8');
    // const {
    //     content,
    //     data: { title, date, image },
    // } = matter(text);
    // const body = marked(content);
    // return { slug, title, date, image, body };

    const url =
        `${CMS_URL}/api/reviews?` +
        qs.stringify(
            {
                filters: { slug: { $eg: slug } },
                fields: ['slug', 'title', 'subtitle', 'publishedAt'],
                populate: { image: { fields: ['url'] } },
                sort: ['publishedAt:desc'],
                pagination: { pageSize: 1, withCount: false },
            },
            { encodeValuesOnly: true },
        );

    const response = await fetch(url);
    const { data } = await response.json();
    console.log('data', data);
    const { attributes } = data[0];

    return {
        slug: attributes.slug,
        title: attributes.title,
        date: attributes.publishedAt.slice(0, 'yyyy-mm-dd'.length),
        image: CMS_URL + attributes.image.data.attributes.url,
        body: attributes.body,
    };
}

export async function getReviews() {
    const url =
        `${CMS_URL}/api/reviews?` +
        qs.stringify(
            {
                fields: ['slug', 'title', 'subtitle', 'publishedAt'],
                populate: { image: { fields: ['url'] } },
                sort: ['publishedAt:desc'],
                pagination: { pageSize: 6 },
            },
            { encodeValuesOnly: true },
        );

    // console.log('getReviews', url);
    const response = await fetch(url);
    const { data } = await response.json();

    return data.map(({ attributes }) => ({
        slug: attributes.slug,
        title: attributes.title,
        date: attributes.publishedAt.slice(0, 'yyyy-mm-dd'.length),
        image: CMS_URL + attributes.image.data.attributes.url,
    }));
}

export async function getSlugs() {
    const files = await readdir('./content/reviews');
    return files.filter((file) => file.endsWith('.md')).map((file) => file.slice(0, -'.md'.length));
}

export async function getFeaturedReview() {
    const slugs = await getSlugs();

    const reviews = [];
    for (const slug of slugs) {
        const review = await getReview(slug);

        reviews.push(review);
    }

    const sortReviews = reviews.sort((a, b) => a.date - b.date);

    return sortReviews[0];
}
