import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Check, Download, FileText, RefreshCcw, User, X } from "lucide-react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const reviewers = [
    {
        name: "Dr. Editor Admin",
        specialization: "Specialization",
        stage: "Invited",
        recommendation: "Awaiting Decision",
    },
];

function getStageStyle(stage: string) {
    switch (stage) {
        case "Invited":
            return "bg-blue-100 text-blue-600";
        case "Accepted":
            return "bg-green-100 text-green-600";
        case "Review Complete":
            return "bg-green-100 text-green-600";
        case "Rejected":
            return "bg-red-100 text-red-600";
        case "Awaiting Decision":
            return "bg-amber-100 text-amber-600";
        default:
            return "bg-muted text-muted-foreground";
    }
}

const feedbacks = [
    {
        reviewer: "Dr. Editor Admin",
        date: "Nov 01, 2023",
        recommendation: "Major Revisions",
        content: [
            "The manuscript provides a solid theoretical foundation and the comparative analysis is sound. However, the experimental section lacks rigor in its validation methodologies. Specifically:",
            [
                "Section 4.2: The choice of the specific unitary ansatz is not sufficiently justified. Please provide an ablation study or theoretical argument.",
                "Figure 3 requires larger axis labels and a clearer legend for print readability.",
            ],
        ],
    },
    {
        reviewer: "Dr. Editor Staff",
        date: "Oct 28, 2023",
        recommendation: "Minor Revisions",
        content: [
            "This is a timely and well-written paper that addresses a crucial bottleneck in NISQ-era quantum computing.",
        ],
    },
];

function getRecommendationStyle(rec: string) {
    switch (rec) {
        case "Major Revisions":
            return "text-amber-600";
        case "Minor Revisions":
            return "text-blue-600";
        default:
            return "text-muted-foreground";
    }
}

