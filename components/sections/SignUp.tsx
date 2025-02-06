'use client'
import { Alert, Button, Form, Input, Textarea } from "@heroui/react";
import { IoMailOutline, IoLogIn } from "react-icons/io5";
import { TbLockPassword } from "react-icons/tb";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userValidationSchema } from "@/Validation/userValidation";
import { z } from "zod";
import { toast } from "sonner";
import axios from "axios";
import { motion } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ConfettiFireworks } from "@/functions/ConfettiFireworks";

type FormInputs = z.infer<typeof userValidationSchema>;

const SignUp = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormInputs>({
        resolver: zodResolver(userValidationSchema),
    });
    const [loading, setLoading] = useState(false);
    const router = useRouter()
    const onSubmit: SubmitHandler<FormInputs> = async (data) => {
        try {
            setLoading(true);
            const formData = new FormData();
            formData.append("userName", data.userName);
            formData.append("firstName", data.firstName);
            formData.append("secondName", data.secondName);
            formData.append("email", data.email);
            formData.append("password", data.password);

            const imageInput = document.querySelector('input[type="file"]') as HTMLInputElement;
            if (imageInput && imageInput.files && imageInput.files[0]) {
                formData.append("image", imageInput.files[0]);
            }

            const response = await fetch("/api/signup", {
                method: "POST",
                body: formData,
                credentials: "same-origin"
            });

            const result = await response.json();
            if (result.success) {
                toast.success("User created successfully!", {
                    duration: 5000,
                });
                ConfettiFireworks()
                setTimeout(() => {
                    router.push("/login");
                }, 5000);
            } else {
                toast.warning(result.message || "Failed to create user.", {
                    duration: 5000,
                });
            }
        } catch (error) {
            toast.error(`An error occurred. Please try again.`);
        } finally {
            setLoading(false);
        }
    };

    const inputVariants = {
        hidden: { opacity: 0, y: 20, filter: "blur(5px)" },
        visible: { opacity: 1, y: 0, filter: "blur(0px)" },
    };

    return (
        <Form
            action="/api/signup"
            method="post"
            encType="multipart/form-data"
            onSubmit={handleSubmit(onSubmit)}
            className="my-6 lg:w-9/12 lg:mx-auto"
        >
            <motion.div
                className="w-full"
                variants={inputVariants}
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.5, delay: 0.3 }}
            >
                <Input
                    {...register("userName")}
                    type="text"
                    variant="faded"
                    color="default"
                    placeholder="Enter Your Username"
                    label="Username"
                    labelPlacement="inside"
                    className="mb-1"
                    isClearable
                    isRequired
                    radius="sm"
                />
                {errors.userName && <Alert radius="sm" className="mb-1" color="danger" title={errors.userName.message} />}
            </motion.div>

            <motion.div
                className="w-full"
                variants={inputVariants}
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.5, delay: 0.4 }}
            >
                <Input
                    {...register("firstName")}
                    type="text"
                    variant="faded"
                    color="default"
                    placeholder="Enter Your First Name"
                    label="First Name"
                    labelPlacement="inside"
                    className="mb-1"
                    isClearable
                    isRequired
                    radius="sm"
                />
                {errors.firstName && <Alert radius="sm" className="mb-1" color="danger" title={errors.firstName.message} />}
            </motion.div>

            <motion.div
                className="w-full"
                variants={inputVariants}
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.5, delay: 0.5 }}
            >
                <Input
                    {...register("secondName")}
                    type="text"
                    variant="faded"
                    color="default"
                    placeholder="Enter Your Last Name"
                    label="Last Name"
                    labelPlacement="inside"
                    className="mb-1"
                    isClearable
                    isRequired
                    radius="sm"
                />
                {errors.secondName && <Alert radius="sm" className="mb-1" color="danger" title={errors.secondName.message} />}
            </motion.div>

            <motion.div
                className="w-full"
                variants={inputVariants}
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.5, delay: 0.6 }}
            >
                <Input
                    {...register("email")}
                    type="email"
                    variant="faded"
                    color="default"
                    placeholder="Enter Your Email"
                    label="Email"
                    labelPlacement="inside"
                    className="mb-1"
                    isClearable
                    isRequired
                    radius="sm"
                />
                {errors.email && <Alert radius="sm" className="mb-1" color="danger" title={errors.email.message} />}
            </motion.div>

            <motion.div
                className="w-full"
                variants={inputVariants}
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.5, delay: 0.7 }}
            >
                <Input
                    {...register("password")}
                    type="password"
                    variant="faded"
                    color="default"
                    placeholder="Enter Your Password"
                    label="Password"
                    labelPlacement="inside"
                    className="mb-1"
                    isClearable
                    isRequired
                    radius="sm"
                    description="It should be at least 6 characters."
                />
                {errors.password && <Alert radius="sm" className="mb-1" color="danger" title={errors.password.message} />}
            </motion.div>

            <motion.div
                className="w-full"
                variants={inputVariants}
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.5, delay: 0.8 }}
            >
                <Input
                    label="Upload Your Profile Picture"
                    labelPlacement="inside"
                    className="mb-1"
                    isClearable
                    type="file"
                    accept="image/*"
                    variant="faded"
                    color="default"
                    description="Upload a clear picture of yourself. This will be used for your profile."
                />
                {errors.image && <Alert radius="sm" className="mb-1" color="danger" title={errors.image.message} />}
            </motion.div>

            <motion.div
                className="w-full"
                variants={inputVariants}
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.5, delay: 0.9 }}
            >
                <Button
                    startContent={loading ? <span className="loader"></span> : <IoLogIn />} type="submit"
                    className="w-full bg-[#181818] text-white font-medium mt-3"
                    radius="full"
                    isDisabled={Object.keys(errors).length > 0 || loading}
                >
                    {loading ? 'Signing Up...' : 'Sign Up'}
                </Button>
            </motion.div>
        </Form>
    );
};

export default SignUp;
