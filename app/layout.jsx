import Link from 'next/link';
import NavBar from '../components/NavBar';
import './global.css';
import { orbitron, exo2 } from './fonts';

export const metadata = {
    title: {
        default: 'Indie Gamer',
        template: '%s | Indie Gamer',
    },
};

export default function RootLayout({ children }) {
    return (
        <html lang="en" className={`${orbitron.variable}, ${exo2.variable}`}>
            <body className="bg-orange-50 flex flex-col px-4 py-2 min-h-screen">
                <header>
                    <NavBar />
                </header>
                <main className="grow py-3">{children}</main>
                <footer className="border-t py-3 text-center text-xs">
                    Game data and courtesy of{' '}
                    <a
                        className="text-orange-800 hover:underline"
                        href="https://rawg.io/"
                        target="_blank">
                        RAWG
                    </a>
                </footer>
            </body>
        </html>
    );
}
