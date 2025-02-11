import DashboardHome from "@/components/sections/Dashboard/DashboardHome";
import { DecodeAndVerifyJWT } from "@/functions/Decode";

const Dashboard = async () => {
    const user = await DecodeAndVerifyJWT()

    return (
        <main className="min-h-[100dvh] overflow-x-hidden">
            <div className="container mx-auto px-4 py-6">
                <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
                <p className="mt-2 text-gray-600">Welcome to your dashboard!</p>
                <DashboardHome user={user} />
            </div>
        </main>
    );
};

export default Dashboard;
