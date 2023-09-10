import Head from 'next/head';
import Image from 'next/image';
import { Inter } from 'next/font/google';
import LandingPage from '@/interfaces/LandingPage';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
    return (
        <>
            <Head>
                <title>PDPbr</title>
                <meta
                    name="Partido dos Programadores do Brasil"
                    content="Site do PDP, Partido dos Programadores do Brasil"
                />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
            </Head>

            <LandingPage />
        </>
    );
}
