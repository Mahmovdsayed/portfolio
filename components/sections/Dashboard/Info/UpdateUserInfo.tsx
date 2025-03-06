'use client'

import DashBoardModal from "@/components/UI/DashBoardModal";
import { updateUserSchema } from "@/Validation/updateUser";
import { Alert, Button, Input, Textarea, Select, SelectItem, Avatar } from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { SubmitHandler, useForm, Controller } from "react-hook-form";
import { FaEdit, FaSave } from "react-icons/fa";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { updateUser } from "@/services/services";
import { AddToast } from "@/functions/AddToast";
import { allCountries } from "@/static/allCountries";

interface IProps {
    data: any;
}

type UserFormValues = z.infer<typeof updateUserSchema>;

const UpdateUserInfo = ({ data }: IProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const {
        register,
        handleSubmit,
        control,
        setValue,
        formState: { errors },
    } = useForm<UserFormValues>({
        resolver: zodResolver(updateUserSchema),
        defaultValues: {
            firstName: data?.user?.firstName,
            secondName: data?.user?.secondName,
            email: data?.user?.email,
            bio: data?.user?.bio,
            about: data?.user?.about,
            city: data?.user?.city,
            country: data?.user?.country,
            nationality: data?.user?.nationality,
            positionName: data?.user?.positionName,
        },
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
                const response = await updateUser(changedFields);

                if (response.status) {
                    router.refresh();
                    handleCloseModal();
                    AddToast(
                        response.message || "User updated successfully!",
                        "Your information has been updated successfully!",
                        4500,
                        "success"
                    );
                } else {
                    handleCloseModal();
                    AddToast(
                        response.message || "Something went wrong!",
                        "Something went wrong!",
                        4500,
                        "danger"
                    );
                }
            } else {
                handleCloseModal();
                AddToast(
                    "No changes detected!",
                    "You haven't made any changes to your information.",
                    4500,
                    "warning"
                );
            }
        } catch (error: any) {
            handleCloseModal();
            AddToast(
                error.response?.data?.message || "Something went wrong!",
                "Something went wrong!",
                4500,
                "danger"
            );
        } finally {
            setIsLoading(false);
        }
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
        <>
            <Button
                size="sm"
                radius="sm"
                variant="flat"
                className="bg-transparent"
                startContent={<FaEdit />}
                onPress={handleOpenModal}
            >
                Edit
            </Button>

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

                        <Controller
                            name="country"
                            control={control}
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    label="Country"
                                    variant="bordered"
                                    color="secondary"
                                    radius="sm"
                                    size="sm"
                                    labelPlacement="inside"
                                    placeholder="Select your country"
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
                        {errors.country && (
                            <Alert color="warning" className="mt-2 font-medium" title={errors.country.message} />
                        )}
                        <Input
                            {...register("city")}
                            id="city"
                            name="city"
                            variant="bordered"
                            labelPlacement="inside"
                            label="City"
                            placeholder="Enter your City"
                            color="secondary"
                            radius="sm"
                            size="sm"
                        />
                        {errors.city && (
                            <Alert color="warning" className="mt-2 font-medium" title={errors.city.message} />
                        )}
                        <Input
                            {...register("positionName")}
                            id="positionName"
                            name="positionName"
                            variant="bordered"
                            labelPlacement="inside"
                            label="Position Name"
                            placeholder="Enter Position Name"
                            color="secondary"
                            radius="sm"
                            size="sm"
                        />
                        {errors.positionName && (
                            <Alert color="warning" className="mt-2 font-medium" title={errors.positionName.message} />
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
        </>
    );
};

export default UpdateUserInfo;