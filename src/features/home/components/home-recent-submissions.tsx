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
import { submissions } from "@/lib/data";
import { getStatusBadge } from "@/lib/utils";
import { Eye, FileText, Filter, MoreHorizontal, Search } from "lucide-react";

const HomeRecentSubmissions = () => {
    return (
        <Card className="lg:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-base font-semibold">
                    <div className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-100 text-blue-600">
                        <FileText className="w-4 h-4" />
                    </div>
                    Recent Submissions
                </CardTitle>

                <div className="flex items-center gap-2">
                    {/* Search */}
                    <div className="relative">
                        <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                        <Input
                            placeholder="Search submissions..."
                            className="pl-8 w-55"
                        />
                    </div>

                    {/* Filter */}
                    <Button variant="outline" className="gap-2">
                        <Filter className="w-4 h-4" />
                        Filter
                    </Button>

                    {/* Status */}
                    <Button variant="outline">All Status</Button>
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
                                        <Button variant="ghost" size="icon">
                                            <Eye className="w-4 h-4" />
                                        </Button>
                                        <Button variant="ghost" size="icon">
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

export default HomeRecentSubmissions;
