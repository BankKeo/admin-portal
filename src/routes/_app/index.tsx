import HomeCharts from "@/features/home/components/home-charts";
import HomeStatsCards from "@/features/home/components/home-stats-cards";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/")({
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <div className="space-y-4 sm:space-y-6">
            <HomeStatsCards />
            <HomeCharts />
        </div>
    );
}
