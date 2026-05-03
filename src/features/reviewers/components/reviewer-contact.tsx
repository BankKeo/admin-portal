import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link2, Mail } from "lucide-react";

const ReviewerContact = () => {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base font-semibold">
                    Contact details
                </CardTitle>
            </CardHeader>

            <CardContent>
                <div className="space-y-4">
                    {/* Email */}
                    <div className="flex items-start gap-3">
                        <div className="mt-1 text-muted-foreground">
                            <Mail className="w-4 h-4" />
                        </div>

                        <div>
                            <p className="text-xs text-muted-foreground uppercase tracking-wide">
                                Primary Email
                            </p>
                            <p className="text-sm font-medium text-foreground">
                                ehayes@stanford.edu
                            </p>
                        </div>
                    </div>

                    {/* ORCID */}
                    <div className="flex items-start gap-3">
                        <div className="mt-1 text-muted-foreground">
                            <Link2 className="w-4 h-4" />
                        </div>

                        <div>
                            <p className="text-xs text-muted-foreground uppercase tracking-wide">
                                ORCID iD
                            </p>
                            <p className="text-sm font-medium text-foreground">
                                0000-0002-1825-0097
                            </p>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default ReviewerContact;
