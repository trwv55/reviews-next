import Heading from '@/components/Heading';
import { getReview, getSlugs } from '@/lib/reviews';

export async function generateStaticParams() {
    const slugs = await getSlugs();

    return slugs.map((slug) => ({ slug }));
}

export default async function ReviewPage({ params: { slug } }) {
    // console.log('slug', slug);

    const review = await getReview(slug);

    return (
        <>
            <Heading>{review.title}</Heading>
            <p className="italic pb-2">{review.date}</p>
            <img className="mb-2 rounded" src={review.image} alt="" width="640" height="360" />
            <article
                className="max-w-screen-sm prose prose-slate"
                dangerouslySetInnerHTML={{ __html: review.body }}
            />
        </>
    );
}
