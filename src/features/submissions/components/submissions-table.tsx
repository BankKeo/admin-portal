import Pagination from "@/components/pagination";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { submissions } from "@/lib/data";
import { getStatusBadge } from "@/lib/utils";
import { useNavigate } from "@tanstack/react-router";
import { Search } from "lucide-react";
import SubmissionsFilter from "./submissions-filter";

const SubmissionTable = () => {
    const navigate = useNavigate();

    const handleNavigateToSubmission = (id: string) => {
        navigate({ to: `/articles/${id}` });
    };

    return (
        <Card className="lg:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-base font-semibold">Articles</CardTitle>

                <div className="flex items-center gap-2">
                    {/* Search */}
                    <div className="relative">
                        <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                        <Input placeholder="Search submissions..." className="pl-8 w-72" />
                    </div>

                    {/* Filter */}
                    <SubmissionsFilter />
                </div>
            </CardHeader>

            <CardContent>
                <Table>
                    <TableHeader className="bg-muted/60 h-12">
                        <TableRow>
                            <TableHead>ID</TableHead>
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
                                onClick={() => handleNavigateToSubmission(item.id)}
                            >
                                <TableCell className="font-medium text-primary">{item.id}</TableCell>

                                <TableCell className="max-w-75 truncate">{item.title}</TableCell>

                                <TableCell>{item.author}</TableCell>

                                <TableCell>
                                    <Badge className={getStatusBadge(item.status)}>{item.status}</Badge>
                                </TableCell>

                                <TableCell className="text-muted-foreground">{item.date}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

                <Pagination />
            </CardContent>
        </Card>
    );
};

export default SubmissionTable;
