import { LockClosedIcon } from "@radix-ui/react-icons";
import { ArrowUp01Icon, CloudUploadIcon, FingerprintIcon } from "lucide-react";

const features = [
    {
        name: "Secure Artwork Upload",
        description:
            "Upload your artwork and generate a tamper-proof digital certificate of authenticity, securely stored on the blockchain.",
        icon: CloudUploadIcon,
    },
    {
        name: "NFC-Powered Authentication",
        description:
            "Each artwork is paired with a unique NFC tag, allowing for easy, instant verification of authenticity anytime, anywhere.",
        icon: LockClosedIcon,
    },
    {
        name: "Instant Verification",
        description:
            "Quickly verify the authenticity of artworks using our advanced NFC system, ensuring secure and fast verification.",
        icon: ArrowUp01Icon,
    },
    {
        name: "Advanced Blockchain Security",
        description:
            "Our blockchain-based security ensures all transactions and records of authenticity are immutable and verifiable.",
        icon: FingerprintIcon,
    },
];

export default function Features() {
    return (
        <div className="py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl lg:text-center">
                    <h2 className="text-base font-semibold leading-7 text-indigo-600">
                        Trusted Art Authentication
                    </h2>
                    <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                        Key Features of Our Platform
                    </p>
                    <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-400">
                        Our platform offers an easy and secure solution for artists, galleries, and collectors to authenticate and manage artwork.
                    </p>
                </div>
                <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
                    <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
                        {features.map((feature) => (
                            <div key={feature.name} className="relative pl-16">
                                <dt className="text-base font-semibold leading-7 text-gray-900 dark:text-white">
                                    <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                                        <feature.icon aria-hidden="true" className="h-6 w-6 text-white" />
                                    </div>
                                    {feature.name}
                                </dt>
                                <dd className="mt-2 text-base leading-7 text-gray-600 dark:text-gray-400">
                                    {feature.description}
                                </dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </div>
        </div>
    );
}
