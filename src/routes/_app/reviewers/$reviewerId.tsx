import ReviewerInfo from "@/features/reviewers/components/reviewer-info";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/reviewers/$reviewerId")({
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <div className="space-y-4 sm:space-y-6">
            <ReviewerInfo />
        </div>
    );
}
