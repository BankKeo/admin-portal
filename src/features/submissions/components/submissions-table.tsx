import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { submissions } from "@/lib/data";
import { getStatusBadge } from "@/lib/utils";
import { Calendar, Eye, MoreHorizontal, Search } from "lucide-react";

const SubmissionsTable = () => {
    return (
        <Card className="lg:col-span-2 rounded-xl border bg-white transition">
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
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>ID</TableHead>
                            <TableHead>Title</TableHead>
                            <TableHead>Author</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Submitted</TableHead>
                            <TableHead className="text-right">
                                Actions
                            </TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {submissions.map((item) => (
                            <TableRow
                                key={item.id}
                                className="hover:bg-muted/50"
                            >
                                <TableCell className="font-medium text-primary">
                                    {item.id}
                                </TableCell>

                                <TableCell className="max-w-75 truncate">
                                    {item.title}
                                </TableCell>

                                <TableCell>{item.author}</TableCell>

                                <TableCell>
                                    <Badge
                                        className={getStatusBadge(item.status)}
                                    >
                                        {item.status}
                                    </Badge>
                                </TableCell>

                                <TableCell className="text-muted-foreground">
                                    {item.date}
                                </TableCell>

                                <TableCell className="text-right">
                                    <div className="flex justify-end gap-2">
                                        <Button variant="outline" size="icon">
                                            <Eye className="w-4 h-4" />
                                        </Button>
                                        <Button variant="outline" size="icon">
                                            <MoreHorizontal className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
};

export default SubmissionsTable;
