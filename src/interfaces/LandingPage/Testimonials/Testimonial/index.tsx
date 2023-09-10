export type TestimonialProps = {
    text: string;
    name: string;
    office: string;
    imageLink: string;
};

export default function Testimonial({
    text,
    name,
    office,
    imageLink
}: TestimonialProps) {
    return (
        <div className="shadow-xl flex flex-col items-center justify-center rounded-md p-8 min-h-[600px] max-w-[600px]">
            <img
                className="h-20 w-20 rounded-full mb-4"
                src={imageLink}
                alt={`Imagem de avatar de ${name}`}
            />

            <blockquote className="text-center text-sm font-light leading-8 text-gray-900 sm:text-xl sm:leading-9">
                <p>“{text}”</p>
            </blockquote>

            <div className="mt-4 flex flex-col gap-2 items-center justify-center space-x-3 text-base">
                <div className="font-semibold text-gray-900">{name}</div>
                <svg
                    viewBox="0 0 2 2"
                    width={3}
                    height={3}
                    aria-hidden="true"
                    className="fill-gray-900"
                >
                    <circle cx={1} cy={1} r={1} />
                </svg>
                <div className="text-gray-600">{office}</div>
            </div>
        </div>
    );
}
