import { readFile } from 'node:fs/promises';
import matter from 'gray-matter';
import { marked } from 'marked';
import Heading from '@/components/Heading';

export default async function StardewValleyPage() {
    const text = await readFile('./content/reviews/stardew-valley.md', 'utf-8');
    const html = marked(text);
    return (
        <>
            <Heading>Stardew Valley</Heading>
            <img
                className="mb-2 rounded"
                src="/images/stardew-valley.jpg"
                alt=""
                width="640"
                height="360"
            />
            <article
                className="max-w-screen-sm prose prose-slate"
                dangerouslySetInnerHTML={{ __html: html }}
            />
        </>
    );
}
