'use client'

import DashboardMainTitle from "@/components/UI/DashboardMainTitle";
import DashBoardModal from "@/components/UI/DashBoardModal";
import { getTimeSince } from "@/functions/formatDuration";
import { updateUserSchema } from "@/Validation/updateUser";
import { Alert, Button, Card, CardBody, CardHeader, Chip, Divider, Image, Input, Link, Textarea } from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FaEdit } from "react-icons/fa";
import { FaSave } from "react-icons/fa";
import { z } from "zod";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type UserFormValues = z.infer<typeof updateUserSchema>;

const DashboardInfo = ({ data }: { data: any }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter()
    const { register, handleSubmit, watch, formState: { errors } } = useForm<UserFormValues>({
        resolver: zodResolver(updateUserSchema),
        defaultValues: {
            firstName: data?.user?.firstName,
            secondName: data?.user?.secondName,
            email: data?.user?.email,
            bio: data?.user?.bio,
            about: data?.user?.about,
        }
    });

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

    const onSubmit: SubmitHandler<UserFormValues> = async (formData) => {
        setIsLoading(true);

        const changedFields: Partial<UserFormValues> = {};

        Object.keys(formData).forEach((key) => {
            const fieldKey = key as keyof UserFormValues;
            if (formData[fieldKey] !== data?.user?.[fieldKey]) {
                changedFields[fieldKey] = formData[fieldKey];
            }
        });

        try {
            if (Object.keys(changedFields).length > 0) {
                const { data } = await axios.patch('/api/user/update', changedFields);

                if (data.status) {
                    router.refresh()
                    toast.success(data.message || "User updated successfully!", {
                        duration: 4500
                    });
                } else {
                    toast.error(data.errorMassage || "Failed to update user info.", {
                        duration: 4500
                    });
                }
                handleCloseModal();
            } else {
                toast("No changes detected.", { icon: "ℹ️", duration: 3500 });
            }
        } catch (error: any) {
            toast.error(error.response?.data?.errorMassage || "Something went wrong!", {
                duration: 4500
            });
        } finally {
            setIsLoading(false);
        }
    };

    return <>
        <div className="mb-4">
            <DashboardMainTitle header="Personal Information" />
        </div>
        <div className="my-4">
            <Card
                shadow="none"
                radius="sm"
            >
                <CardHeader>
                    <div className="flex items-center justify-between w-full">
                        <h4 className="font-semibold text-xl">
                            About Me
                        </h4>
                        <div>
                            <Button
                                size="sm"
                                radius="sm"
                                variant="flat"
                                className="bg-transparent"
                                startContent={<FaEdit />}
                                onPress={handleOpenModal}
                            >Edit</Button>
                        </div>
                    </div>

                </CardHeader>
                <CardBody className="px-4">
                    <div className="flex items-center justify-between w-full">
                        <div className="flex items-center justify-start gap-4">
                            <Image
                                src={data?.user?.image?.url}
                                className="w-24 md:w-32 object-cover object-center"
                                alt="user image"
                                isZoomed
                            />
                            <div className="text-start">
                                <h5 className="font-semibold text-lg md:text-xl capitalize">{data?.user?.firstName}{" "}{data?.user?.secondName}</h5>
                                <span className="text-tiny md:text-sm text-default-800">@{data?.user?.userName}</span>
                                <h6 className="font-medium text-xs md:text-sm text-default-700">{getTimeSince(data?.user?.createdAt)}</h6>
                            </div>
                        </div>
                        <div></div>
                    </div>
                    <Divider className="my-4" />
                    <div className="flex flex-col items-start justify-center gap-3">
                        <div>
                            <h5 className="font-semibold text-sm md:text-base">User ID:</h5>
                            <p className="text-sm md:text-base text-default-600">
                                {data?.user?._id}
                            </p>
                        </div>
                        <div>
                            <h5 className="font-semibold text-sm md:text-base">User Name:</h5>
                            <p className="text-sm md:text-base text-default-600">
                                {data?.user?.userName}
                            </p>
                        </div>
                        <div>
                            <h5 className="font-semibold text-sm md:text-base">First Name:</h5>
                            <p className="text-sm md:text-base text-default-600">
                                {data?.user?.firstName}
                            </p>
                        </div>
                        <div>
                            <h5 className="font-semibold text-sm md:text-base">Last Name:</h5>
                            <p className="text-sm md:text-base text-default-600">
                                {data?.user?.secondName}
                            </p>
                        </div>
                        <div>
                            <h5 className="font-semibold text-sm md:text-base">Email:</h5>
                            <p className="text-sm md:text-base text-default-600">
                                {data?.user?.email}
                            </p>
                        </div>
                        <div>
                            <h5 className="font-semibold text-sm md:text-base">bio:</h5>
                            <p className="text-sm md:text-base text-default-600">
                                {data?.user?.bio}
                            </p>
                        </div>
                        <div>
                            <h5 className="font-semibold text-sm md:text-base">about:</h5>
                            <p className="text-sm md:text-base text-default-600">
                                {data?.user?.about}
                            </p>
                        </div>
                    </div>
                </CardBody>
            </Card>
        </div>

        <DashBoardModal
            title="Edit User Info"
            isOpen={isModalOpen}
            onClose={handleCloseModal}
        >
            <div>
                <form
                    className="w-full flex mx-auto flex-col gap-3"
                    onSubmit={handleSubmit(onSubmit)}
                    encType="multipart/form-data"
                >
                    {/* First Name */}
                    <Input
                        {...register("firstName")}
                        id="firstName"
                        name="firstName"
                        variant="bordered"
                        labelPlacement="inside"
                        label="First Name"
                        placeholder="Enter New First Name"
                        color="secondary"
                        radius="sm"
                        size="sm"
                    />
                    {errors.firstName && (
                        <Alert color="warning" className="mt-2 font-medium" title={errors.firstName.message} />
                    )}

                    {/* Second Name */}
                    <Input
                        {...register("secondName")}
                        id="secondName"
                        name="secondName"
                        variant="bordered"
                        labelPlacement="inside"
                        label="Last Name"
                        placeholder="Enter New Last Name"
                        color="secondary"
                        radius="sm"
                        size="sm"
                    />
                    {errors.secondName && (
                        <Alert color="warning" className="mt-2 font-medium" title={errors.secondName.message} />
                    )}

                    {/* Email */}
                    <Input
                        {...register("email")}
                        id="email"
                        name="email"
                        variant="bordered"
                        labelPlacement="inside"
                        label="Email"
                        placeholder="Enter New Email"
                        color="secondary"
                        radius="sm"
                        size="sm"
                        type="email"
                    />
                    {errors.email && (
                        <Alert color="warning" className="mt-2 font-medium" title={errors.email.message} />
                    )}

                    {/* Password */}
                    <Input
                        {...register("password")}
                        id="password"
                        name="password"
                        variant="bordered"
                        labelPlacement="inside"
                        label="Password"
                        placeholder="Enter New Password"
                        color="secondary"
                        radius="sm"
                        size="sm"
                        type="password"
                    />
                    {errors.password && (
                        <Alert color="warning" className="mt-2 font-medium" title={errors.password.message} />
                    )}

                    {/* Bio */}
                    <Textarea
                        {...register("bio")}
                        id="bio"
                        name="bio"
                        variant="bordered"
                        labelPlacement="inside"
                        label="Bio"
                        placeholder="Enter your bio"
                        color="secondary"
                        radius="sm"
                        size="sm"
                    />
                    {errors.bio && (
                        <Alert color="warning" className="mt-2 font-medium" title={errors.bio.message} />
                    )}

                    {/* About */}
                    <Textarea
                        {...register("about")}
                        id="about"
                        name="about"
                        variant="bordered"
                        labelPlacement="inside"
                        label="About"
                        placeholder="Tell us about you"
                        color="secondary"
                        radius="sm"
                        size="sm"
                    />
                    {errors.about && (
                        <Alert color="warning" className="mt-2 font-medium" title={errors.about.message} />
                    )}

                    {/* Submit Button */}
                    <Button
                        startContent={<FaSave />}
                        size="sm"
                        radius="sm"
                        className="mt-2 font-medium"
                        type="submit"
                        isDisabled={isLoading}
                        isLoading={isLoading}
                    >
                        {isLoading ? "Saving..." : "Save"}
                    </Button>
                </form>
            </div>
        </DashBoardModal>

    </>;
};
export default DashboardInfo;
