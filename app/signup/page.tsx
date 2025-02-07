import TextHeader from "@/components/layout/TextHeader";
import SignUp from "@/components/sections/SignUp";
import { Divider } from "@heroui/react";
import { Metadata } from "next";
import Link from "next/link";


export async function generateMetadata(): Promise<Metadata> {
    return {
        title: `Create Your Account - Join Us Today!`,
        description: `Join us today and create your account to unlock all the exclusive features we offer! By signing up, you'll enjoy a seamless and personalized experience, easy account management, and secure data storage. Get started now in just a few simple steps and make the most of what we have for you!`,
        openGraph: {
            title: `Create Your Account - Join Us Today!`,
            description: `Join us today and create your account to unlock all the exclusive features we offer! By signing up, you'll enjoy a seamless and personalized experience, easy account management, and secure data storage. Get started now in just a few simple steps and make the most of what we have for you!`,
            siteName: "Portfolio"
        },
        twitter: {
            card: "summary_large_image",
            title: `Create Your Account - Join Us Today!`,
            description: `Join us today and create your account to unlock all the exclusive features we offer! By signing up, you'll enjoy a seamless and personalized experience, easy account management, and secure data storage. Get started now in just a few simple steps and make the most of what we have for you!`,
            creator: "mahmoodsayed_",
            creatorId: "mahmoodsayed_"
        },
    };

}



const page = () => {
    return <>
        <main className="min-h-[100dvh] overflow-x-hidden">
            <div className="container mx-auto px-4 py-6">
                <TextHeader
                    title="Create Your Account - Join Us Today!"
                    description="Join us today and create your account to unlock all the exclusive features we offer! By signing up, you'll enjoy a seamless and personalized experience, easy account management, and secure data storage. Get started now in just a few simple steps and make the most of what we have for you!"
                />
                <SignUp />
            </div>
        </main>
    </>;
};

export default page;