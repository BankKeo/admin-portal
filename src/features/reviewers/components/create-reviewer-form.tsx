import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { BookOpen, Landmark, User, X } from "lucide-react";
import { useState } from "react";

const CreateReviewerForm = () => {
    const [interests, setInterests] = useState([
        "Climate Modeling",
        "Renewable Energy",
        "Ecosystem Services",
    ]);

    const [input, setInput] = useState("");
    const [hours, setHours] = useState([5]);

    const addInterest = (value: string) => {
        if (!value.trim()) return;
        setInterests([...interests, value.trim()]);
        setInput("");
    };

    const removeInterest = (item: string) => {
        setInterests(interests.filter((i) => i !== item));
    };

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
                            <Input placeholder="Dr. Julian Sterling" />
                        </div>

                        {/* Academic Title */}
                        <div className="space-y-2">
                            <Label className="text-xs text-muted-foreground uppercase">
                                Academic Title
                            </Label>

                            <Select defaultValue="professor">
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select title" />
                                </SelectTrigger>

                                <SelectContent>
                                    <SelectItem value="professor">
                                        Professor
                                    </SelectItem>
                                    <SelectItem value="associate">
                                        Associate Professor
                                    </SelectItem>
                                    <SelectItem value="assistant">
                                        Assistant Professor
                                    </SelectItem>
                                    <SelectItem value="doctor">
                                        Doctor
                                    </SelectItem>
                                </SelectContent>
                            </Select>
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
                    <Landmark className="w-4 h-4 text-muted-foreground" />
                    <CardTitle className="text-base font-semibold">
                        Academic Affiliation
                    </CardTitle>
                </CardHeader>

                <CardContent className="space-y-6">
                    {/* Row 1 */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Full Name */}
                        <div className="space-y-2">
                            <Label className="text-xs text-muted-foreground uppercase">
                                INSTITUTIONAL AFFILIATION
                            </Label>
                            <Input placeholder="Oxford University" />
                        </div>

                        {/* Academic Title */}
                        <div className="space-y-2">
                            <Label className="text-xs text-muted-foreground uppercase">
                                DEPARTMENT
                            </Label>

                            <Select defaultValue="professor">
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select department" />
                                </SelectTrigger>

                                <SelectContent>
                                    <SelectItem value="professor">
                                        Professor
                                    </SelectItem>
                                    <SelectItem value="associate">
                                        Associate Professor
                                    </SelectItem>
                                    <SelectItem value="assistant">
                                        Assistant Professor
                                    </SelectItem>
                                    <SelectItem value="doctor">
                                        Doctor
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Row 2 */}
                    <div className="space-y-2">
                        <Label className="text-xs text-muted-foreground uppercase">
                            ORCID ID
                        </Label>
                        <Input placeholder="0000-0002-1825-0097" type="text" />
                    </div>
                </CardContent>
            </Card>

            <Card className="rounded-2xl">
                {/* Header */}
                <CardHeader className="flex flex-row items-center gap-2 pb-2">
                    <BookOpen className="w-4 h-4 text-muted-foreground" />
                    <CardTitle className="text-base font-semibold">
                        Scholarly Scope
                    </CardTitle>
                </CardHeader>

                <CardContent className="space-y-6">
                    {/* Research Interests */}
                    <div className="space-y-2">
                        <p className="text-xs uppercase text-muted-foreground">
                            Research Interests
                        </p>

                        <div className="border rounded-lg p-3 flex flex-wrap gap-2 items-center">
                            {interests.map((item) => (
                                <Badge
                                    key={item}
                                    variant="secondary"
                                    className="flex items-center gap-1"
                                >
                                    {item}
                                    <X
                                        className="w-3 h-3 cursor-pointer"
                                        onClick={() => removeInterest(item)}
                                    />
                                </Badge>
                            ))}

                            <Input
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter" || e.key === ",") {
                                        e.preventDefault();
                                        addInterest(input);
                                    }
                                }}
                                placeholder="Add interest..."
                                className="border-none focus-visible:ring-0 h-7 w-37.5"
                            />
                        </div>

                        <p className="text-xs text-muted-foreground">
                            Press enter or comma to add a research keyword.
                        </p>
                    </div>

                    {/* Availability */}
                    <div className="space-y-3">
                        <p className="text-xs uppercase text-muted-foreground">
                            Review Availability (Weekly Hours)
                        </p>

                        <div className="flex items-center gap-4">
                            <Slider
                                value={hours}
                                onValueChange={setHours}
                                max={20}
                                step={1}
                                className="flex-1"
                            />
                            <span className="text-sm font-medium w-12.5 text-right">
                                {hours[0]} hrs
                            </span>
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

export default CreateReviewerForm;
