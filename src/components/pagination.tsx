import { Button } from "./ui/button";

const Pagination = () => {
    return (
        <div className="flex items-center justify-between p-4 text-sm text-muted-foreground w-full bg-muted/60">
            <span>Previous</span>

            <div className="flex items-center gap-2">
                <Button size="sm" variant="default">
                    1
                </Button>
                <Button size="sm" variant="ghost">
                    2
                </Button>
                <Button size="sm" variant="ghost">
                    3
                </Button>
                <span>...</span>
                <Button size="sm" variant="ghost">
                    128
                </Button>
            </div>

            <span>Next</span>
        </div>
    );
};

export default Pagination;
