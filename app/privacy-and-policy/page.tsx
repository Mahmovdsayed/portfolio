import TextHeader from "@/components/layout/TextHeader";
import PrivacyPolicy from "@/components/sections/PrivacyPolicy";
import { Divider } from "@heroui/react";

const page = () => {
  return <>
    <main className="min-h-[100dvh] overflow-x-hidden">
      <div className="container mx-auto px-4 py-6">
        <TextHeader
          title="Privacy & Policy - Your Data, Your Control"
          description="We value your privacy and are committed to protecting your personal data. Learn how we collect, use, and safeguard your information to ensure a secure and seamless experience. Read our Privacy & Policy before signing up to stay informed about your rights and choices."
        />
        <Divider />
        <PrivacyPolicy />
      </div>
    </main>
  </>;
};

export default page;