import UserInfo from "@/features/users/components/user-info";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/users/$userId")({
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <div>
            <UserInfo />
        </div>
    );
}
