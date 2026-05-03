import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { MapPin, Building } from "lucide-react";
import ReviewerStats from "./reviewer-stats";
import ReviewerContact from "./reviewer-contact";
import ReviewerPerformanceMatric from "./reviewer-performance-matric";
import ReviewerExpertise from "./reviewer-expertise";
import ReviewerSubmissionsHistoryReview from "./reviewer-submissions-history-review";

const ReviewerInfo = () => {
    return (
        <div className="space-y-4 sm:space-y-6">
            <Card className="rounded-2xl">
                <CardContent className="p-5 flex items-center justify-between gap-4">
                    {/* LEFT */}
                    <div className="flex items-center gap-4">
                        {/* Avatar */}
                        <Avatar className="w-20 h-20 rounded-xl">
                            <AvatarImage src="/reviewer.jpg" />
                            <AvatarFallback>EH</AvatarFallback>
                        </Avatar>

                        {/* Info */}
                        <div className="space-y-2">
                            {/* Name + Status */}
                            <div className="flex items-center gap-3">
                                <h2 className="text-lg font-semibold">
                                    Dr. Evelyn Hayes
                                </h2>

                                <Badge className="bg-green-100 text-green-600">
                                    ● Active
                                </Badge>
                            </div>

                            {/* Title */}
                            <p className="text-sm text-muted-foreground">
                                Associate Professor of Computer Science
                            </p>

                            {/* Meta */}
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                <div className="flex items-center gap-1">
                                    <Building className="w-4 h-4" />
                                    Stanford University
                                </div>

                                <div className="flex items-center gap-1">
                                    <MapPin className="w-4 h-4" />
                                    Stanford, CA
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div className="grid gap-4 sm:gap-6 lg:grid-cols-3">
                {/* LINE CHART */}
                <div className="lg:col-span-2 space-y-4 sm:space-y-6">
                    <ReviewerStats />
                    <ReviewerExpertise />
                    <ReviewerSubmissionsHistoryReview />
                </div>

                <div className="space-y-4 sm:space-y-6">
                    <ReviewerContact />
                    <ReviewerPerformanceMatric />
                </div>
            </div>
        </div>
    );
};

export default ReviewerInfo;
