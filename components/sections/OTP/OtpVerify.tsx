"use client";
import { addToast, Button, Form } from "@heroui/react";
import { useRouter } from "next/navigation";
import { MdVerified, MdRefresh } from "react-icons/md";
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
                addToast({
                    title: data.message,
                    color: "foreground",
                    radius: "sm",
                    size: "sm",
                    shadow: "lg",
                    variant: "flat",
                    shouldShowTimeoutProgess: true,
                    timeout: 4000,
                    severity: "success",
                });
                router.push("/login");
            } else {
                addToast({
                    title: data.message,
                    color: "foreground",
                    radius: "sm",
                    size: "sm",
                    shadow: "lg",
                    variant: "flat",
                    shouldShowTimeoutProgess: true,
                    timeout: 4000,
                    severity: "danger",
                });
            }
        } catch (error) {
            addToast({
                title: "Something went wrong. Please try again.",
                color: "foreground",
                radius: "sm",
                size: "sm",
                shadow: "lg",
                variant: "flat",
                shouldShowTimeoutProgess: true,
                timeout: 4000,
                severity: "danger",
            });
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
                addToast({
                    title: data.message,
                    color: "foreground",
                    radius: "sm",
                    size: "sm",
                    shadow: "lg",
                    variant: "flat",
                    shouldShowTimeoutProgess: true,
                    timeout: 4000,
                    severity: "success",
                });
            } else {
                addToast({
                    title: data.message,
                    color: "foreground",
                    radius: "sm",
                    size: "sm",
                    shadow: "lg",
                    variant: "flat",
                    shouldShowTimeoutProgess: true,
                    timeout: 4000,
                    severity: "danger",
                });
            }
        } catch (error) {
            addToast({
                title: "Something went wrong. Please try again.",
                color: "foreground",
                radius: "sm",
                size: "sm",
                shadow: "lg",
                variant: "flat",
                shouldShowTimeoutProgess: true,
                timeout: 4000,
                severity: "danger",
            });
        } finally {
            setResendLoading(false);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        verifyOTP();
    };

    return (
        <div className="mt-4 text-start lg:w-9/12 lg:mx-auto">
            <Form
                onSubmit={handleSubmit}>
                <InputOtp
                    variant="faded"
                    size="lg"
                    textAlign="center"
                    length={6}
                    isRequired
                    value={value}
                    onValueChange={setValue}
                />
                <div className="mt-4 flex flex-col gap-2">
                    <Button
                        className="w-full md:w-fit"
                        startContent={<MdVerified />}
                        onPress={verifyOTP}
                        isLoading={loading}
                        type="submit"
                    >
                        Verify
                    </Button>
                    <Button
                        className="w-full md:w-fit bg-transparent text-black p-0"
                        type="button"
                        startContent={<MdRefresh />}
                        onPress={requestNewOTP}
                        isLoading={resendLoading}
                    >
                        Request New OTP
                    </Button>
                </div>
            </Form>
        </div>
    );
};

export default OtpVerify;