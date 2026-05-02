import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
import { Eye, MoreHorizontal } from "lucide-react";

const SubmissionsTable = () => {
    const navigate = useNavigate();

    return (
        <Card className="lg:col-span-2">
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
                                onClick={() =>
                                    navigate({ to: `/submissions/${item.id}` })
                                }
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
