'use client'

import { DatePicker, Checkbox, Form, SelectItem, Select, Button } from "@heroui/react";

import { IoMdAdd } from "react-icons/io";
import { useState } from "react";
import { useRouter } from "next/navigation";
import DashBoardModal from "@/components/UI/DashBoardModal";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, SubmitHandler, useForm, useWatch } from "react-hook-form";
import { ExperienceValidationSchema } from "@/Validation/ExperienceValidation";
import { z } from "zod";
import { Input, Textarea, Alert } from "@heroui/react";
import axios from "axios";
import { addToast } from "@heroui/react";
import { parseDate, getLocalTimeZone } from "@internationalized/date";
import { FaSave } from "react-icons/fa";
import { employmentType } from "@/static/constant";



type WorkFormValues = z.infer<typeof ExperienceValidationSchema>;

const AddNewWork = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);


    const { control, register, handleSubmit, formState: { errors }, setValue, reset } = useForm<WorkFormValues>({
        resolver: zodResolver(ExperienceValidationSchema),
        defaultValues: {
            companyName: "",
            positionName: "",
            description: "",
            from: "",
            to: "",
            employmentType: "Full-time",
            companyImage: null,
            current: false,
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

            if (formData.from) {
                const fromDate = new Date(formData.from);
                formDataToSend.append("from", `${fromDate.getMonth() + 1}/${fromDate.getDate()}/${fromDate.getFullYear()}`);
            }
            if (formData.to && !formData.current) {
                const toDate = new Date(formData.to);
                formDataToSend.append("to", `${toDate.getMonth() + 1}/${toDate.getDate()}/${toDate.getFullYear()}`);
            }

            const companyImageInput = document.querySelector('input[name="companyImage"]') as HTMLInputElement;
            if (companyImageInput && companyImageInput.files && companyImageInput.files[0]) {
                formDataToSend.append("companyImage", companyImageInput.files[0]);
            }

            const response = await axios.post('/api/work/add', formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.data.success) {
                addToast({
                    color: "foreground",
                    variant: "flat",
                    title: "Experience added successfully!",
                    timeout: 4500,
                    shouldShowTimeoutProgess: true,
                    description: "Your work experience has been added successfully!",
                    shadow: "lg",
                    size: "sm",
                    radius: "sm",
                    severity: "success",

                });
                router.refresh();
                reset();
                handleCloseModal();
            }
        } catch (error: any) {
            addToast({
                color: "foreground",
                variant: "flat",
                title: error.response?.data?.error || "Something went wrong!",
                timeout: 4500,
                shouldShowTimeoutProgess: true,
                description: "Failed to add work experience.",
                shadow: "lg",
                size: "sm",
                radius: "sm",
                severity: "danger",
            });
            handleCloseModal();
        } finally {
            setIsLoading(false);
        }
    };


    return <>
        <Button
            onPress={handleOpenModal}
            variant="bordered"
            className="font-medium"
            startContent={<IoMdAdd />}
            size="sm"
            radius="sm">Add Work
        </Button>

        <DashBoardModal
            title="Add New Work Experience"
            isOpen={isModalOpen}
            onClose={handleCloseModal}
        >
            <div>
                <Form
                    action="/api/work/add"
                    method="post"
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
                        defaultValue="Full-time"
                        render={({ field }) => (
                            <Select
                                {...field}
                                label="Employment Type"
                                variant="bordered"
                                isRequired
                                radius="sm"
                                size="sm"
                                value={field.value}
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
                        render={({ field }) => (
                            <DatePicker
                                {...field}
                                isRequired
                                showMonthAndYearPickers
                                id="from"
                                variant="bordered"
                                label="Enter Start Date"

                                radius="sm"
                                size="sm"
                                value={field.value ? parseDate(field.value) : null}
                                onChange={(dateValue) => {
                                    field.onChange(dateValue?.toString());
                                }}
                            />
                        )}
                    />
                    {errors.from && (
                        <Alert color="warning" className="mt-2 font-medium" title={errors.from.message} />
                    )}

                    <Controller
                        name="to"
                        control={control}
                        render={({ field }) => (
                            <DatePicker
                                {...field}
                                showMonthAndYearPickers
                                id="to"
                                variant="bordered"
                                label="Enter End Date"

                                radius="sm"
                                size="sm"
                                value={field.value ? parseDate(field.value) : null}
                                onChange={(dateValue) => {
                                    field.onChange(dateValue?.toString());
                                }}
                                isDisabled={current}
                            />
                        )}
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

                    <Input

                        id="companyImage"
                        name="companyImage"
                        variant="bordered"
                        labelPlacement="inside"
                        label="Company Image"

                        radius="sm"
                        size="sm"
                        type="file"
                        accept="image/*"
                    />
                    {errors.companyImage && (
                        <Alert color="warning" className="mt-2 font-medium" title={errors.companyImage.message} />
                    )}
                    <Button
                        type="submit"
                        size="sm"
                        radius="sm"
                        className="mt-2 w-full font-medium"
                        isDisabled={isLoading}
                        isLoading={isLoading}
                        startContent={<FaSave />}
                    >
                        {isLoading ? "Saving..." : "Save"}
                    </Button>
                </Form>
            </div>
        </DashBoardModal>
    </>;
};

export default AddNewWork;