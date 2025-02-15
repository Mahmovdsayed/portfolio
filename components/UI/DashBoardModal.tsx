'use client';
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
} from "@heroui/modal";
import { Button } from "@heroui/react";
import React from "react";

interface IProps {
    title: string;
    children: React.ReactNode;
    isOpen: boolean;
    onClose: () => void;
}

const DashBoardModal = ({ title, children, isOpen, onClose }: IProps) => {
    return (
        <Modal placement="center" radius="sm" backdrop="blur" isOpen={isOpen} onOpenChange={onClose}>
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">
                            {title}
                        </ModalHeader>
                        <ModalBody className="pb-6">
                            {children}
                        </ModalBody>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
};

export default DashBoardModal;