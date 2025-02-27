"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { IoLogIn } from "react-icons/io5";
import { motion } from "framer-motion";
import { LogInFunction } from "@/functions/Login";
import { addToast, Alert, Button, Input, Link, Spinner } from "@heroui/react";
import { EyeSlashFilledIcon } from "@/icons/EyeSlashFilledIcon";
import { EyeFilledIcon } from "@/icons/EyeFilledIcon";
import { ConfettiCustomShapes } from "@/functions/ConfettiCustomShapes";

const loginSchema = z.object({
    email: z
        .string()
        .trim()
        .email({ message: "Invalid email format" })
        .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, {
            message: "Invalid email format",
        }),

    password: z
        .string()
        .min(6, { message: "Password must be at least 6 characters" })
        .max(30, { message: "Password must be at most 30 characters" })
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/, {
            message:
                "Password must contain at least one uppercase letter, one lowercase letter, and one number",
        }),
});

const LogIn = () => {
    const router = useRouter();
    const [values, setValues] = useState({ email: "", password: "" });
    const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrors({});

        const result = loginSchema.safeParse(values);
        if (!result.success) {
            const fieldErrors = result.error.flatten().fieldErrors;
            setErrors({
                email: fieldErrors.email?.[0],
                password: fieldErrors.password?.[0],
            });
            return;
        }

        setIsSubmitting(true);

        try {
            const res = await LogInFunction(values.email, values.password);

            if (res.success) {
                addToast({
                    title: res.message,
                    color: "foreground",
                    radius: "sm",
                    variant: "flat",
                    size: "sm",
                    shadow: "lg",
                    timeout: 5000,
                    shouldShowTimeoutProgess: true
                })
                ConfettiCustomShapes()
                setTimeout(() => {
                    router.push("/dashboard");
                }, 2000);
            } else {
                addToast({
                    title: res.message || "Failed to Login",
                    color: "foreground",
                    radius: "sm",
                    size: "sm",
                    timeout: 5000,
                    variant: "flat",
                    shadow: "lg",
                    description: "Something went wrong!",
                    shouldShowTimeoutProgess: true,
                })
            }
        } catch (error) {
            addToast({
                title: "An error occurred. Please try again.",
                color: "foreground",
                variant: "flat",
                shadow: "lg",
                size: "sm",
                radius: "sm",
                timeout: 5000,
                shouldShowTimeoutProgess: true,
            })
        } finally {
            setIsSubmitting(false);
        }
    };

    const inputVariants = {
        hidden: { opacity: 0, y: 20, filter: "blur(5px)" },
        visible: { opacity: 1, y: 0, filter: "blur(0px)" },
    };

    return (
        <div>
            <motion.form
                onSubmit={handleSubmit}
                className="flex mx-auto flex-col gap-6 mt-6 lg:w-9/12 lg:mx-auto"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                <motion.div
                    className="w-full"
                    variants={inputVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ duration: 0.5, delay: 0.3 }}
                >
                    <Input
                        onChange={handleChange}
                        id="email"
                        name="email"
                        value={values.email}
                        className="mb-1"
                        variant="underlined"
                        color="default"
                        label="Email"
                        labelPlacement="inside"
                        placeholder="Enter your Email"
                        type="text"
                    />
                    {errors.email && <Alert color="warning" className="mt-2 font-medium" title={errors.email} />}
                </motion.div>

                <motion.div
                    className="w-full"
                    variants={inputVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ duration: 0.5, delay: 0.3 }}
                >
                    <Input
                        onChange={handleChange}
                        id="password"
                        name="password"
                        value={values.password}
                        className="mb-1"
                        variant="underlined"
                        color="default"
                        label="Password"
                        labelPlacement="inside"
                        endContent={
                            <button
                                aria-label="toggle password visibility"
                                className="focus:outline-none"
                                type="button"
                                onClick={() => setIsVisible(!isVisible)}
                            >
                                {isVisible ? <EyeSlashFilledIcon /> : <EyeFilledIcon />}
                            </button>
                        }
                        placeholder="Enter your Password"
                        type={isVisible ? "text" : "password"}
                    />
                    {errors.password && <Alert color="warning" className="mt-2 font-medium" title={errors.password} />}
                </motion.div>

                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3, delay: 0.8 }}>
                    <Button
                        startContent={isSubmitting ? <Spinner size="sm" color="white" /> : <IoLogIn />}
                        className="w-full font-sharpSansSemiBold bg-[#181818] text-white dark:bg-[#d9d9d9] dark:text-black"
                        radius="full"
                        type="submit"
                        isDisabled={isSubmitting || !values.email || !values.password}
                    >
                        {isSubmitting ? "Logging in..." : "Log In"}
                    </Button>
                </motion.div>
            </motion.form>
            <motion.div
                variants={inputVariants}
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.5, delay: 0.9 }}
                className="flex items-center justify-center mt-2 z-50">
                <span className="text-sm font-medium z-50">
                    Don't have an account ?{" "}
                    <Link
                        className="font-semibold text-secondary-600 text-sm "
                        href="/signup"
                        showAnchorIcon
                        color="primary"
                    >
                        Sign up
                    </Link>
                </span>

            </motion.div>
        </div>

    );
};

export default LogIn;
