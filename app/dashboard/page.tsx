import DashboardHome from "@/components/sections/Dashboard/DashboardHome";
import { DecodeAndVerifyJWT } from "@/functions/Decode";

const Dashboard = async () => {
    const user = await DecodeAndVerifyJWT()

    return (
        <main className="min-h-[100dvh] overflow-x-hidden">
            <div className="container mx-auto px-4 py-6">
                <DashboardHome user={user} />
            </div>
        </main>
    );
};

export default Dashboard;
