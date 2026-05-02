import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    type ChartConfig,
} from "@/components/ui/chart";
import { Label, Pie, PieChart } from "recharts";
import { FileText } from "lucide-react";

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

const pieChartData = [
    { name: "Awaiting Review", value: 275, fill: "oklch(0.85 0.08 142)" },
    { name: "In Review", value: 200, fill: "oklch(0.7 0.12 142)" },
    { name: "Review Completed", value: 287, fill: "oklch(0.55 0.15 142)" },
    { name: "Awaiting Decision", value: 173, fill: "oklch(0.45 0.15 142)" },
];

const pieChartConfig = {
    awaitingReview: {
        label: "Awaiting Review",
        color: "oklch(0.85 0.08 142)",
    },
    inReview: {
        label: "In Review",
        color: "oklch(0.7 0.12 142)",
    },
    reviewCompleted: {
        label: "Review Completed",
        color: "oklch(0.55 0.15 142)",
    },
    awaitingDecision: {
        label: "Awaiting Decision",
        color: "oklch(0.45 0.15 142)",
    },
} satisfies ChartConfig;

const HomeCharts = () => {
    const totalVisitors = useMemo(() => {
        return pieChartData.reduce((acc, curr) => acc + curr.value, 0);
    }, []);

    return (
        <div className="grid gap-4 lg:grid-cols-3">
            {/* LINE CHART */}
            <Card className="lg:col-span-2">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-base font-semibold">
                        <div className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-100 text-blue-600">
                            <FileText className="w-4 h-4" />
                        </div>
                        Submissions Overview
                    </CardTitle>
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
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-base font-semibold">
                        <div className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-100 text-blue-600">
                            <FileText className="w-4 h-4" />
                        </div>
                        Review Overview
                    </CardTitle>
                </CardHeader>

                <CardContent className="flex flex-col items-center gap-4">
                    <ChartContainer
                        config={pieChartConfig}
                        className="mx-auto aspect-square h-75"
                    >
                        <PieChart>
                            <ChartTooltip
                                cursor={false}
                                content={<ChartTooltipContent hideLabel />}
                            />
                            <Pie
                                data={pieChartData}
                                dataKey="value"
                                nameKey="name"
                                innerRadius={60}
                                strokeWidth={5}
                            >
                                <Label
                                    content={({ viewBox }) => {
                                        if (
                                            viewBox &&
                                            "cx" in viewBox &&
                                            "cy" in viewBox
                                        ) {
                                            return (
                                                <text
                                                    x={viewBox.cx}
                                                    y={viewBox.cy}
                                                    textAnchor="middle"
                                                    dominantBaseline="middle"
                                                >
                                                    <tspan
                                                        x={viewBox.cx}
                                                        y={viewBox.cy}
                                                        className="fill-foreground text-3xl font-bold"
                                                    >
                                                        {totalVisitors.toLocaleString()}
                                                    </tspan>
                                                    <tspan
                                                        x={viewBox.cx}
                                                        y={
                                                            (viewBox.cy || 0) +
                                                            24
                                                        }
                                                        className="fill-muted-foreground"
                                                    >
                                                        Under Review
                                                    </tspan>
                                                </text>
                                            );
                                        }
                                    }}
                                />
                            </Pie>
                        </PieChart>
                    </ChartContainer>
                </CardContent>
            </Card>
        </div>
    );
};

export default HomeCharts;
