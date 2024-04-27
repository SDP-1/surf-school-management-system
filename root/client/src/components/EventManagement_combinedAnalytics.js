import React from "react";

import EventLineChart from "./EventManagement_Linechart";
import Analytics from "./EventManagement_EventAnalytics";

function CombinedChartsPage() {
    return (
        <div>
            <EventLineChart />
            <Analytics />
        </div>
    );
}

export default CombinedChartsPage;
