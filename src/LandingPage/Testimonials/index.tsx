import Image from "next/image";

const testimonials = [
    {
        name: "Jane Doe",
        role: "Contemporary Artist",
        content:
            "Since using [Startup Name], I’ve been able to secure my pieces and offer collectors the assurance they need. The process is seamless, and the blockchain technology gives me peace of mind.",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    {
        name: "John Smith",
        role: "Art Collector",
        content:
            "Verifying artwork authenticity has never been easier. I love the ability to instantly scan an NFC tag and confirm the artist's credentials. It’s a game-changer for art collectors.",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    {
        name: "Sarah Lee",
        role: "Gallery Owner",
        content:
            "[Startup Name] provides the security we need when hosting exhibitions. Knowing that every piece is verified with blockchain-backed certificates gives our buyers confidence.",
        image: "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&w=256&h=256&q=80",
    },
];

export default function Testimonials() {
    return (
        <section className="bg-card py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl lg:text-center">
                    <h2 className="text-base font-semibold leading-7 text-indigo-600">
                        What Our Users Say
                    </h2>
                    <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                        Trusted by Artists, Collectors, and Galleries Worldwide
                    </p>
                    <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-400">
                        Hear how [Startup Name] has revolutionized art authentication for those who need it most.
                    </p>
                </div>
                <div className="mt-16 grid grid-cols-1 gap-y-16 lg:grid-cols-3 lg:gap-x-8">
                    {testimonials.map((testimonial) => (
                        <div key={testimonial.name} className="text-center">
                            <Image
                                className="mx-auto h-24 w-24 rounded-full object-cover shadow-lg"
                                src={testimonial.image}
                                alt={testimonial.name}
                                width={96}
                                height={96}
                            />
                            <h3 className="mt-6 text-lg font-semibold text-gray-900 dark:text-white">
                                {testimonial.name}
                            </h3>
                            <p className="text-indigo-600">{testimonial.role}</p>
                            <p className="mt-4 text-base leading-7 text-gray-600 dark:text-gray-400">
                                {testimonial.content}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
