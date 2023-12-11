import Image from 'next/image';
import Heading from '@/components/Heading';
import { getReview, getSlugs } from '@/lib/reviews';
import ShareLinkButton from '@/components/ShareLinkButton';

export const dynamic = 'force-dynamic';

// export async function generateStaticParams() {
//     const slugs = await getSlugs();

//     return slugs.map((slug) => ({ slug }));
// }

// export async function generateMetadata({ params: { slug } }) {
//     const review = await getReview(slug);
//     return {
//         title: review.title,
//     };
// }

export default async function ReviewPage({ params: { slug } }) {
    const review = await getReview(slug);

    return (
        <>
            <Heading>{review.title}</Heading>
            <p className="font-semibold pb-3">{review.subtitle}</p>
            <div className="flex gap-3 items-baseline">
                <p className="italic pb-2">{review.date}</p>
                <ShareLinkButton />
            </div>
            <Image
                className="mb-2 rounded"
                src={review.image}
                alt=""
                priority
                width="640"
                height="360"
            />
            <article
                className="max-w-screen-sm prose prose-slate"
                dangerouslySetInnerHTML={{ __html: review.body }}
            />
        </>
    );
}
