'use client'

import { TextAnimate } from "./TextAnimate";

interface IProps {
    header: string
}
const DashboardMainTitle = ({ header }: IProps) => {
    return <>
        <h1 className="text-start font-bold text-xl md:text-2xl">
            <TextAnimate animation="slideLeft" by="character">
                {header}
            </TextAnimate>

        </h1>
    </>;
};

export default DashboardMainTitle;