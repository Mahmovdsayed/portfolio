'use client'

interface IProps {
    header: string
}
const DashboardMainTitle = ({ header }: IProps) => {
    return <>
        <h1 className="text-start font-bold text-xl md:text-2xl">
            {header}
        </h1>
    </>;
};

export default DashboardMainTitle;