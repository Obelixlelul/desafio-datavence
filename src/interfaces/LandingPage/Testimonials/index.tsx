import { ForwardedRef, RefObject, forwardRef } from 'react';
import Testimonial, { TestimonialProps } from './Testimonial';

interface TestimonialsProps {
    dataSource: TestimonialProps[];
}

function Testimonials({ dataSource }: TestimonialsProps) {
    return (
        <section className="flex flex-col gap-8 items-center justify-center bg-white py-8 px-16 w-[100%]">
            <h1 className="font-bold text-4xl">Depoimentos</h1>
            <div className="grid lg:grid-cols-1 xl:grid-cols-3 gap-4 items-start justify-center mx-auto">
                {dataSource.map((data) => (
                    <Testimonial
                        text={data.text}
                        name={data.name}
                        office={data.office}
                        imageLink={data.imageLink}
                        key={data.name}
                    />
                ))}
            </div>
        </section>
    );
}

export default Testimonials;
