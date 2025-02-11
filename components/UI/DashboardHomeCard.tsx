'use client'

import { Card, CardBody, CardHeader } from "@heroui/react";
import { NumberTicker } from "./NumberTicker";

interface IProps {
    title: string
    desc: any
}
const DashboardHomeCard = ({ title, desc }: IProps) => {
    return <>
        <Card className="p-3" radius="sm" shadow="none" isPressable>
            <CardHeader>
                <h4 className="text-sm font-medium">
                    {title}
                </h4>
            </CardHeader>
            <CardBody className="pt-0">
                <p className="text-2xl font-bold">
                    <NumberTicker
                        value={desc}
                    />
                </p>
            </CardBody>
        </Card>
    </>;
};

export default DashboardHomeCard;