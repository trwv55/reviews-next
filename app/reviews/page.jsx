import Link from 'next/link';
import Image from 'next/image';
import Heading from '@/components/Heading';
import { getReviews } from '@/lib/reviews';

export const revalidate = 30;

export const metadata = {
    title: 'Reviews',
};

export default async function ReviewsPage({ searchParams }) {
    const page = parsePageParam(searchParams.page);
    const reviews = await getReviews(6);

    return (
        <>
            <Heading>Reviews</Heading>
            <div className="flex gap-2 pb-3">
                <Link href={`/reviews?page=${page - 1}`}>&lt;</Link>
                <span>Page {page}</span>
                <Link href={`/reviews?page=${page + 1}`}>&gt;</Link>
            </div>
            <ul className="flex flex-row flex-wrap gap-3">
                {reviews.map((review, index) => (
                    <li
                        key={review.slug}
                        className="bg-white border w-80 rounded shadow hover:shadow-xl"
                    >
                        <Link href={`/reviews/${review.slug}`}>
                            <Image
                                className="rounded-t"
                                src={review.image}
                                alt=""
                                priority={index === 0}
                                width="320"
                                height="180"
                            />
                            <h2 className="font-orbitron font-semibold py-1 text-center">
                                {review.title}
                            </h2>
                        </Link>
                    </li>
                ))}
            </ul>
        </>
    );
}

function parsePageParam(paramValue) {
    if (paramValue) {
        const page = parseInt(paramValue);
        if (isFinite(page) && page > 0) {
            return page;
        }
    }
    return 1;
}