const SubmissionDetails = () => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* LEFT COLUMN */}
            <div className="lg:col-span-2  space-y-4">
                <Card>
                    <CardContent className="space-y-4">
                        {/* Title */}
                        <h2 className="text-xl font-semibold leading-snug">
                            AI-Powered Learning Analytics in Higher Education: A
                            Comprehensive Review
                        </h2>

                        {/* Meta */}
                        <div className="flex items-center gap-8">
                            {/* Author */}
                            <div className="flex items-center gap-3">
                                <div>
                                    <p className="text-xs text-muted-foreground">
                                        Main author
                                    </p>
                                    <div className="flex items-center gap-2 mt-1">
                                        <Avatar className="w-7 h-7">
                                            <AvatarImage src="/avatar.jpg" />
                                            <AvatarFallback>JD</AvatarFallback>
                                        </Avatar>
                                        <span className="text-sm font-medium">
                                            John Doe
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Status */}
                            <div>
                                <p className="text-xs text-muted-foreground">
                                    Status
                                </p>
                                <Badge className="mt-1 bg-amber-100 text-amber-700 hover:bg-amber-100">
                                    Under Review
                                </Badge>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Abstract */}
                <Card>
                    <CardHeader className="flex flex-row justify-between items-center">
                        <CardTitle className="text-base">Abstract</CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm text-muted-foreground leading-relaxed space-y-3">
                        <p>
                            Lorem ipsum dolor, sit amet consectetur adipisicing
                            elit. Consectetur praesentium et dignissimos quam
                            fugiat, repudiandae temporibus accusamus reiciendis
                            veritatis doloribus repellendus minus sunt magnam
                            voluptates. Aliquam quaerat eveniet numquam
                            consectetur!
                        </p>
                        <p>Duis aute irure dolor in reprehenderit...</p>
                        <p className="text-xs">
                            <span className="font-medium text-foreground">
                                Keywords:
                            </span>{" "}
                            Learning Analytics, Education analytics
                        </p>
                    </CardContent>
                </Card>

                {/* Files */}
                <Card>
                    <CardHeader className="flex flex-row justify-between items-center">
                        <CardTitle className="text-base">Files</CardTitle>
                    </CardHeader>

                    <CardContent className="flex items-center gap-2 flex-wrap">
                        {[
                            { name: "Manuscript.pdf", size: "20.6 MB" },
                            { name: "Figures.zip", size: "33.3 MB" },
                            { name: "CoverLetter.docx", size: "53.2 MB" },
                        ].map((file) => (
                            <div
                                key={file.name}
                                className="flex items-center justify-between border rounded-lg p-3 gap-2"
                            >
                                <div className="flex items-center gap-3">
                                    <FileText className="w-5 h-5 text-muted-foreground" />
                                    <div>
                                        <p className="text-sm font-medium">
                                            {file.name}
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            {file.size}
                                        </p>
                                    </div>
                                </div>
                                <Download className="w-4 h-4 text-muted-foreground cursor-pointer" />
                            </div>
                        ))}
                    </CardContent>
                </Card>

                {/* Editorial Decision */}
                <Card>
                    <CardHeader className="flex flex-row items-center">
                        <CardTitle className="text-base font-semibold">
                            Editorial Decision
                        </CardTitle>
                    </CardHeader>

                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                                Internal Comments (Required for Rejection)
                            </Label>

                            <Textarea
                                placeholder="Add notes for the editorial team..."
                                className="min-h-35 resize-none bg-muted/30"
                            />
                        </div>

                        <div className="grid grid-cols-1 xl:grid-cols-3 gap-3">
                            {/* Request Revisions */}
                            <Button className="bg-purple-600 hover:bg-purple-700 text-white gap-1">
                                <RefreshCcw className="w-4 h-4" />
                                Revisions
                            </Button>

                            {/* Accept */}
                            <Button className="bg-green-600 hover:bg-green-700 text-white gap-1">
                                <Check className="w-4 h-4" />
                                Accept
                            </Button>

                            {/* Reject */}
                            <Button className="bg-red-600 hover:bg-red-700 text-white gap-1">
                                <X className="w-4 h-4" />
                                Reject
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row justify-between items-center">
                        <CardTitle className="text-base">
                            Reviewer Feedback
                        </CardTitle>
                        <Badge variant="secondary">Round 1</Badge>
                    </CardHeader>

                    <CardContent className="flex flex-col gap-4">
                        {feedbacks.map((fb, i) => (
                            <div
                                key={i}
                                className="flex flex-col border rounded-lg p-3 gap-2"
                            >
                                <div className="flex flex-row items-center justify-between pb-2">
                                    <div className="flex items-center gap-2 text-sm font-medium">
                                        <User className="w-4 h-4" />
                                        {fb.reviewer}
                                    </div>
                                    <span className="text-xs text-muted-foreground">
                                        {fb.date}
                                    </span>
                                </div>

                                <div className="text-sm text-muted-foreground space-y-3 leading-relaxed">
                                    {/* Paragraph */}
                                    <p>{fb.content[0]}</p>

                                    {/* Bullet list if exists */}
                                    {Array.isArray(fb.content[1]) && (
                                        <ul className="list-disc pl-5 space-y-1">
                                            {fb.content[1].map((item, idx) => (
                                                <li key={idx}>{item}</li>
                                            ))}
                                        </ul>
                                    )}

                                    {/* Recommendation */}
                                    <p>
                                        <span className="font-medium text-foreground">
                                            Recommendation:
                                        </span>{" "}
                                        <span
                                            className={getRecommendationStyle(
                                                fb.recommendation,
                                            )}
                                        >
                                            {fb.recommendation}
                                        </span>
                                    </p>
                                </div>

                                {i % 2 === 0 && <hr className="mt-4" />}
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>

            {/* RIGHT COLUMN */}
            <div className="space-y-4">
                <Card>
                    <CardHeader className="flex flex-row justify-between items-center">
                        <CardTitle className="text-base">
                            Article Metadata
                        </CardTitle>
                    </CardHeader>

                    <CardContent className="space-y-3">
                        <div>
                            <p className="text-xs text-muted-foreground">
                                Subject Area
                            </p>
                            <p className="text-sm font-medium mt-1">
                                Quantum Computing, Machine Learning
                            </p>
                        </div>

                        {/* Keywords */}
                        <div>
                            <p className="text-xs text-muted-foreground mb-2">
                                Keywords
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {[
                                    "Quantum Neural Networks",
                                    "Barren Plateaus",
                                    "Algorithmic Complexity",
                                    "NISQ",
                                ].map((keyword) => (
                                    <Badge
                                        key={keyword}
                                        variant="secondary"
                                        className="text-xs px-2 py-1 bg-primary/20"
                                    >
                                        {keyword}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Review Process */}
                <Card>
                    <CardHeader className="flex flex-row justify-between items-center">
                        <CardTitle className="text-base">
                            Review Process
                        </CardTitle>
                    </CardHeader>

                    <CardContent className="space-y-3">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Reviewer Name</TableHead>
                                    <TableHead>Review Stage</TableHead>
                                </TableRow>
                            </TableHeader>

                            <TableBody>
                                {reviewers.map((reviewer, index) => (
                                    <TableRow
                                        key={index}
                                        className="hover:bg-muted/50"
                                    >
                                        {/* Reviewer */}
                                        <TableCell>
                                            <div className="flex items-center gap-3">
                                                <Avatar className="w-8 h-8">
                                                    <AvatarFallback>
                                                        {reviewer.name[0]}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <span className="text-sm font-medium">
                                                    {reviewer.name}
                                                </span>
                                            </div>
                                        </TableCell>

                                        {/* Stage */}
                                        <TableCell>
                                            <Badge
                                                className={getStageStyle(
                                                    reviewer.stage,
                                                )}
                                            >
                                                {reviewer.stage}
                                            </Badge>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default SubmissionDetails;
