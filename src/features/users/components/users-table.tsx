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
import { users } from "@/lib/data";
import {
    CheckCircle,
    Filter,
    MoreVertical,
    Search,
    XCircle,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const UsersTable = () => {
    return (
        <Card className="lg:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-base font-semibold">Users</CardTitle>

                <div className="flex items-center gap-2">
                    {/* Search */}
                    <div className="relative">
                        <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                        <Input
                            placeholder="Search user..."
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
                            <TableHead>Email</TableHead>
                            <TableHead>Submission Rights</TableHead>
                            <TableHead>Last Active</TableHead>
                            <TableHead className="w-10" />
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {users.map((user, i) => (
                            <TableRow key={i} className="hover:bg-muted/50">
                                {/* Name */}
                                <TableCell>
                                    <div className="flex items-center gap-3">
                                        <Avatar className="w-9 h-9">
                                            <AvatarImage src={user.avatar} />
                                            <AvatarFallback>
                                                {user.initials}
                                            </AvatarFallback>
                                        </Avatar>

                                        <div>
                                            <p className="text-sm font-medium">
                                                {user.name}
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                                {user.subtitle}
                                            </p>
                                        </div>
                                    </div>
                                </TableCell>

                                <TableCell className="text-sm text-muted-foreground">
                                    {user.email}
                                </TableCell>

                                {/* Submission Rights */}
                                <TableCell>
                                    {user.canSubmit ? (
                                        <CheckCircle className="w-5 h-5 text-green-600" />
                                    ) : (
                                        <XCircle className="w-5 h-5 text-muted-foreground" />
                                    )}
                                </TableCell>

                                {/* Last Active */}
                                <TableCell className="text-sm text-muted-foreground">
                                    {user.lastActive}
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

export default UsersTable;
