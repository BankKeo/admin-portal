import { Button } from "@/components/ui/button";
import { useNavigate } from "@tanstack/react-router";
import { UserRoundPlus } from "lucide-react";

const UsersHeader = () => {
    const navigate = useNavigate();
    return (
        <div className="flex items-center justify-between">
            <div>
                <h1 className="text-2xl font-semibold">Users Overview</h1>
                <p className="text-sm text-muted-foreground mt-1">
                    Track and manage all article Users, review progress, and
                    decisions in one place.
                </p>
            </div>

            <Button
                className="gap-2"
                variant="outline"
                onClick={() => navigate({ to: "/users/create" })}
            >
                <UserRoundPlus />
                Add new User
            </Button>
        </div>
    );
};

export default UsersHeader;
