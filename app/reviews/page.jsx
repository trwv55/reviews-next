import Link from 'next/link';
import Image from 'next/image';
import Heading from '@/components/Heading';
import { getReviews } from '@/lib/reviews';
import PaginationBar from '@/components/PaginationBar';
import SearchBox from '@/components/SearchBox';

export const revalidate = 30;

export const metadata = {
    title: 'Reviews',
};

const PAGE_SIZE = 6;

export default async function ReviewsPage({ searchParams }) {
    const page = parsePageParam(searchParams.page);
    const { reviews, pageCount } = await getReviews(PAGE_SIZE, page);

    return (
        <>
            <Heading>Reviews</Heading>
            <div className="flex justify-between pb-3">
                <PaginationBar href="/revies" page={page} pageCount={pageCount} />
                <SearchBox />
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
