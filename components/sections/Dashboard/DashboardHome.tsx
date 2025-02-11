'use client'
import { Image } from "@heroui/react";

interface IProps {
    user: any
}
const DashboardHome = ({ user }: IProps) => {
    return <>
        <div className="my-6">
            <Image className="w-48 " radius="full" src={user?.Userimage?.url} />
        </div>

    </>;
};

export default DashboardHome;