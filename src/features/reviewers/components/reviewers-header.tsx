import { Button } from "@/components/ui/button";
import { useNavigate } from "@tanstack/react-router";
import { UserRoundPlus } from "lucide-react";

const ReviewersHeader = () => {
    const navigate = useNavigate();
    return (
        <div className="flex items-center justify-between">
            <div>
                <h1 className="text-2xl font-semibold">Reviewers Overview</h1>
                <p className="text-sm text-muted-foreground mt-1">
                    Track and manage all article Reviewers, review progress, and
                    decisions in one place.
                </p>
            </div>

            <Button
                className="gap-2"
                onClick={() => navigate({ to: "/reviewers/create" })}
            >
                <UserRoundPlus />
                Add new Reviewer
            </Button>
        </div>
    );
};

export default ReviewersHeader;
