import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Landmark, User } from "lucide-react";

const SettingForm = () => {
    return (
        <form className="space-y-4 sm:space-y-6">
            <Card className="rounded-2xl">
                {/* Header */}
                <CardHeader className="flex flex-row items-center gap-2 pb-2">
                    <Landmark className="w-4 h-4 text-muted-foreground" />
                    <CardTitle className="text-base font-semibold">
                        Insititutional Profile
                    </CardTitle>
                </CardHeader>

                <CardContent className="space-y-6">
                    {/* Row 1 */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Full Name */}
                        <div className="space-y-2">
                            <Label className="text-xs text-muted-foreground uppercase">
                                Insititutional Name
                            </Label>
                            <Input placeholder="University of Michigan  " />
                        </div>

                        {/* Institutional ID */}
                        <div className="space-y-2">
                            <Label className="text-xs text-muted-foreground uppercase">
                                Official Website
                            </Label>
                            <Input placeholder="e.g. 123456" />
                        </div>
                    </div>

                    {/* Row 2 */}
                    <div className="space-y-2">
                        <Label className="text-xs text-muted-foreground uppercase">
                            Primary Contact Email
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
                    <User className="w-4 h-4 text-muted-foreground" />
                    <CardTitle className="text-base font-semibold">
                        Insititutional Profile
                    </CardTitle>
                </CardHeader>

                <CardContent className="space-y-6">
                    {/* Row 1 */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Full Name */}
                        <div className="space-y-2">
                            <Label className="text-xs text-muted-foreground uppercase">
                                Timezone
                            </Label>

                            <Select value="utc">
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select timezone" />
                                </SelectTrigger>

                                <SelectContent>
                                    <SelectItem value="utc">UTC</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label className="text-xs text-muted-foreground uppercase">
                                Default Language
                            </Label>

                            <Select value="en">
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select language" />
                                </SelectTrigger>

                                <SelectContent>
                                    <SelectItem value="en">English</SelectItem>
                                    <SelectItem value="es">Spanish</SelectItem>
                                    <SelectItem value="fr">French</SelectItem>
                                </SelectContent>
                            </Select>
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
                    Save
                </Button>
            </div>
        </form>
    );
};

export default SettingForm;
