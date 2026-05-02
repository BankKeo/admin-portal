import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { reviewers } from "@/lib/data";
import { Filter, MoreVertical, Search, Star } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

function StatusBadge({ status }: { status: string }) {
    if (status === "Active") {
        return <Badge className="bg-green-100 text-green-600">● ACTIVE</Badge>;
    }
    return <Badge className="bg-amber-100 text-amber-600">● ON LEAVE</Badge>;
}

function Stars({ value }: { value: number }) {
    return (
        <div className="flex gap-1 text-amber-400">
            {Array.from({ length: 5 }).map((_, i) => (
                <Star
                    key={i}
                    className={`w-4 h-4 ${
                        i < value ? "fill-amber-400" : "opacity-30"
                    }`}
                />
            ))}
        </div>
    );
}

const ReviewersTable = () => {
    return (
        <Card className="lg:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-base font-semibold">
                    Reviewers
                </CardTitle>

                <div className="flex items-center gap-2">
                    {/* Search */}
                    <div className="relative">
                        <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                        <Input
                            placeholder="Search submissions..."
                            className="pl-8 w-72"
                        />
                    </div>

                    {/* Filter */}
                    <Button variant="outline" className="gap-2">
                        <Filter className="w-4 h-4" />
                        Filter
                    </Button>
                </div>
            </CardHeader>

            <CardContent>
                <Table>
                    <TableHeader className="bg-muted/60 h-12">
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Institutional Affiliation</TableHead>
                            <TableHead>Expertise</TableHead>
                            <TableHead>Active</TableHead>
                            <TableHead>Rating</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="w-10" />
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {reviewers.map((r, i) => (
                            <TableRow key={i} className="hover:bg-muted/50">
                                {/* Name */}
                                <TableCell>
                                    <div className="flex items-center gap-3">
                                        <Avatar className="w-9 h-9">
                                            <AvatarFallback>
                                                {r.initials}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <p className="font-medium text-sm">
                                                {r.name}
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                                {r.email}
                                            </p>
                                        </div>
                                    </div>
                                </TableCell>

                                <TableCell>
                                    <div className="text-sm">
                                        <p>{r.affiliation}</p>
                                        <p className="text-xs text-muted-foreground">
                                            {r.location}
                                        </p>
                                    </div>
                                </TableCell>

                                <TableCell>
                                    <div className="flex flex-wrap gap-2">
                                        {r.expertise.map((tag) => (
                                            <Badge
                                                key={tag}
                                                variant="secondary"
                                                className="text-xs"
                                            >
                                                {tag}
                                            </Badge>
                                        ))}
                                    </div>
                                </TableCell>

                                <TableCell className="text-sm font-medium">
                                    {r.active}
                                </TableCell>

                                <TableCell>
                                    <Stars value={r.rating} />
                                </TableCell>

                                <TableCell>
                                    <StatusBadge status={r.status} />
                                </TableCell>

                                <TableCell className="text-right">
                                    <MoreVertical className="w-4 h-4 text-muted-foreground cursor-pointer" />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

                {/* Pagination */}
                <div className="flex items-center justify-between p-4 text-sm text-muted-foreground w-full bg-muted/60">
                    <span>Previous</span>

                    <div className="flex items-center gap-2">
                        <Button size="sm" variant="default">
                            1
                        </Button>
                        <Button size="sm" variant="ghost">
                            2
                        </Button>
                        <Button size="sm" variant="ghost">
                            3
                        </Button>
                        <span>...</span>
                        <Button size="sm" variant="ghost">
                            128
                        </Button>
                    </div>

                    <span>Next</span>
                </div>
            </CardContent>
        </Card>
    );
};

export default ReviewersTable;
