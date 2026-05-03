import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star } from "lucide-react";

const ReviewerPerformanceMatric = () => {
    const rating = 4.8;
    const total = 38;

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base font-semibold">
                    Performance Matrics
                </CardTitle>
            </CardHeader>

            <CardContent>
                <div className="space-y-3">
                    {/* Top Row */}
                    <div className="flex items-center justify-between">
                        {/* Rating */}
                        <div className="flex items-center gap-3">
                            <span className="text-2xl font-semibold">
                                {rating}
                            </span>

                            {/* Stars */}
                            <div className="flex gap-1 text-amber-400">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <Star
                                        key={i}
                                        className={`w-4 h-4 ${
                                            i < Math.round(rating)
                                                ? "fill-amber-400"
                                                : "opacity-30"
                                        }`}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Label */}
                        <p className="text-sm text-muted-foreground">
                            Editor Rating
                        </p>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                        <div
                            className="h-full bg-primary rounded-full transition-all"
                            style={{ width: `${(rating / 5) * 100}%` }}
                        />
                    </div>

                    {/* Footer */}
                    <p className="text-xs text-muted-foreground">
                        Based on {total} evaluations
                    </p>
                </div>
            </CardContent>
        </Card>
    );
};

export default ReviewerPerformanceMatric;
