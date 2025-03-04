'use client'

import { image, Image, Modal, ModalBody, ModalContent } from "@heroui/react";

interface IProps {
    isOpen: boolean;
    onClose: () => void;
    imageURL: string;
}
const ImageModal = ({ isOpen, onClose, imageURL }: IProps) => {
    return <>
        <Modal closeButton={false} shadow="none" className="bg-transparent" placement="center" radius="sm" backdrop="blur" isOpen={isOpen} onOpenChange={onClose}>
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalBody className="pb-6">
                            <Image
                                src={imageURL}
                                className="w-full h-full object-cover object-center"
                            />
                        </ModalBody>
                    </>
                )}
            </ModalContent>
        </Modal>
    </>;
};

export default ImageModal;