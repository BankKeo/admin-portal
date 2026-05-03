import { Card, CardContent } from "@/components/ui/card";

const ReviewerStats = () => {
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
                        Avg. Turnaround
                    </p>

                    <h2 className="text-3xl font-semibold tracking-tight">
                        4{" "}
                        <span className="text-base font-medium text-muted-foreground">
                            days
                        </span>
                    </h2>
                </CardContent>
            </Card>

            {/* Avg Response Time */}
            <Card className="rounded-2xl py-0">
                <CardContent className="p-5 space-y-3">
                    <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                        Acceptance Rate
                    </p>

                    <h2 className="text-3xl font-semibold tracking-tight">
                        15{" "}
                        <span className="text-base font-medium text-muted-foreground">
                            %
                        </span>
                    </h2>
                </CardContent>
            </Card>

            {/* Open Requests (Highlighted) */}
            <Card className="rounded-2xl bg-primary text-white py-0">
                <CardContent className="p-5 space-y-3">
                    <p className="text-xs font-semibold uppercase tracking-wide text-white/70">
                        Current Workload
                    </p>

                    <h2 className="text-3xl font-semibold tracking-tight">
                        2 <span className="text-base font-medium">actives</span>
                    </h2>
                </CardContent>
            </Card>
        </div>
    );
};

export default ReviewerStats;
