import ExperienceLayout from "@/components/sections/Dashboard/Experience/ExperienceLayout";
import { getData } from "@/services/services";


const page = async () => {
    const data = await getData("/work");

    return <>
        <main className="min-h-[100dvh] overflow-x-hidden">
            <div className="container mx-auto py-6 px-4">
                <ExperienceLayout data={data} />
            </div>
        </main>
    </>;
};

export default page;