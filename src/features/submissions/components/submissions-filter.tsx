import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Filter } from "lucide-react";
import { useState } from "react";

const SubmissionsFilter = () => {
    const [open, setOpen] = useState(false);
    const [filters, setFilters] = useState({
        status: "all",
        date: "",
    });

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button variant="outline" className="gap-2">
                    <Filter className="w-4 h-4" />
                    Filter
                </Button>
            </PopoverTrigger>

            <PopoverContent align="end" className="w-75 space-y-4 gap-0 p-4">
                {/* Status */}
                <div className="space-y-1">
                    <Label className="text-xs text-muted-foreground uppercase">
                        Status
                    </Label>

                    <Select
                        value={filters.status}
                        onValueChange={(value) =>
                            setFilters((prev) => ({ ...prev, status: value }))
                        }
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="All Status" />
                        </SelectTrigger>

                        <SelectContent>
                            <SelectItem value="all">All Status</SelectItem>
                            <SelectItem value="under-review">
                                Under Review
                            </SelectItem>
                            <SelectItem value="revision">
                                Revision Required
                            </SelectItem>
                            <SelectItem value="accepted">Accepted</SelectItem>
                            <SelectItem value="rejected">Rejected</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* Date */}
                <div className="space-y-1">
                    <Label className="text-xs text-muted-foreground uppercase">
                        Date
                    </Label>
                    <Input
                        type="date"
                        value={filters.date}
                        onChange={(e) =>
                            setFilters((prev) => ({
                                ...prev,
                                date: e.target.value,
                            }))
                        }
                    />
                </div>

                {/* Actions */}
                <div className="flex justify-between pt-2">
                    <Button
                        className="px-4"
                        variant="outline"
                        onClick={() => setFilters({ status: "all", date: "" })}
                    >
                        Reset
                    </Button>

                    <Button
                        className="px-4"
                        onClick={() => {
                            console.log("Apply filters:", filters);
                            // 🔥 connect this to your table filtering / API
                            setOpen(false); // ✅ CLOSE POPOVER
                        }}
                    >
                        Apply
                    </Button>
                </div>
            </PopoverContent>
        </Popover>
    );
};

export default SubmissionsFilter;
