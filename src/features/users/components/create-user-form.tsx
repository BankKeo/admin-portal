import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ShieldAlert, User } from "lucide-react";

const CreateUserForm = () => {
    return (
        <form className="space-y-4 sm:space-y-6">
            <Card className="rounded-2xl">
                {/* Header */}
                <CardHeader className="flex flex-row items-center gap-2 pb-2">
                    <User className="w-4 h-4 text-muted-foreground" />
                    <CardTitle className="text-base font-semibold">
                        Core Identity
                    </CardTitle>
                </CardHeader>

                <CardContent className="space-y-6">
                    {/* Row 1 */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Full Name */}
                        <div className="space-y-2">
                            <Label className="text-xs text-muted-foreground uppercase">
                                Full Name
                            </Label>
                            <Input placeholder="Julian Sterling" />
                        </div>

                        {/* Institutional ID */}
                        <div className="space-y-2">
                            <Label className="text-xs text-muted-foreground uppercase">
                                Institutional ID
                            </Label>
                            <Input placeholder="e.g. 123456" />
                        </div>
                    </div>

                    {/* Row 2 */}
                    <div className="space-y-2">
                        <Label className="text-xs text-muted-foreground uppercase">
                            Primary Email
                        </Label>
                        <Input
                            placeholder="j.sterling@university.edu"
                            type="email"
                        />
                    </div>
                </CardContent>
            </Card>

            <Card className="rounded-2xl">
                {/* Header */}
                <CardHeader className="flex flex-row items-center gap-2 pb-2">
                    <ShieldAlert className="w-4 h-4 text-muted-foreground" />
                    <CardTitle className="text-base font-semibold">
                        Submission right
                    </CardTitle>
                </CardHeader>

                <CardContent className="space-y-6">
                    <div className="flex items-start gap-3">
                        {/* Checkbox */}
                        <Checkbox id="submission-rights" />

                        {/* Text */}
                        <div className="space-y-1">
                            <Label
                                htmlFor="submission-rights"
                                className="text-sm font-medium"
                            >
                                Enable Submission Rights
                            </Label>

                            <p className="text-sm text-muted-foreground">
                                Allow this user to bypass standard role
                                restrictions to create and submit new
                                manuscripts directly to the repository queue.
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div className="flex items-center justify-end gap-2">
                <Button
                    type="button"
                    size="lg"
                    variant="outline"
                    className="px-4"
                >
                    Cancel
                </Button>
                <Button type="submit" size="lg" className="px-4">
                    Create
                </Button>
            </div>
        </form>
    );
};

export default CreateUserForm;
