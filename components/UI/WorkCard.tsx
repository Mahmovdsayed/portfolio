'use client'

import { Card, CardBody, CardFooter, Button, Image, Textarea } from "@heroui/react";
import { FaEye } from "react-icons/fa";
import DashBoardModal from "./DashBoardModal";
import { useState } from "react";

import DeleteWork from "../sections/Dashboard/Experience/DeleteWork";
import UpdateWork from "../sections/Dashboard/Experience/UpdateWork";

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
    allData: any;
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
    allData
}: IProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);


    const handleView = () => {
        handleOpenModal();
    };

    return (
        <>
            <Card shadow="none">
                <CardBody className="p-4">
                    <div className="flex items-center space-x-4">
                        <Image
                            src={imageURL}
                            alt={companyName}
                            className="w-12 h-12 rounded-full object-cover"
                        />

                        <div>
                            <h3 className="text-md font-semibold capitalize">{companyName}</h3>
                            <p className="text-sm text-gray-600 capitalize">{positionName}</p>
                        </div>
                    </div>

                    <div className="mt-3 space-y-1">
                        <p className="text-sm text-gray-700">
                            <span className="font-medium">Type:</span> {employmentType}
                        </p>
                        <p className="text-sm text-gray-700">
                            <span className="font-medium">Duration:</span> {startDate} - {current ? "Present" : endDate}
                        </p>
                    </div>
                </CardBody>

                <CardFooter className="p-4 border-t">
                    <div className="flex items-center justify-center w-full space-x-2">
                        <DeleteWork id={id} />
                        <UpdateWork data={allData} id={id} />
                        <Button
                            radius="sm"
                            className="w-full font-medium"
                            size="sm"
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


            <DashBoardModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                title="Work Experience Details"
            >
                <div className="space-y-4">
                    <div className="flex items-center space-x-3 ">
                        <Image
                            src={imageURL}
                            alt={companyName}
                            className="w-20 h-20 rounded-lg object-cover object-center shadow-sm"
                        />
                        <div>
                            <h3 className="text-xl font-bold text-gray-800">{companyName}</h3>
                            <p className="text-sm text-gray-600">{positionName}</p>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <div className="space-y-2">
                            <p className="text-sm text-gray-700">
                                <span className="font-semibold">Employment Type:</span> {employmentType}
                            </p>
                            <p className="text-sm text-gray-700">
                                <span className="font-semibold">Duration:</span> {startDate} - {current ? "Present" : endDate}
                            </p>
                            {description && (
                                <div className="mt-2 ">
                                    <p className="text-sm text-gray-700">
                                        <span className="font-semibold">Description:</span>
                                    </p>
                                    <Textarea
                                        defaultValue={description}
                                        isReadOnly
                                        className="mt-2 font-medium"
                                        variant="underlined"
                                        size="sm"
                                        radius="sm"
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </DashBoardModal>
        </>
    );
};

export default WorkCard;