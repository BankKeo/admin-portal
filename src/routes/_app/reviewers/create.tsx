import CreateReviewerForm from "@/features/reviewers/components/create-reviewer-form";
import CreateReviewerHeader from "@/features/reviewers/components/create-reviewer-header";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/reviewers/create")({
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <div className="max-w-4xl m-auto space-y-4 sm:space-y-6">
            <CreateReviewerHeader />
            <CreateReviewerForm />
        </div>
    );
}
