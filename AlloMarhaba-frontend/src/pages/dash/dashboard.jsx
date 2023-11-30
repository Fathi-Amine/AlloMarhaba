import DashboardNavBar from "../../components/dashComponents/DashNavBar";
import DashboardSideBar from "../../components/dashComponents/DashSideBar";
import DashboardTable from "../../components/dashComponents/DashTable";
import "flowbite";

export default function DashboardNavbar() {
    return (
        <div>
            <DashboardNavBar />
            <DashboardSideBar />
            <DashboardTable />
        </div>
    );
}
