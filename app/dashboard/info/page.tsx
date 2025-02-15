import DashboardInfo from "@/components/sections/Dashboard/DashboardInfo";
import { cookies } from "next/headers";

const fetchData = async () => {
    try {
        const token = (await cookies()).get("userToken")?.value;
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
        const res = await fetch(`${baseUrl}/api/about`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Cookie: `userToken=${token}`,

            },
            cache: "no-store",
            credentials: "include"
        });
        return res.json();
    } catch (error) {
        console.error("Error fetching data:", error);
        return null;
    }
};

const DashboardPage = async () => {
    const data = await fetchData();

    return (
        <main className="min-h-[100dvh] overflow-x-hidden">
            <div className="container mx-auto py-6 px-4">
                <DashboardInfo data={data} />
            </div>
        </main>
    );
};

export default DashboardPage;
