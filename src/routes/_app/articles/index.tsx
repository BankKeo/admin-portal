import SubmissionsHeader from "@/features/submissions/components/submissions-header";
import SubmissionsStatCard from "@/features/submissions/components/submissions-stats-cards";
import SubmissionsTable from "@/features/submissions/components/submissions-table";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/articles/")({
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <div className="space-y-4 sm:space-y-6">
            <SubmissionsHeader />
            <SubmissionsStatCard />
            <SubmissionsTable />
        </div>
    );
}
