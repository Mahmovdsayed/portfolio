'use client'

import { Card, CardBody, CardFooter, CardHeader, Button, Image, addToast } from "@heroui/react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { FaTrash, FaEdit, FaEye } from "react-icons/fa";

interface IProps {
    companyName: string;
    positionName: string;
    employmentType: string;
    description: string;
    startDate: string;
    endDate: string;
    imageURL: string;
    current: boolean;
    id: string;
}

const WorkCard = ({
    companyName,
    positionName,
    employmentType,
    description,
    startDate,
    endDate,
    imageURL,
    current,
    id,

}: IProps) => {

    const router = useRouter()
    const handleDelete = async (id: string) => {
        try {
            const { data } = await axios.delete("/api/work/delete", {
                data: { workID: id },
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            });

            if (data.success) {
                addToast({
                    color: "foreground",
                    variant: "flat",
                    title: "Work experience deleted successfully!",
                    timeout: 4500,
                    shouldShowTimeoutProgess: true,
                    description: "Your work experience has been deleted successfully!",
                    shadow: "lg",
                    size: "sm",
                    radius: "sm",
                    severity: "success"
                });
                router.refresh();
            } else {
                addToast({
                    color: "foreground",
                    variant: "flat",
                    title: "Failed to delete work experience.",
                    description: "Something went wrong.",
                    timeout: 4500,
                    shouldShowTimeoutProgess: true,
                    shadow: "lg",
                    size: "sm",
                    radius: "sm",
                    severity: "danger"
                });
            }
        } catch (error: any) {
            addToast({
                color: "foreground",
                variant: "flat",
                title: "An error occurred!",
                timeout: 4500,
                shouldShowTimeoutProgess: true,
                description: "Something went wrong.",
                shadow: "lg",
                size: "sm",
                radius: "sm",
                severity: "danger"
            });
        }
    };

    const handleUpdate = () => {
        console.log("Update card with ID:", id);
    };

    const handleView = () => {
        console.log("View card with ID:", id);
    };

    return (
        <Card shadow="none">
            <CardHeader className="p-4 border-b">
                <div className="flex items-center space-x-4">
                    <Image
                        src={imageURL}
                        alt={companyName}
                        className="w-12 h-12 object-center object-cover"
                    />
                    <div>
                        <h3 className="text-lg font-semibold capitalize">{companyName}</h3>
                        <p className="text-sm text-default-600">{positionName}</p>
                    </div>
                </div>
            </CardHeader>
            <CardBody className="p-4">
                <div className="space-y-2">
                    <p className="text-sm text-default-600">
                        <span className="font-medium">Employment Type:</span> {employmentType}
                    </p>
                    <p className="text-sm text-default-600">
                        <span className="font-medium">Duration:</span> {startDate} - {current ? "Present" : endDate}
                    </p>
                    {description != null ?
                        <p className="text-sm text-default-600">
                            <span className="font-medium">Description:</span> {description}
                        </p>
                        : ""
                    }

                </div>
            </CardBody>
            <CardFooter className="p-4 border-t">
                <div className="flex w-full items-center justify-between space-x-2">
                    <Button
                        radius="sm"
                        className="w-full font-medium"
                        color="danger"
                        variant="flat"
                        startContent={<FaTrash />}
                        onClick={() => handleDelete(id)}
                    >
                        Delete
                    </Button>
                    <Button
                        radius="sm"
                        className="w-full font-medium"
                        color="primary"
                        variant="flat"
                        startContent={<FaEdit />}
                        onClick={handleUpdate}
                    >
                        Update
                    </Button>
                    <Button
                        radius="sm"
                        className="w-full font-medium"
                        variant="flat"
                        color="secondary"
                        startContent={<FaEye />}
                        onClick={handleView}
                    >
                        View
                    </Button>
                </div>
            </CardFooter>
        </Card>
    );
};

export default WorkCard;