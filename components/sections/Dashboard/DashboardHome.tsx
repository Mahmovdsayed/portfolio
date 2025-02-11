import DashboardHomeCard from "@/components/UI/DashboardHomeCard";
import DashboardMainTitle from "@/components/UI/DashboardMainTitle";
import DashboardMoreInfo from "@/components/UI/DashboardMoreInfo";

interface IProps {
    user: any
}
const DashboardHome = ({ user }: IProps) => {
    const { id, userEmail, Userimage, firstName, secondName, userName } = user
    return <>
        <div>
            <div className="mb-5">
                <DashboardMainTitle header="Dashboard" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                <DashboardHomeCard title="Total Views" desc="1234" />
                <DashboardHomeCard title="Projects" desc="12" />
                <DashboardHomeCard title="Blog Posts" desc="24" />
                <DashboardHomeCard title="Skills" desc="26" />
            </div>
            <DashboardMoreInfo user={user} />
        </div>

    </>;
};

export default DashboardHome;