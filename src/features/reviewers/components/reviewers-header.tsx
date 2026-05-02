import Header from "@/components/header";
import { Button } from "@/components/ui/button";
import { useNavigate } from "@tanstack/react-router";
import { UserRoundPlus } from "lucide-react";

const ReviewersHeader = () => {
    const navigate = useNavigate();
    return (
        <div className="flex items-center justify-between">
            <Header
                title="Reviewers Overview"
                description="Track and manage all article Reviewers, review progress, and decisions in one place."
            />

            <Button
                className="gap-2"
                variant="outline"
                onClick={() => navigate({ to: "/reviewers/create" })}
            >
                <UserRoundPlus />
                Add new Reviewer
            </Button>
        </div>
    );
};

export default ReviewersHeader;
