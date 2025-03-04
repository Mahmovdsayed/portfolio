import DashboardInfo from "@/components/sections/Dashboard/Info/DashboardInfo";
import { getData } from "@/services/services";


const DashboardPage = async () => {
    const data = await getData("/about");

    return (
        <main className="min-h-[100dvh] overflow-x-hidden">
            <div className="container mx-auto py-6 px-4">
                <DashboardInfo data={data} />
            </div>
        </main>
    );
};

export default DashboardPage;
