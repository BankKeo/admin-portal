import SubmissionDetails from "@/features/submissions/components/submission-details";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/submissions/$submissionId")({
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <div className="space-y-4 sm:space-y-6">
            <SubmissionDetails />
        </div>
    );
}
