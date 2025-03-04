'use client'
import DashBoardModal from "@/components/UI/DashBoardModal";
import { AddToast } from "@/functions/AddToast";
import { deleteData } from "@/services/services";
import { Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaTrash } from "react-icons/fa";

interface IProps {
    id: string
}
const DeleteWork = ({ id }: IProps) => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);
    const router = useRouter();

    const handleDelete = async () => {
        handleCloseModal();
        try {
            const data = await deleteData("/work/delete", id)
            if (data.success) {
                AddToast(
                    "Work experience deleted successfully!",
                    "Your work experience has been deleted successfully!",
                    4500,
                    "success"
                )
                router.refresh();
            } else {
                AddToast(
                    "Failed to delete work experience.",
                    `${data.message}`,
                    4500,
                    "warning"
                )
            }
        } catch (error: any) {
            AddToast(
                "An error occurred!",
                "Something went wrong.",
                4500,
                "danger"
            )
        }
    };

    return <>
        <Button
            radius="sm"
            size="sm"
            color="danger"
            className="w-full font-medium"
            variant="flat"
            startContent={<FaTrash />}
            onPress={() => handleOpenModal()}
        >
            Delete
        </Button>

        <DashBoardModal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            title="Delete Work Experience"
        >
            <div className="font-medium text-sm md:text-base">
                <p>Are you sure you want to delete this work experience?</p>
                <p className="text-red-500 mt-3 ">Warning: This action is irreversible!</p>

                <div className="flex justify-end mt-4 space-x-2 font-medium">
                    <Button
                        radius="sm"
                        size="sm"
                        variant="flat"
                        onClick={handleCloseModal}
                    >
                        Cancel
                    </Button>
                    <Button
                        radius="sm"
                        size="sm"
                        color="danger"
                        onClick={handleDelete}
                    >
                        Delete Work Experience
                    </Button>
                </div>

            </div>
        </DashBoardModal>
    </>;
};

export default DeleteWork;