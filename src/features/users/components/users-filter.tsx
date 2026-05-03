import { Button } from "@/components/ui/button";
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

const UsersFilter = () => {
    const [open, setOpen] = useState(false);

    const [filters, setFilters] = useState({
        status: "all",
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
                        Submission Right
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
                            <SelectItem value="on-leave">Inactive</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* Actions */}
                <div className="flex justify-between pt-2">
                    <Button
                        variant="ghost"
                        onClick={() => {
                            setFilters({
                                status: "all",
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

export default UsersFilter;
