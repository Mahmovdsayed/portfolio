'use client'

import DashBoardModal from "@/components/UI/DashBoardModal";
import { updateUserSchema } from "@/Validation/updateUser";
import { Alert, Button, Input, Textarea } from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FaEdit } from "react-icons/fa";
import { FaSave } from "react-icons/fa";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { updateUser } from "@/services/services";
import { AddToast } from "@/functions/AddToast";

interface IProps {
    data: any
}
type UserFormValues = z.infer<typeof updateUserSchema>;

const UpdateUserInfo = ({ data }: IProps) => {
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
                const data = await updateUser(changedFields);

                if (data.status) {
                    router.refresh()
                    handleCloseModal();
                    AddToast(
                        data.message || "User updated successfully!",
                        "Your information has been updated successfully!",
                        4500,
                        "success",

                    )
                } else {
                    handleCloseModal();
                    AddToast(
                        data.message || "Something went wrong!",
                        "Something went wrong!",
                        4500,
                        "danger",

                    )
                }
            } else {
                handleCloseModal();
                AddToast(
                    "No changes detected!",
                    "You haven't made any changes to your information.",
                    4500,
                    "warning",
                )
            }
        } catch (error: any) {
            handleCloseModal();
            AddToast(
                error.response?.data?.message || "Something went wrong!",
                "Something went wrong!",
                4500,
                "danger",

            )

        } finally {
            setIsLoading(false);
        }
    };

    return <>
        <Button
            size="sm"
            radius="sm"
            variant="flat"
            className="bg-transparent"
            startContent={<FaEdit />}
            onPress={handleOpenModal}
        >Edit</Button>



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

export default UpdateUserInfo;