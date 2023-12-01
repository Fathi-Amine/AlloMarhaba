// DashboardNavbar.jsx

import React, { useState } from "react";
import DashboardSideBar from "../../components/dashComponents/DashSideBar";
import DashboardTable from "../../components/dashComponents/DashTable";
import DashboardOrderTable from "../../components/dashComponents/DashOrderTable"; // Import the component for orders
import 'flowbite';
// import "./DashboardNavbar.css";

export default function DashboardNavbar() {
    const [selectedComponent, setSelectedComponent] = useState("dashboard"); // Default component is "dashboard"

    const handleComponentChange = (component) => {
        setSelectedComponent(component);
    };

    return (
        <div className="dashboard-container">
            <div className="dashboard-sidebar">
                <DashboardSideBar onComponentChange={handleComponentChange} />
            </div>
            <div className="dashboard-content">
                {selectedComponent === "menutable" && <DashboardTable />}
                {selectedComponent === "orders" && <DashboardOrderTable />} {/* Render the orders component when selected */}
                {/* Add other conditions for different components */}
            </div>
        </div>
    );
}
