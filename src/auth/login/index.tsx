'use client'

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signIn } from 'aws-amplify/auth';
import Link from "next/link";
import { useState } from "react";
import { BsEyeSlashFill, BsFillEyeFill } from "react-icons/bs";
import { useRouter } from "next/navigation";
import LoadingScreen from "@/components/LoadingScreen";

const LoginPage = () => {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isVisible, setIsVisible] = useState(false);
    const [error, setError] = useState<string>(""); // Error state with explicit string type
    const [loading, setLoading] = useState(false); // Loading state

    const toggleVisibility = () => setIsVisible(!isVisible);

    const handleLogin = async () => {
        setError(""); // Reset error before login attempt
        setLoading(true); // Set loading state to true

        try {
            const { isSignedIn, nextStep } = await signIn({ username: email, password });

            if (isSignedIn) {
                router.push("/dashboard");
            } else {
                console.log('next step', nextStep);
            }

            if (nextStep) {
                console.log('next step is required:', nextStep);
                if (nextStep.signInStep === 'DONE') {
                    router.push('/dashboard');
                    return;
                }
            }
        } catch (error: unknown) {
            console.log('error signing in', error);

            if (error instanceof Error && 'code' in error) {
                const authError = error as { code: string };
                switch (authError.code) {
                    case 'UserNotFoundException':
                        setError("Account doesn't exist");
                        break;
                    case 'NotAuthorizedException':
                        setError("Incorrect username or password");
                        break;
                    default:
                        setError("An unknown error occurred, please try again");
                        break;
                }
            } else {
                setError("An unexpected error occurred");
            }
        } finally {
            setLoading(false); // Set loading state to false once the process is complete
        }
    };

    if (loading) {
        return (
            <LoadingScreen />
        );
    }

    return (
        <div className="flex flex-col items-center justify-center w-full h-full rounded-full">
            <div>
                <h1 className="text-4xl font-bold mb-4">Hello Bandu!</h1>
            </div>
            <Card className="p-6 md:w-96 flex flex-col justify-center items-center">
                <h1 className="text-2xl font-bold mb-4">Login</h1>

                {/* Display error message */}
                {error && <p className="text-red-500 mb-4">{error}</p>}

                <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mb-4 h-12 rounded-xl"
                />
                <div className="relative w-full flex items-center">
                    <Input
                        type={isVisible ? "text" : "password"}
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full h-12 rounded-xl pr-12" // Ensure there is padding to not overlap the icon
                    />
                    <button
                        onClick={toggleVisibility}
                        className="absolute right-0 inset-y-0 h-12 w-12 flex items-center justify-center rounded-xl"
                        aria-label="Toggle password visibility"  // Accessibility improvement
                    >
                        {isVisible ? <BsFillEyeFill /> : <BsEyeSlashFill />}
                    </button>
                </div>

                <Button
                    className="mt-4 w-full h-12 text-lg font-bold rounded-full"
                    onClick={handleLogin}
                    disabled={loading} // Disable button when loading
                >
                    Login
                </Button>

                {/* If user doesn't have an account, they have to contact the admin */}
                <div className="flex justify-center">
                    <p className="mt-4">
                        Don&apos;t have an account?{" "}
                        <Link href={`mailto:rashodkorala2002@gmail.com`} className="text-blue-500 underline">
                            Contact admin
                        </Link>
                    </p>
                </div>
            </Card>
        </div>
    );
};

export default LoginPage;
