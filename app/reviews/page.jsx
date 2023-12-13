import Link from 'next/link';
import Image from 'next/image';
import Heading from '@/components/Heading';
import { getReviews } from '@/lib/reviews';

export const revalidate = 30;

export const metadata = {
    title: 'Reviews',
};

export default async function ReviewsPage() {
    const reviews = await getReviews(6);

    return (
        <>
            <Heading>Reviews</Heading>
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
