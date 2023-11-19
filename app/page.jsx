import Link from 'next/link';
import Heading from '@/components/Heading';
import { getFeaturedReview } from '@/lib/reviews';

export default async function HomePage() {
    const review = await getFeaturedReview();
    // console.log('review', review);
    return (
        <>
            <Heading>Indie Gamer</Heading>
            <p className="pb-3">Only the best indie games, reviewed for you</p>
            <div className="bg-white w-80 border rounded shadow hover:shadow-xl sm:w-full">
                <Link className="flex flex-col sm:flex-row" href={`/reviews/${review.slug}`}>
                    <img
                        className="rounded-t sm:rounded-l sm:rounded-r-none"
                        src={review.image}
                        alt=""
                        width="320"
                        height="180"
                    />
                    <h2 className="font-orbitron font-semibold py-1 text-center sm:px-2">
                        {review.title}
                    </h2>
                </Link>
            </div>
        </>
    );
}
