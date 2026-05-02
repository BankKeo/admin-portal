import { Button } from "@/components/ui/button";
import { CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Calendar, Search } from "lucide-react";

const SubmissionsActionBar = () => {
    return (
        <div>
            <CardHeader className="flex flex-wrap items-center justify-end gap-3">
                {/* 🔍 Search */}
                <div className="relative w-[320px]">
                    <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                    <Input
                        placeholder="Search all submissions..."
                        className="pl-9"
                    />
                </div>

                {/* 📊 Status */}
                <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">
                        Status
                    </span>

                    <Select defaultValue="all">
                        <SelectTrigger className="w-45">
                            <SelectValue placeholder="All Statuses" />
                        </SelectTrigger>

                        <SelectContent>
                            <SelectItem value="all">All Statuses</SelectItem>
                            <SelectItem value="review">Under Review</SelectItem>
                            <SelectItem value="revision">
                                Revision Required
                            </SelectItem>
                            <SelectItem value="accepted">Accepted</SelectItem>
                            <SelectItem value="rejected">Rejected</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">Date</span>

                    <Button
                        variant="outline"
                        className="w-65 justify-between text-muted-foreground"
                    >
                        <span>May 24, 2025 — May 24, 2025</span>
                        <Calendar className="w-4 h-4 ml-2" />
                    </Button>
                </div>
            </CardHeader>
        </div>
    );
};

export default SubmissionsActionBar;
