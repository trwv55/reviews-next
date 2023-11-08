import Link from 'next/link';
import Heading from '@/components/Heading';

export default function HomePage() {
    return (
        <>
            <Heading>Indie Gamer</Heading>
            <p className="pb-3">Only the best indie games, reviewed for you</p>
            <div className="bg-white w-80 border rounded shadow hover:shadow-xl sm:w-full">
                <Link className="flex flex-col sm:flex-row" href="/reviews/stardew-valley">
                    <img
                        className="rounded-t sm:rounded-l sm:rounded-r-none"
                        src="/images/stardew-valley.jpg"
                        alt=""
                        width="320"
                        height="180"
                    />
                    <h2 className="font-orbitron font-semibold py-1 text-center sm:px-2">
                        Stardew Valley
                    </h2>
                </Link>
            </div>
        </>
    );
}
