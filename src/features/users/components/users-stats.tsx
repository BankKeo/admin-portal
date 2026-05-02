import { Card, CardContent } from "@/components/ui/card";
import { ArrowUpRight } from "lucide-react";

const UsersStats = () => {
    return (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {/* Total Users */}
            <Card className="rounded-2xl border-2 border-primary/30 border-l-8 py-0">
                <CardContent className="p-5 space-y-3">
                    <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                        Total Users
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
                        Currently created submissions
                    </p>
                </CardContent>
            </Card>
        </div>
    );
};

export default UsersStats;
