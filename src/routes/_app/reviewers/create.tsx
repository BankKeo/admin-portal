import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/reviewers/create")({
    component: RouteComponent,
});

function RouteComponent() {
    return <div>Hello "/_app/reviewers/create"!</div>;
}
