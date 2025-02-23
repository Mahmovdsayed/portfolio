import TextHeader from "@/components/layout/TextHeader";
import OtpVerify from "@/components/sections/OtpVerify";

const Page = () => {


    return (
        <main className="min-h-[100dvh] overflow-x-hidden flex items-center justify-center">
            <div className="container mx-auto py-6 px-4">
                <TextHeader
                    title="Verify Your Identity"
                    description={`Enter the 6-digit verification code sent to your email address to confirm your identity and unlock full access to your account. Your security is our top priority!`}
                />
                <OtpVerify />
            </div>
        </main>
    );
};

export default Page;