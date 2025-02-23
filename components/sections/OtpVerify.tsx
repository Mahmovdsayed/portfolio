"use client";
import { Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import { MdVerified, MdRefresh } from "react-icons/md";
import { toast } from "sonner";
import { useSearchParams } from "next/navigation";
import { InputOtp } from "@heroui/react";
import React, { useState } from "react";
import { baseUrl } from "@/static/constant";

const OtpVerify = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const email = searchParams.get("email") as string;
    const [value, setValue] = useState("");
    const [loading, setLoading] = useState(false);
    const [resendLoading, setResendLoading] = useState(false);

    const verifyOTP = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${baseUrl}/api/otp-verify`, {
                headers: {
                    "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify({
                    email,
                    otp: value,
                }),
            });
            const data = await response.json();

            if (data.success) {
                toast.success(data.message, { duration: 4000 });
                router.push("/login");
            } else {
                toast.error(data.message, { duration: 4000 });
            }
        } catch (error) {
            toast.error("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const requestNewOTP = async () => {
        try {
            setResendLoading(true);

            const response = await fetch(`${baseUrl}/api/request-new-otp`, {
                headers: {
                    "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify({
                    email,
                }),
            });
            const data = await response.json();

            if (data.success) {
                toast.success("New OTP sent successfully.", { duration: 4000 });
            } else {
                toast.error(data.message, { duration: 4000 });
            }
        } catch (error) {
            toast.error("Something went wrong. Please try again.");
        } finally {
            setResendLoading(false);
        }
    };

    return (
        <div className="mt-4 text-start lg:w-9/12 lg:mx-auto">
            <InputOtp
                variant="faded"
                size="lg"
                textAlign="center"
                length={6}
                value={value}
                onValueChange={setValue}
            />
            <div className="mt-4 flex flex-col gap-2">
                <Button
                    className="w-full md:w-fit"
                    startContent={<MdVerified />}
                    onPress={verifyOTP}
                    isLoading={loading}
                >
                    Verify
                </Button>
                <Button
                    className="w-full md:w-fit bg-transparent text-black p-0"

                    startContent={<MdRefresh />}
                    onPress={requestNewOTP}
                    isLoading={resendLoading}
                >
                    Request New OTP
                </Button>
            </div>
        </div>
    );
};

export default OtpVerify;