import CreateUserForm from "@/features/users/components/create-user-form";
import CreateUserHeader from "@/features/users/components/create-user-header";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/users/create")({
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <div className="max-w-4xl m-auto space-y-4 sm:space-y-6">
            <CreateUserHeader />
            <CreateUserForm />
        </div>
    );
}
