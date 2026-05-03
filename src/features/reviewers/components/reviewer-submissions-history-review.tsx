import Pagination from "@/components/pagination";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { useNavigate } from "@tanstack/react-router";
import { FileText } from "lucide-react";

const ReviewerSubmissionsHistoryReview = () => {
    const navigate = useNavigate();

    const handleNavigateToSubmission = (id: string) => {
        navigate({ to: `/submissions/${id}` });
    };

    return (
        <Card className="lg:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-base font-semibold">
                    <div className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-100 text-blue-600">
                        <FileText className="w-4 h-4" />
                    </div>
                    Recent Submissions
                </CardTitle>
            </CardHeader>

            <CardContent>
                <Table>
                    <TableHeader className="bg-muted/60 h-12">
                        <TableRow>
                            <TableHead>Title</TableHead>
                            <TableHead>Author</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Submitted</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {submissions.map((item) => (
                            <TableRow
                                key={item.id}
                                className="hover:bg-muted/50 cursor-pointer h-12"
                                onClick={() =>
                                    handleNavigateToSubmission(item.id)
                                }
                            >
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
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

                <Pagination />
            </CardContent>
        </Card>
    );
};

export default ReviewerSubmissionsHistoryReview;
