import TextHeader from "@/components/layout/TextHeader"
import LogIn from "@/components/sections/LoginForm/LogIn"
import { Metadata } from "next";
import React from "react"

export async function generateMetadata(): Promise<Metadata> {
    return {
        title: `Welcome Back! Log In to Your Account`,
        description: `Access your account and enjoy a seamless, secure, and personalized experience. Log in now to manage your settings, explore exclusive features, and stay connected. Your journey starts here!`,
        openGraph: {
            title: `Welcome Back! Log In to Your Account`,
            description: `Access your account and enjoy a seamless, secure, and personalized experience. Log in now to manage your settings, explore exclusive features, and stay connected. Your journey starts here!`,
            siteName: "Portfolio"
        },
        twitter: {
            card: "summary_large_image",
            title: `Welcome Back! Log In to Your Account`,
            description: `Access your account and enjoy a seamless, secure, and personalized experience. Log in now to manage your settings, explore exclusive features, and stay connected. Your journey starts here!`,
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
                    title="Welcome Back! Log In to Your Account"
                    description="Access your account and enjoy a seamless, secure, and personalized experience. Log in now to manage your settings, explore exclusive features, and stay connected. Your journey starts here!"
                />
                <LogIn />
            </div>
        </main>
    </>
}
export default page

