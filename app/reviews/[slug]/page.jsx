import Heading from '@/components/Heading';
import { getReview, getSlugs } from '@/lib/reviews';
import ShareLinkButton from '@/components/ShareLinkButton';

export async function generateStaticParams() {
    const slugs = await getSlugs();

    return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params: { slug } }) {
    const review = await getReview(slug);
    return {
        title: review.title,
    };
}

export default async function ReviewPage({ params: { slug } }) {
    // console.log('slug', slug);
    const review = await getReview(slug);

    return (
        <>
            <Heading>{review.title}</Heading>
            <div className="flex gap-3 items-baseline">
                <p className="italic pb-2">{review.date}</p>
                <ShareLinkButton />
            </div>
            <img className="mb-2 rounded" src={review.image} alt="" width="640" height="360" />
            <article
                className="max-w-screen-sm prose prose-slate"
                dangerouslySetInnerHTML={{ __html: review.body }}
            />
        </>
    );
}
