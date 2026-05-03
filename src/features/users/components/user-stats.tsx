import { Card, CardContent } from "@/components/ui/card";

const UserStats = () => {
    return (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {/* Total Reviewers */}
            <Card className="rounded-2xl border-2 border-primary/30 border-l-8 py-0">
                <CardContent className="p-5 space-y-3">
                    <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                        Total Reviews
                    </p>

                    <h2 className="text-3xl font-semibold tracking-tight">
                        1,284
                    </h2>
                </CardContent>
            </Card>

            {/* Active Now */}
            <Card className="rounded-2xl py-0">
                <CardContent className="p-5 space-y-3">
                    <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                        Under Review
                    </p>

                    <h2 className="text-3xl font-semibold tracking-tight">4</h2>
                </CardContent>
            </Card>

            {/* Avg Response Time */}
            <Card className="rounded-2xl py-0">
                <CardContent className="p-5 space-y-3">
                    <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                        Accepted
                    </p>

                    <h2 className="text-3xl font-semibold tracking-tight">
                        15
                    </h2>
                </CardContent>
            </Card>

            {/* Open Requests (Highlighted) */}
            <Card className="rounded-2xl border-2 border-red-600/30 border-l-8 py-0">
                <CardContent className="p-5 space-y-3">
                    <p className="text-xs font-semibold uppercase tracking-wide">
                        Rejected
                    </p>

                    <h2 className="text-3xl font-semibold tracking-tight">2</h2>
                </CardContent>
            </Card>
        </div>
    );
};

export default UserStats;
