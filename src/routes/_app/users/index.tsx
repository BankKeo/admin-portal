import UsersHeader from "@/features/users/components/users-header";
import UsersStats from "@/features/users/components/users-stats";
import UsersTable from "@/features/users/components/users-table";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/users/")({
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <div className="space-y-4 sm:space-y-6">
            <UsersHeader />
            <UsersStats />
            <UsersTable />
        </div>
    );
}
