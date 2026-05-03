import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Building } from "lucide-react";
import UserStats from "./user-stats";
import UserSubmissionsHistory from "./user-submissions-history";
import UserContact from "./user-contact";

const UserInfo = () => {
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
                                    John Doe
                                </h2>

                                <Badge className="bg-green-100 text-green-600">
                                    ● Active
                                </Badge>
                            </div>

                            {/* Meta */}
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                <div className="flex items-center gap-1">
                                    <Building className="w-4 h-4" />
                                    Stanford University
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div className="grid gap-4 sm:gap-6 lg:grid-cols-3">
                {/* LINE CHART */}
                <div className="lg:col-span-2 space-y-4 sm:space-y-6">
                    <UserStats />
                    <UserSubmissionsHistory />
                </div>

                <div className="space-y-4 sm:space-y-6">
                    <UserContact />
                </div>
            </div>
        </div>
    );
};

export default UserInfo;
