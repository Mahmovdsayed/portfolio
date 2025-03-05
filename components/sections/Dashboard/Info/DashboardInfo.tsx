'use client'

import DashboardMainTitle from "@/components/UI/DashboardMainTitle";
import { getTimeSince } from "@/functions/formatDuration";
import { Card, CardBody, CardHeader, Chip, Divider, Image } from "@heroui/react";
import { MdVerified } from "react-icons/md";
import UpdateUserInfo from "./UpdateUserInfo";

const DashboardInfo = ({ data }: { data: any }) => {

    return <>

        <div className="mb-4">
            <DashboardMainTitle header="Personal Information" />
        </div>
        <div className="my-4">
            <Card
                shadow="none"
                radius="sm"
            >
                <CardHeader>
                    <div className="flex items-center justify-between w-full">
                        <h4 className="font-semibold text-xl">
                            About Me
                        </h4>
                        <div>
                            <UpdateUserInfo data={data} />
                        </div>
                    </div>

                </CardHeader>
                <CardBody className="px-4">
                    <div className="flex items-center justify-between w-full">
                        <div className="flex items-center justify-start gap-4">
                            <Image
                                src={data?.user?.image?.url}
                                className="w-24 md:w-32 object-cover object-center"
                                alt="user image"
                                isZoomed
                            />
                            <div className="text-start">
                                <h5 className="font-semibold text-lg md:text-xl capitalize">{data?.user?.firstName}{" "}{data?.user?.secondName}</h5>
                                <span className="text-tiny md:text-sm text-default-800">@{data?.user?.userName}</span>
                                <h6 className="font-medium text-xs md:text-sm text-default-700">{getTimeSince(data?.user?.createdAt)}</h6>
                            </div>
                        </div>
                    </div>
                    <Divider className="my-4" />
                    <div className="flex flex-col items-start justify-center gap-3">
                        <div>
                            <h5 className="font-semibold text-sm md:text-base">User ID:</h5>
                            <p className="text-sm md:text-base text-default-600">
                                {data?.user?._id}
                            </p>
                        </div>
                        <div>
                            <h5 className="font-semibold text-sm md:text-base">User Name:</h5>
                            <p className="text-sm md:text-base text-default-600">
                                {data?.user?.userName}
                            </p>
                        </div>
                        <div>
                            <h5 className="font-semibold text-sm md:text-base">First Name:</h5>
                            <p className="text-sm md:text-base text-default-600">
                                {data?.user?.firstName}
                            </p>
                        </div>
                        <div>
                            <h5 className="font-semibold text-sm md:text-base">Last Name:</h5>
                            <p className="text-sm md:text-base text-default-600">
                                {data?.user?.secondName}
                            </p>
                        </div>
                        <div>
                            <h5 className="font-semibold text-sm md:text-base">Email:</h5>
                            <p className="text-sm md:text-base text-default-600">
                                {data?.user?.email} {data?.user?.isVerified ? <Chip title="Verified" size="sm" startContent={<MdVerified />} radius="sm" className="ms-1 bg-transparent text-black">Verified</Chip> : "Not Verified"}
                            </p>
                        </div>
                        <div>
                            <h5 className="font-semibold text-sm md:text-base">bio:</h5>
                            <p className="text-sm md:text-base text-default-600">
                                {data?.user?.bio}
                            </p>
                        </div>
                        <div>
                            <h5 className="font-semibold text-sm md:text-base">about:</h5>
                            <p className="text-sm md:text-base text-default-600">
                                {data?.user?.about}
                            </p>
                        </div>
                    </div>
                </CardBody>
            </Card>
        </div>

    </>;
};
export default DashboardInfo;
