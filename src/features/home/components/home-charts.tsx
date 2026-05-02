import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    type ChartConfig,
} from "@/components/ui/chart";

const chartData = [
    { month: "January", desktop: 186 },
    { month: "February", desktop: 305 },
    { month: "March", desktop: 237 },
    { month: "April", desktop: 73 },
    { month: "May", desktop: 209 },
    { month: "June", desktop: 214 },
    { month: "July", desktop: 186 },
    { month: "August", desktop: 305 },
    { month: "September", desktop: 237 },
    { month: "October", desktop: 73 },
    { month: "November", desktop: 209 },
    { month: "December", desktop: 214 },
];
const chartConfig = {
    desktop: {
        label: "Desktop",
        color: "var(--chart-1)",
    },
} satisfies ChartConfig;

const data = [
    { name: "Awaiting Reviewer", value: 12, color: "hsl(var(--primary))" },
    { name: "In Review", value: 18, color: "hsl(var(--warning, 38 92% 50%))" },
    {
        name: "Review Completed",
        value: 10,
        color: "hsl(var(--secondary, 262 83% 58%))",
    },
    {
        name: "Awaiting Decision",
        value: 5,
        color: "hsl(var(--success, 142 71% 45%))",
    },
];

const HomeCharts = () => {
    return (
        <div className="grid gap-4 lg:grid-cols-3">
            {/* LINE CHART */}
            <Card className="lg:col-span-2 rounded-xl border bg-white transition">
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="text-base font-semibold">
                        Submission Overview
                    </CardTitle>
                    <span className="text-sm text-muted-foreground">
                        This Year
                    </span>
                </CardHeader>
                <CardContent>
                    <ChartContainer
                        config={chartConfig}
                        className="h-75 w-full"
                    >
                        <BarChart
                            accessibilityLayer
                            data={chartData}
                            margin={{
                                top: 20,
                            }}
                        >
                            <CartesianGrid vertical={false} />
                            <XAxis
                                dataKey="month"
                                tickLine={false}
                                tickMargin={10}
                                axisLine={false}
                                tickFormatter={(value) => value.slice(0, 3)}
                            />
                            <ChartTooltip
                                cursor={false}
                                content={<ChartTooltipContent hideLabel />}
                            />
                            <Bar
                                dataKey="desktop"
                                fill="var(--color-primary)"
                                fillOpacity={0.6}
                                radius={8}
                            >
                                <LabelList
                                    position="top"
                                    offset={12}
                                    className="fill-foreground"
                                    fontSize={12}
                                />
                            </Bar>
                        </BarChart>
                    </ChartContainer>
                </CardContent>
            </Card>

            {/* PIE CHART */}
            <Card className="rounded-xl border bg-white transition">
                <CardHeader>
                    <CardTitle className="text-base font-semibold">
                        Review Overview
                    </CardTitle>
                </CardHeader>

                <CardContent className="flex flex-col items-center gap-4"></CardContent>
            </Card>
        </div>
    );
};

export default HomeCharts;
