// 'client side';

import { useRef, useState } from 'react';
import Image from 'next/image';
import Testimonials from './Testimonials';
import AboutUs from './AboutUs';
import FormFiliacao from '../Form';
import { useForm } from 'react-hook-form';

const dataTestimonials = [
    {
        office: 'Membro do Partido dos Programadores do Brasil',
        text: 'Minha jornada política mudou drasticamente quando decidi me filiar ao Partido dos Programadores do Brasil. Como um programador, sempre fui apaixonado por resolver problemas com código, mas nunca imaginei que essa paixão pudesse ser tão valiosa na política.',
        name: 'Clovis Sampaio',
        imageLink: 'https://github.com/mark.png'
    },
    {
        office: 'Membro do Partido dos Programadores do Brasil',
        text: 'Ao me unir a este partido, encontrei uma comunidade de mentes brilhantes que compartilham a mesma visão de um Brasil mais tecnológico, transparente e acessível para todos. Juntos, desenvolvemos estratégias inovadoras para a minha campanha política.',
        name: 'Maria da Silva',
        imageLink: 'https://github.com/maria.png'
    },
    {
        office: 'Membro do Partido dos Programadores do Brasil',
        text: 'A capacidade do partido de utilizar tecnologia de ponta, como análise de dados, redes sociais e automação de campanha, foi fundamental para alcançar eleitores de maneira eficaz. Isso resultou em uma campanha mais eficiente e econômica.',
        name: 'Danilo Medeiros',
        imageLink: 'https://github.com/joao.png'
    }
];

export default function LandingPage() {
    const [switchToForm, setSwitchToForm] = useState(false);
    const [notify, setNotify] = useState(false);
    const form = useForm();

    const testimonialsRef = useRef<HTMLDivElement | null>(null);
    const aboutUsRef = useRef<HTMLDivElement | null>(null);

    const scrollToComponent = (refToScroll: any) => {
        refToScroll.current?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <>
            <div className="flex flex-col justify-center min-w-[640px]">
                <header className="h-28 w-full flex items-center justify-between gap-16 p-16">
                    <div className="flex items-center gap-3">
                        <Image
                            alt={'Logo do PDP'}
                            src={'/logo.png'}
                            width={80}
                            height={80}
                        />
                        <h1 className="font-semibold text-lg">
                            Partido dos Programadores do Brasil
                        </h1>
                    </div>

                    <nav className="flex gap-5">
                        <button
                            className="hover:border-b-2 hover:border-green-600 hover:rounded-nonerounded-lg p-2 min-w-fit"
                            onClick={() => scrollToComponent(aboutUsRef)}
                        >
                            Sobre nós
                        </button>
                        <button
                            className="hover:border-b-2 hover:border-green-600 hover:rounded-none rounded-lg p-2"
                            onClick={() => scrollToComponent(testimonialsRef)}
                        >
                            Depoimentos
                        </button>
                    </nav>
                </header>

                <main className="flex flex-col min-h-[644px] items-center justify-center flex-1 p-6 relative isolate overflow-hidden bg-gray-900 py-24 sm:py-32">
                    <Image
                        src="/bg_1.jpg"
                        alt="algum"
                        className="absolute inset-0 -z-10 h-full w-full object-cover object-right md:object-center opacity-20"
                        fill={true}
                        quality={50}
                    />

                    <div
                        className="hidden sm:absolute sm:-top-10 sm:right-1/2 sm:-z-10 sm:mr-10 sm:block sm:transform-gpu sm:blur-3xl"
                        aria-hidden="true"
                    >
                        <div className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#46ff68] to-[#776fff] opacity-20"></div>
                    </div>

                    <div
                        className="absolute -top-52 left-1/2 -z-10 -translate-x-1/2 transform-gpu blur-3xl sm:top-[-28rem] sm:ml-16 sm:translate-x-0 sm:transform-gpu"
                        aria-hidden="true"
                    >
                        <div className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#46ff68] to-[#776fff] opacity-20"></div>
                    </div>

                    {!switchToForm && (
                        <div className="text-center flex flex-col items-center w-3/5 ">
                            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
                                Construindo o futuro do Brasil, linha de código
                                por linha de código.
                            </h1>
                            <p className="mt-6 text-lg leading-8 text-white">
                                Enquanto a maioria dos partidos políticos podem
                                ser complexos, nós fazemos a escolha oposta,
                                visando simplificar a política, para que todos
                                possam participar ativamente, sem complicações.
                                Esperamos que você se junte a nós e que o futuro
                                do Brasil seja mais acessível e transparente.
                            </p>

                            <div className="mt-10 flex items-center justify-center gap-x-6">
                                <button
                                    onClick={() => setSwitchToForm(true)}
                                    className="rounded-lg bg-green-600 px-3.5 py-2.5 text-lg font-semibold text-white shadow-sm hover:bg-green-600/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-400  "
                                >
                                    Quero fazer parte do PDP
                                </button>
                            </div>
                        </div>
                    )}

                    {switchToForm && (
                        <FormFiliacao
                            form={form}
                            back={() => setSwitchToForm(false)}
                        />
                    )}
                </main>

                <div ref={aboutUsRef}>
                    <AboutUs />
                </div>

                <div ref={testimonialsRef}>
                    <Testimonials dataSource={dataTestimonials} />
                </div>
                <footer className="bg-black text-white h-16 p-6 flex items-center justify-center font-bold">
                    © 2023 Partido dos Programadores do Brasil. Todos os
                    direitos reservados.
                </footer>
            </div>
        </>
    );
}
