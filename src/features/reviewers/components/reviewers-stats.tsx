import { Card, CardContent } from "@/components/ui/card";
import { ArrowUpRight, ArrowDown } from "lucide-react";

const ReviewersStats = () => {
    return (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {/* Total Reviewers */}
            <Card className="rounded-2xl border-2 border-primary/30 border-l-8 py-0">
                <CardContent className="p-5 space-y-3">
                    <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                        Total Reviewers
                    </p>

                    <h2 className="text-3xl font-semibold tracking-tight">
                        1,284
                    </h2>

                    <div className="flex items-center gap-1 text-sm text-green-600">
                        <ArrowUpRight className="w-4 h-4" />
                        +12% from last month
                    </div>
                </CardContent>
            </Card>

            {/* Active Now */}
            <Card className="rounded-2xl py-0">
                <CardContent className="p-5 space-y-3">
                    <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                        Active Now
                    </p>

                    <h2 className="text-3xl font-semibold tracking-tight">
                        452
                    </h2>

                    <p className="text-sm text-muted-foreground">
                        Currently handling assignments
                    </p>
                </CardContent>
            </Card>

            {/* Avg Response Time */}
            <Card className="rounded-2xl py-0">
                <CardContent className="p-5 space-y-3">
                    <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                        Avg. Response Time
                    </p>

                    <h2 className="text-3xl font-semibold tracking-tight">
                        8.4{" "}
                        <span className="text-base font-medium text-muted-foreground">
                            days
                        </span>
                    </h2>

                    <div className="flex items-center gap-1 text-sm text-green-600">
                        <ArrowDown className="w-4 h-4" />
                        Improved by 1.2 days
                    </div>
                </CardContent>
            </Card>

            {/* Open Requests (Highlighted) */}
            <Card className="rounded-2xl bg-primary text-white py-0">
                <CardContent className="p-5 space-y-3">
                    <p className="text-xs font-semibold uppercase tracking-wide text-white/70">
                        Open Requests
                    </p>

                    <h2 className="text-3xl font-semibold tracking-tight">
                        37
                    </h2>

                    <button className="text-sm underline underline-offset-2 hover:text-white/80">
                        Assign Reviewers
                    </button>
                </CardContent>
            </Card>
        </div>
    );
};

export default ReviewersStats;
