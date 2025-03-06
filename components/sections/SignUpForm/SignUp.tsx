'use client'
import { addToast, Alert, Avatar, Button, Checkbox, Form, Input, Link, Select, SelectItem, Spinner, Textarea, toast } from "@heroui/react";
import { IoLogIn } from "react-icons/io5";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userValidationSchema } from "@/Validation/userValidation";
import { z } from "zod";
import { motion } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ConfettiFireworks } from "@/functions/ConfettiFireworks";
import { EyeSlashFilledIcon } from "@/icons/EyeSlashFilledIcon";
import { EyeFilledIcon } from "@/icons/EyeFilledIcon";
import { postData } from "@/services/services";
import { AddToast } from "@/functions/AddToast";
import { allCountries } from "@/static/allCountries";

type FormInputs = z.infer<typeof userValidationSchema>;

const SignUp = () => {
    const {
        register,
        handleSubmit,
        watch,
        control,
        reset,
        setValue,
        formState: { errors },
    } = useForm<FormInputs>({
        resolver: zodResolver(userValidationSchema),
    });
    const [loading, setLoading] = useState(false);
    const router = useRouter()
    const [isVisible, setIsVisible] = useState(false);
    const toggleVisibility = () => setIsVisible(!isVisible);
    const acceptTerms = watch("acceptTerms");

    const onSubmit: SubmitHandler<FormInputs> = async (data) => {
        try {
            setLoading(true);

            const formData = new FormData();
            formData.append("userName", data.userName);
            formData.append("firstName", data.firstName);
            formData.append("secondName", data.secondName);
            formData.append("email", data.email);
            formData.append("password", data.password);
            formData.append("nationality", data.nationality || "");
            formData.append("country", data.country || "");
            formData.append("city", data.city || "Cairo");
            formData.append("positionName", data.positionName || "");
            formData.append("bio", data.bio || "");
            formData.append("about", data.about || "");
            formData.append("acceptTerms", data.acceptTerms.toString());

            const imageInput = document.querySelector('input[type="file"]') as HTMLInputElement;
            if (imageInput && imageInput.files && imageInput.files[0]) {
                formData.append("image", imageInput.files[0]);
            }



            const response = await postData("/signup", formData);

            if (response.success) {
                reset();
                AddToast(
                    "User created successfully!",
                    "Please check your email to verify your account.",
                    5000,
                    "success"
                );
                ConfettiFireworks();
                setTimeout(() => {
                    router.push(`/verify?email=${data.email}`);
                }, 2000);
            } else {
                AddToast(
                    response.message || "Failed to create user.",
                    "",
                    5000,
                    "warning"
                );
            }
        } catch (error: any) {
            if (error.response) {
                AddToast(
                    "Error",
                    error.response.data.message || "An error occurred. Please try again.",
                    5000,
                    "danger"
                );
            } else if (error.request) {
                AddToast(
                    "Network Error",
                    "Please check your internet connection and try again.",
                    5000,
                    "danger"
                );
            } else {
                AddToast(
                    "Error",
                    "An unexpected error occurred. Please try again.",
                    5000,
                    "danger"
                );
            }
        } finally {
            setLoading(false);
        }
    };

    const inputVariants = {
        hidden: { opacity: 0, y: 20, filter: "blur(5px)" },
        visible: { opacity: 1, y: 0, filter: "blur(0px)" },
    };

    const handleCountryChange = (selectedCountry: string) => {
        const country = allCountries.find((c: any) => c.name.common === selectedCountry);
        if (country) {
            const nationality = country.demonyms?.eng?.m || "No nationality provided";
            setValue("nationality", nationality);
            setValue("country", selectedCountry);
        }
    };

    return (
        <div>
            <Form
                action="/api/signup"
                method="post"
                encType="multipart/form-data"
                onSubmit={handleSubmit(onSubmit)}
                className="mt-6 lg:w-9/12 lg:mx-auto"
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
                        variant="bordered"
                        color="default"
                        placeholder="Enter Your Username"
                        label="Username"
                        labelPlacement="outside"
                        className="mb-1"
                        isClearable
                        isRequired
                        radius="md"
                        size="md"
                        description="Choose a unique username that represents you. This will be your public identity."
                    />
                    {errors.userName && <Alert radius="md" className="mb-1" color="danger" title={errors.userName.message} />}
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
                        variant="bordered"
                        color="default"
                        placeholder="Enter Your First Name"
                        label="First Name"
                        labelPlacement="outside"
                        className="mb-1"
                        isClearable
                        isRequired
                        radius="md"
                        size="md"
                        description="Enter your first name as it appears on official documents."
                    />
                    {errors.firstName && <Alert radius="md" className="mb-1" color="danger" title={errors.firstName.message} />}
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
                        variant="bordered"
                        color="default"
                        placeholder="Enter Your Last Name"
                        label="Last Name"
                        labelPlacement="outside"
                        className="mb-1"
                        isClearable
                        isRequired
                        radius="md"
                        size="md"
                        description="Enter your last name as it appears on official documents."
                    />
                    {errors.secondName && <Alert radius="md" className="mb-1" color="danger" title={errors.secondName.message} />}
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
                        variant="bordered"
                        color="default"
                        placeholder="Enter Your Email"
                        label="Email"
                        labelPlacement="outside"
                        className="mb-1"
                        isClearable
                        isRequired
                        radius="md"
                        size="md"
                        description="Enter a valid email address. This will be used for account verification and communication."
                    />
                    {errors.email && <Alert radius="md" className="mb-1" color="danger" title={errors.email.message} />}
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
                        variant="bordered"
                        color="default"
                        placeholder="Enter Your Password"
                        label="Password"
                        labelPlacement="outside"
                        className="mb-1"
                        isRequired
                        radius="md"
                        size="md"
                        description="Create a strong password with at least 6 characters, including uppercase, lowercase, and numbers."
                        endContent={
                            <button
                                aria-label="toggle password visibility"
                                className="focus:outline-none"
                                type="button"
                                onClick={toggleVisibility}
                            >
                                {isVisible ? (
                                    <EyeSlashFilledIcon />
                                ) : (
                                    <EyeFilledIcon />
                                )}
                            </button>
                        }
                        type={isVisible ? "text" : "password"}
                    />
                    {errors.password && <Alert radius="md" className="mb-1" color="danger" title={errors.password.message} />}
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
                        labelPlacement="outside"
                        className="mb-1"
                        isClearable
                        radius="md"
                        size="md"
                        type="file"
                        accept="image/*"
                        variant="bordered"
                        color="default"
                        description="Upload a clear picture of yourself. This will be used for your profile and should be in JPEG, PNG, or JPG format."
                    />
                    {errors.image && <Alert radius="md" className="mb-1" color="danger" title={errors.image.message} />}
                </motion.div>

                <motion.div
                    className="w-full"
                    variants={inputVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ duration: 0.5, delay: 1.2 }}
                >
                    <Controller
                        name="country"
                        control={control}
                        render={({ field }) => (
                            <Select
                                {...field}
                                label="Country"
                                isRequired
                                variant="bordered"
                                radius="md"
                                size="md"
                                color="default"
                                labelPlacement="outside"
                                placeholder="Select your country"
                                description="Select your country of residence. This helps us provide localized content."
                                onChange={(e) => {
                                    field.onChange(e);
                                    handleCountryChange(e.target.value);
                                }}
                            >
                                {allCountries
                                    .slice()
                                    .sort((a: any, b: any) => a.name.common.localeCompare(b.name.common))
                                    .map((e: any) => (
                                        <SelectItem
                                            startContent={
                                                <Avatar alt={e.name.common} className="w-6 h-6" src={e.flags.png} />
                                            }
                                            key={e.name.common}
                                            id={e.name.common}
                                        >
                                            {e.name.common}
                                        </SelectItem>
                                    ))}
                            </Select>
                        )}
                    />
                </motion.div>

                <motion.div
                    className="w-full"
                    variants={inputVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ duration: 0.5, delay: 1.3 }}
                >
                    <Textarea
                        {...register("bio")}
                        id="bio"
                        name="bio"
                        variant="bordered"
                        className="mb-1 w-full"
                        labelPlacement="outside"
                        label="Bio"
                        placeholder="Enter your bio"
                        color="default"
                        radius="md"
                        size="md"
                        description="Write a short bio about yourself (max 200 characters). This will be displayed on your profile."
                    />
                    {errors.bio && (
                        <Alert color="warning" className="mt-2 font-medium" title={errors.bio.message} />
                    )}
                </motion.div>

                <motion.div
                    className="w-full"
                    variants={inputVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ duration: 0.5, delay: 1.4 }}
                >
                    <Textarea
                        {...register("about")}
                        id="about"
                        name="about"
                        className="mb-1 w-full"
                        variant="bordered"
                        labelPlacement="outside"
                        label="About"
                        placeholder="Tell us about you"
                        color="default"
                        radius="md"
                        size="md"
                        description="Share more details about yourself (max 500 characters). This will be displayed on your profile."
                    />
                    {errors.about && (
                        <Alert color="warning" className="mt-2 font-medium" title={errors.about.message} />
                    )}
                </motion.div>

                <motion.div
                    className="w-full"
                    variants={inputVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ duration: 0.5, delay: 1.5 }}
                >
                    <Input
                        {...register("positionName")}
                        id="positionName"
                        name="positionName"
                        variant="bordered"
                        className="mb-1 w-full"
                        isRequired
                        labelPlacement="outside"
                        label="Position Name"
                        placeholder="Enter Position Name"
                        radius="md"
                        size="md"
                        description="Enter your job title or position (e.g., Software Engineer, Graphic Designer)."
                    />
                    {errors.positionName && (
                        <Alert color="warning" className="mt-2 font-medium" title={errors.positionName.message} />
                    )}
                </motion.div>

                <motion.div
                    className="w-full"
                    variants={inputVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ duration: 0.5, delay: 1.6 }}
                >
                    <Checkbox
                        {...register("acceptTerms")}
                        className="font-medium"
                        size="sm"
                        color="default"
                    >
                        Before creating an account, please read and accept our{" "}
                        <Link
                            className="font-semibold text-secondary-600 text-md z-50"
                            href="/privacy-and-policy"
                            showAnchorIcon
                        >
                            Privacy & Policy
                        </Link>
                        .
                    </Checkbox>
                    {errors.acceptTerms && <Alert radius="md" className="mb-1" color="danger" title={errors.acceptTerms.message} />}
                </motion.div>

                <motion.div
                    className="w-full"
                    variants={inputVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ duration: 0.5, delay: 1.7 }}
                >
                    <Button
                        startContent={loading ? <Spinner size="md" color="white" /> : <IoLogIn />} type="submit"
                        className="w-full bg-[#181818] dark:bg-[#d9d9d9] dark:text-black text-white font-medium mt-3"
                        radius="md"
                        size="md"
                        isDisabled={Object.keys(errors).length > 0 || loading || !acceptTerms}
                    >
                        {loading ? 'Signing Up...' : 'Sign Up'}
                    </Button>
                </motion.div>
            </Form>


            <motion.div
                variants={inputVariants}
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.5, delay: 1.1 }}
                className="flex items-center justify-center mt-2 z-50">
                <span className="text-md font-medium z-50">
                    Have an account already ?{" "}
                    <Link
                        className="font-semibold text-secondary-600 text-md "
                        href="/login"
                        showAnchorIcon
                        color="primary"
                    >
                        Log in
                    </Link>
                </span>
            </motion.div>
        </div>
    );
};

export default SignUp;