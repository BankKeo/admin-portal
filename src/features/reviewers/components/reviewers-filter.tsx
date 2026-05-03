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
import { Slider } from "@/components/ui/slider";
import { Filter } from "lucide-react";
import { useState } from "react";

const ReviewersFilter = () => {
    const [open, setOpen] = useState(false);

    const [filters, setFilters] = useState({
        search: "",
        status: "all",
        expertise: "",
        rating: [0],
        active: [0],
    });

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button variant="outline" className="gap-2">
                    <Filter className="w-4 h-4" />
                    Filter
                </Button>
            </PopoverTrigger>

            <PopoverContent
                align="end"
                className="w-75 space-y-4 gap-0 p-4 max-h-80 overflow-y-auto"
            >
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
                            <SelectValue placeholder="All" />
                        </SelectTrigger>

                        <SelectContent>
                            <SelectItem value="all">All</SelectItem>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="on-leave">On Leave</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* Expertise */}
                <div className="space-y-1">
                    <Label className="text-xs text-muted-foreground uppercase">
                        Expertise
                    </Label>
                    <Input
                        placeholder="e.g. NLP, AI Ethics"
                        value={filters.expertise}
                        onChange={(e) =>
                            setFilters((prev) => ({
                                ...prev,
                                expertise: e.target.value,
                            }))
                        }
                    />
                </div>

                {/* Rating */}
                <div className="space-y-2">
                    <Label className="text-xs text-muted-foreground uppercase">
                        Minimum Rating
                    </Label>

                    <div className="flex items-center gap-3">
                        <Slider
                            value={filters.rating}
                            onValueChange={(value) =>
                                setFilters((prev) => ({
                                    ...prev,
                                    rating: value,
                                }))
                            }
                            max={5}
                            step={1}
                            className="flex-1"
                        />
                        <span className="text-sm w-5">{filters.rating[0]}</span>
                    </div>
                </div>

                {/* Active Assignments */}
                <div className="space-y-2">
                    <Label className="text-xs text-muted-foreground uppercase">
                        Active Assignments
                    </Label>

                    <div className="flex items-center gap-3">
                        <Slider
                            value={filters.active}
                            onValueChange={(value) =>
                                setFilters((prev) => ({
                                    ...prev,
                                    active: value,
                                }))
                            }
                            max={10}
                            step={1}
                            className="flex-1"
                        />
                        <span className="text-sm w-5">{filters.active[0]}</span>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex justify-between pt-2">
                    <Button
                        variant="ghost"
                        onClick={() => {
                            setFilters({
                                search: "",
                                status: "all",
                                expertise: "",
                                rating: [0],
                                active: [0],
                            });
                            setOpen(false);
                        }}
                    >
                        Reset
                    </Button>

                    <Button
                        onClick={() => {
                            console.log("Reviewer filters:", filters);

                            // 🔥 hook to your API or table filtering

                            setOpen(false); // ✅ close popover
                        }}
                    >
                        Apply
                    </Button>
                </div>
            </PopoverContent>
        </Popover>
    );
};

export default ReviewersFilter;
