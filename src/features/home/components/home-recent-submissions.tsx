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

import { Eye, FileText, Filter, MoreHorizontal, Search } from "lucide-react";

const submissions = [
    {
        id: "JESAM-2025-128",
        title: "AI-Powered Learning Analytics in Higher Education",
        author: "John Doe",
        status: "Under Review",
        similarity: 12,
        date: "May 24, 2025",
    },
    {
        id: "JESAM-2025-127",
        title: "Green Supply Chain Management Practices",
        author: "Maria Santos",
        status: "Revision Required",
        similarity: 18,
        date: "May 23, 2025",
    },
    {
        id: "JESAM-2025-126",
        title: "Blockchain Technology in Financial Services",
        author: "Michael Lee",
        status: "Accepted",
        similarity: 9,
        date: "May 21, 2025",
    },
    {
        id: "JESAM-2025-125",
        title: "The Impact of Social Media on Student Performance",
        author: "Sarah Johnson",
        status: "Rejected",
        similarity: 32,
        date: "May 20, 2025",
    },
    {
        id: "JESAM-2025-124",
        title: "Sustainable Urban Development Strategies",
        author: "David Brown",
        status: "Under Review",
        similarity: 14,
        date: "May 19, 2025",
    },
];

function getStatusBadge(status: string) {
    switch (status) {
        case "Under Review":
            return "bg-amber-100 text-amber-600";
        case "Revision Required":
            return "bg-purple-100 text-purple-600";
        case "Accepted":
            return "bg-green-100 text-green-600";
        case "Rejected":
            return "bg-red-100 text-red-600";
        default:
            return "bg-muted text-muted-foreground";
    }
}

function getSimilarityBadge(value: number) {
    if (value < 15) return "bg-green-100 text-green-600";
    if (value < 25) return "bg-amber-100 text-amber-600";
    return "bg-red-100 text-red-600";
}

const HomeRecentSubmissions = () => {
    return (
        <Card className="lg:col-span-2 rounded-xl border bg-white transition">
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
                        <Search className="absolute left-2 top-2 w-4 h-4 text-muted-foreground" />
                        <Input
                            placeholder="Search submissions..."
                            className="pl-8 w-55"
                        />
                    </div>

                    {/* Filter */}
                    <Button variant="outline" size="sm" className="gap-2">
                        <Filter className="w-4 h-4" />
                        Filter
                    </Button>

                    {/* Status */}
                    <Button variant="outline" size="sm">
                        All Status
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
                            <TableHead>Similarity</TableHead>
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

                                <TableCell>
                                    <Badge
                                        className={getSimilarityBadge(
                                            item.similarity,
                                        )}
                                    >
                                        {item.similarity}%
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
