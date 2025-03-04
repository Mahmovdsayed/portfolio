'use client';

import { DatePicker, Checkbox, Form, SelectItem, Select, Button } from "@heroui/react";
import { FaEdit, FaSave } from "react-icons/fa";
import { useState } from "react";
import { useRouter } from "next/navigation";
import DashBoardModal from "@/components/UI/DashBoardModal";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, SubmitHandler, useForm, useWatch } from "react-hook-form";
import { ExperienceValidationSchema } from "@/Validation/ExperienceValidation";
import { z } from "zod";
import { Input, Textarea, Alert } from "@heroui/react";
import { parseDate } from "@internationalized/date";
import { employmentType } from "@/static/constant";
import { putData } from "@/services/services";
import { AddToast } from "@/functions/AddToast";

type WorkFormValues = z.infer<typeof ExperienceValidationSchema>;

interface IProps {
    id: string;
    data: any;
}

const UpdateWork = ({ id, data }: IProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleOpenModal = () => {
        reset({
            companyName: data?.companyName || "",
            positionName: data?.positionName || "",
            description: data?.description || "",
            from: data?.from || "",
            to: data?.to || "",
            employmentType: data?.employmentType || "Full-time",
            current: data?.current || false,
        });
        setIsModalOpen(true);
    };
    const handleCloseModal = () => setIsModalOpen(false);
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);



    const { control, register, handleSubmit, formState: { errors }, setValue, reset } = useForm<WorkFormValues>({
        resolver: zodResolver(ExperienceValidationSchema),
        defaultValues: {
            companyName: data?.companyName || "",
            positionName: data?.positionName || "",
            description: data?.description || "",
            from: data?.from || "",
            to: data?.to || "",
            employmentType: data?.employmentType || "Full-time",
            companyImage: null,
            current: data?.current || false,
        }
    });

    const current = useWatch({ control, name: "current" });

    const onSubmit: SubmitHandler<WorkFormValues> = async (formData) => {
        setIsLoading(true);

        try {
            const formDataToSend = new FormData();

            formDataToSend.append("companyName", formData.companyName);
            formDataToSend.append("positionName", formData.positionName);
            if (formData.description) {
                formDataToSend.append("description", formData.description);
            }
            formDataToSend.append("employmentType", formData.employmentType);
            formDataToSend.append("current", formData.current!.toString());
            formDataToSend.append("id", id);
            if (formData.from) {
                const fromDate = new Date(formData.from);
                formDataToSend.append("from", `${fromDate.getMonth() + 1}/${fromDate.getDate()}/${fromDate.getFullYear()}`);
            }
            if (formData.to && !formData.current) {
                const toDate = new Date(formData.to);
                formDataToSend.append("to", `${toDate.getMonth() + 1}/${toDate.getDate()}/${toDate.getFullYear()}`);
            }

            const response = await putData(`/work/update`, formDataToSend);

            if (response.status) {
                AddToast(
                    "Experience updated successfully!",
                    "Your work experience has been updated successfully!",
                    4500,
                    "success"
                );

                reset({
                    companyName: response.updatedWork.companyName,
                    positionName: response.updatedWork.positionName,
                    description: response.updatedWork.description,
                    from: response.updatedWork.from,
                    to: response.updatedWork.to,
                    employmentType: response.updatedWork.employmentType,
                    current: response.updatedWork.current,
                });

                router.refresh();
                handleCloseModal();
            } else {
                AddToast(
                    "Something went wrong!",
                    response.message || "Failed to update work experience.",
                    4500,
                    "danger"
                )
            }
        } catch (error: any) {
            AddToast(
                "Something went wrong!",
                "Failed to update work experience.",
                4500,
                "danger"
            )
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <Button
                onPress={handleOpenModal}
                variant="flat"
                color="primary"
                className="font-medium w-full"
                startContent={<FaEdit />}
                size="sm"
                radius="sm"
            >
                Update
            </Button>

            <DashBoardModal
                title="Update Work Experience"
                isOpen={isModalOpen}
                onClose={handleCloseModal}
            >
                <Form

                    className="w-full flex mx-auto flex-col gap-3"
                    onSubmit={handleSubmit(onSubmit)}
                    encType="multipart/form-data"
                >
                    <Input
                        {...register("companyName")}
                        id="companyName"
                        name="companyName"
                        variant="bordered"
                        labelPlacement="inside"
                        label="Company Name"
                        placeholder="Enter Company Name"
                        isRequired
                        radius="sm"
                        size="sm"
                    />
                    {errors.companyName && (
                        <Alert color="warning" className="mt-2 font-medium" title={errors.companyName.message} />
                    )}

                    <Input
                        {...register("positionName")}
                        id="positionName"
                        name="positionName"
                        variant="bordered"
                        isRequired
                        labelPlacement="inside"
                        label="Position Name"
                        placeholder="Enter Position Name"
                        radius="sm"
                        size="sm"
                    />
                    {errors.positionName && (
                        <Alert color="warning" className="mt-2 font-medium" title={errors.positionName.message} />
                    )}

                    <Controller
                        name="employmentType"
                        control={control}
                        defaultValue={data?.employmentType || "Full-time"}
                        render={({ field }) => (
                            <Select
                                {...field}
                                label="Employment Type"
                                variant="bordered"
                                isRequired
                                radius="sm"
                                size="sm"
                                selectedKeys={[field.value]}
                                placeholder="Select employment type"
                                onChange={(value) => field.onChange(value)}
                            >
                                {employmentType.map((e) => (
                                    <SelectItem key={e.key} id={e.key}>
                                        {e.label}
                                    </SelectItem>
                                ))}
                            </Select>
                        )}
                    />
                    {errors.employmentType && (
                        <Alert color="warning" className="mt-2 font-medium" title={errors.employmentType.message} />
                    )}

                    <Textarea
                        {...register("description")}
                        id="description"
                        name="description"
                        variant="bordered"
                        labelPlacement="inside"
                        label="Description"
                        placeholder="Enter Description"
                        radius="sm"
                        size="sm"
                    />
                    {errors.description && (
                        <Alert color="warning" className="mt-2 font-medium" title={errors.description.message} />
                    )}

                    <Controller
                        name="from"
                        control={control}
                        render={({ field }) => {
                            const isoDate = field.value ? new Date(field.value).toISOString().split('T')[0] : null;
                            return (
                                <DatePicker
                                    {...field}
                                    isRequired
                                    showMonthAndYearPickers
                                    id="from"
                                    variant="bordered"
                                    label="Enter Start Date"
                                    radius="sm"
                                    size="sm"
                                    value={isoDate ? parseDate(isoDate) : null}
                                    onChange={(dateValue) => {
                                        const formattedDate = dateValue ? `${dateValue.year}-${String(dateValue.month).padStart(2, '0')}-${String(dateValue.day).padStart(2, '0')}` : "";
                                        field.onChange(formattedDate);
                                    }}
                                />
                            );
                        }}
                    />
                    {errors.from && (
                        <Alert color="warning" className="mt-2 font-medium" title={errors.from.message} />
                    )}

                    <Controller
                        name="to"
                        control={control}
                        render={({ field }) => {
                            const isoDate = field.value ? new Date(field.value).toISOString().split('T')[0] : null;
                            return (
                                <DatePicker
                                    {...field}
                                    showMonthAndYearPickers
                                    id="to"
                                    variant="bordered"
                                    label="Enter End Date"
                                    radius="sm"
                                    size="sm"
                                    value={isoDate ? parseDate(isoDate) : null}
                                    onChange={(dateValue) => {
                                        const formattedDate = dateValue ? `${dateValue.year}-${String(dateValue.month).padStart(2, '0')}-${String(dateValue.day).padStart(2, '0')}` : "";
                                        field.onChange(formattedDate);
                                    }}
                                    isDisabled={current}
                                />
                            );
                        }}
                    />

                    {errors.to && (
                        <Alert color="warning" className="mt-2 font-medium" title={errors.to.message} />
                    )}

                    <Checkbox
                        {...register("current")}
                        id="current"
                        name="current"
                        size="sm"
                        radius="sm"
                        color="default"
                        onChange={(e) => {
                            setValue("current", e.target.checked);
                            if (e.target.checked) {
                                setValue("to", "");
                            }
                        }}
                    >
                        I currently work here
                    </Checkbox>

                    <Button
                        type="submit"
                        size="sm"
                        radius="sm"
                        className="mt-2 w-full font-medium"
                        isDisabled={isLoading}
                        isLoading={isLoading}
                        startContent={<FaSave />}
                    >
                        {isLoading ? "Updating..." : "Update"}
                    </Button>
                </Form>
            </DashBoardModal>
        </>
    );
};

export default UpdateWork;