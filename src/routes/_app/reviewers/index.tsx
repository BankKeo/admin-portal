import ReviewersHeader from "@/features/reviewers/components/reviewers-header";
import ReviewersStats from "@/features/reviewers/components/reviewers-stats";
import ReviewersTable from "@/features/reviewers/components/reviewers-table";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/reviewers/")({
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <div className="space-y-4 sm:space-y-6">
            <ReviewersHeader />
            <ReviewersStats />
            <ReviewersTable />
        </div>
    );
}
