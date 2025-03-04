'use client'

import DashboardMainTitle from "@/components/UI/DashboardMainTitle";
import AddNewWork from "./AddNewWork";
import WorkCard from "@/components/UI/WorkCard";

interface IProps {
    data: any;
}
const ExperienceLayout = ({ data }: IProps) => {
    return <>
        <div className="mb-4 flex items-center justify-between w-full">
            <DashboardMainTitle header="Work Experience" />
            <div>
                <AddNewWork />
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {data?.work.map((item: any) =>
                <WorkCard
                    allData={item}
                    key={item._id}
                    companyName={item.companyName}
                    positionName={item.positionName}
                    employmentType={item.employmentType}
                    description={item.description}
                    startDate={item.from}
                    endDate={item.to}
                    imageURL={item.companyImage.url}
                    current={item.current}
                    id={item._id}
                />

            )}
        </div>


    </>;
};

export default ExperienceLayout;