'use client'

import { Divider } from "@heroui/react";
import { motion } from "framer-motion";

const PrivacyPolicy = () => {
    const Privacy_Policy = [
        {
            title: "Introduction",
            description: `Welcome to Portfolio Template! Your privacy is important to us, and we are committed to protecting your personal data. This policy explains how we collect, use, and safeguard your information when you sign up and use our services.`
        },
        {
            title: "Information We Collect",
            description: `When you register and use our platform, we may collect the following information:<br/>Your name and email address<br/>Login credentials (securely encrypted)<br/>Any additional information you provide while using our services`
        },
        {
            title: "How We Use Your Information",
            description: `We use your personal data to:<br/>Create and manage your account<br/>Improve your experience and personalize content<br/>Communicate with you about updates or offers<br/>Ensure account security and prevent fraud`
        },
        {
            title: "How We Protect Your Data",
            description: `We take all necessary security measures to protect your data from unauthorized access, modification, or leaks.`
        },
        {
            title: "Do We Share Your Information?",
            description: `We do not sell or share your personal information with third parties, except when necessary to provide our services or comply with legal requirements.`
        },
        {
            title: "Your Rights as a User",
            description: `You have the right to:<br/>Access and modify your personal data<br/>Delete your account and request data removal<br/>Control your privacy settings`
        },
        {
            title: "Policy Updates",
            description: `We may update this privacy policy from time to time, and we will notify you of any significant changes.`
        },
        {
            title: "Contact Us",
            description: `If you have any questions about our privacy policy, feel free to contact us at <a class="text-indigo-600 opacity-100" href="mailto:mahmoudsayed3576@gmail.com">Mail</a>.`
        },
    ]
    const PrivacyPolicyVariants = {
        hidden: { opacity: 0, y: 20, filter: "blur(5px)" },
        visible: { opacity: 1, y: 0, filter: "blur(0px)" },
    };

    return <>
        <div className="text-start lg:w-9/12 lg:mx-auto mt-4">
            {Privacy_Policy.map((data, index) =>
                <div className="my-6" key={index}>
                    <motion.h2
                        variants={PrivacyPolicyVariants}
                        initial="hidden"
                        animate="visible"
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="font-bold text-lg md:text-2xl mb-1">{index + 1}.{" "}{data.title}</motion.h2>
                    <motion.p
                        variants={PrivacyPolicyVariants}
                        initial="hidden"
                        animate="visible"
                        transition={{ duration: 0.6, delay: index * 0.2 }}
                        dangerouslySetInnerHTML={{ __html: data.description }}
                        className="text-xs leading-5 md:text-lg text-default-700 font-medium "
                    />

                </div>
            )}

        </div>
    </>;
};

export default PrivacyPolicy;