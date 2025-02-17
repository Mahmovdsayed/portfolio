'use client'

import DashboardMainTitle from "@/components/UI/DashboardMainTitle";
import { EyeFilledIcon } from "@/icons/EyeFilledIcon";
import { WorkTableColumns } from "@/static/Tables";
import { Image, Tooltip } from "@heroui/react";
import {
    Table,
    TableHeader,
    TableBody,
    TableColumn,
    TableRow,
    TableCell
} from "@heroui/table";
import { MdDelete, MdEditNotifications } from "react-icons/md";

interface IProps {
    data: any;
}

const DashboardExperiences = ({ data }: IProps) => {
    const renderCell = (item: any, columnKey: any) => {
        switch (columnKey) {
            case "image":
                return (
                    <div className="flex items-center justify-center">
                        <Image
                            src={item.companyImage.url}
                            alt={item.companyName}
                            className="w-10 h-10 object-cover object-center z-50"
                            radius="sm"
                        />
                    </div>
                );
            case "companyName":
                return item.companyName;
            case "positionName":
                return item.positionName;
            case "from":
                return new Date(item.from).toLocaleDateString();
            case "to":
                return item.current ? "Present" : new Date(item.to).toLocaleDateString();
            case "employmentType":
                return item.employmentType;
            case "actions":
                return (
                    <div className="relative flex items-center justify-center gap-2">
                        <Tooltip content="Details">
                            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                <EyeFilledIcon />
                            </span>
                        </Tooltip>
                        <Tooltip content="Edit user">
                            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                                <MdEditNotifications />
                            </span>
                        </Tooltip>
                        <Tooltip color="danger" content="Delete user">
                            <span className="text-lg text-danger cursor-pointer active:opacity-50">
                                <MdDelete />
                            </span>
                        </Tooltip>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <>
            <div className="mb-4">
                <DashboardMainTitle header="Work Experience" />
            </div>
            <div className="mt-4">
                <Table isCompact isStriped radius="sm" shadow="none" aria-label="Example static collection table">
                    <TableHeader columns={WorkTableColumns}>
                        {(column) => (
                            <TableColumn key={column.uid} align="center">
                                {column.name}
                            </TableColumn>
                        )}
                    </TableHeader>
                    <TableBody items={data.work}>
                        {(item: any) => (
                            <TableRow key={item._id}>
                                {(columnKey) => <TableCell className="font-medium">{renderCell(item, columnKey)}</TableCell>}
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div >
        </>
    );
};

export default DashboardExperiences;