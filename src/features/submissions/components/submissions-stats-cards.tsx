import { Card, CardContent } from "@/components/ui/card";
import { FileText, Hourglass, RefreshCcw, CheckCircle, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const stats = [
    {
        title: "Total Articles",
        value: 128,
        change: "+12.5%",
        trend: "up",
        icon: FileText,
        iconBg: "bg-blue-100 text-blue-600",
    },
    {
        title: "Under Review",
        value: 45,
        change: "+8.5%",
        trend: "up",
        icon: Hourglass,
        iconBg: "bg-amber-100 text-amber-600",
    },
    {
        title: "Revision Required",
        value: 16,
        change: "-6.7%",
        trend: "down",
        icon: RefreshCcw,
        iconBg: "bg-purple-100 text-purple-600",
    },
    {
        title: "Accepted",
        value: 38,
        change: "+15.2%",
        trend: "up",
        icon: CheckCircle,
        iconBg: "bg-green-100 text-green-600",
    },
    {
        title: "Rejected",
        value: 29,
        change: "-5.1%",
        trend: "down",
        icon: XCircle,
        iconBg: "bg-red-100 text-red-600",
    },
];

const SubmissionsStatCard = () => {
    return (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            {stats.map((stat) => (
                <Card key={stat.title} className="transition py-0">
                    <CardContent className="p-5 flex flex-col gap-4">
                        {/* Top */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div
                                    className={cn(
                                        "w-10 h-10 flex items-center justify-center rounded-full",
                                        stat.iconBg,
                                    )}
                                >
                                    <stat.icon className="w-5 h-5" />
                                </div>
                                <span className="text-sm text-muted-foreground">{stat.title}</span>
                            </div>
                        </div>

                        {/* Value */}
                        <div className="text-3xl font-semibold tracking-tight">{stat.value}</div>

                        {/* Bottom */}
                        <div className="flex items-center justify-between text-xs">
                            <span className="text-muted-foreground"></span>

                            <span
                                className={cn(
                                    "px-2 py-1 rounded-md font-medium",
                                    stat.trend === "up" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600",
                                )}
                            >
                                {stat.change}
                            </span>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
};

export default SubmissionsStatCard;
