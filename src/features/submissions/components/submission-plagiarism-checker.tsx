import { Button } from "@/components/ui/button";
import { FileText, Upload, Clipboard, Loader2 } from "lucide-react";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";

const SubmissionPlagiarismChecker = ({ open, setOpen }: { open: boolean; setOpen: (open: boolean) => void }) => {
    const [content, setContent] = useState("");
    const [checking, setChecking] = useState(false);

    // mock result
    const [result, setResult] = useState<null | {
        score: number;
    }>(null);

    const handleCheck = async () => {
        if (!content.trim()) return;

        setChecking(true);

        // fake loading
        setTimeout(() => {
            setResult({
                score: 18,
            });

            setChecking(false);
        }, 2000);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-5/6">
                <DialogHeader>
                    <DialogTitle>Plagiarism Checker</DialogTitle>
                    <DialogDescription>
                        Paste manuscript content or upload a document to analyze similarity.
                    </DialogDescription>
                </DialogHeader>

                {/* Layout */}
                <div className="grid lg:grid-cols-[1fr_350px]">
                    {/* LEFT */}
                    <div className="border-r bg-background">
                        {/* Editor */}
                        <div className="space-y-4">
                            {/* Actions */}
                            <div className="flex items-center gap-3">
                                <Button variant="outline" className="gap-2 rounded-full">
                                    <Clipboard className="w-4 h-4" />
                                    Paste text
                                </Button>

                                <Button variant="outline" className="gap-2 rounded-full">
                                    <Upload className="w-4 h-4" />
                                    Upload document
                                </Button>
                            </div>

                            {/* Textarea */}
                            <Textarea
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                placeholder="Paste manuscript content here..."
                                className="resize-none border-0 shadow-none focus-visible:ring-0 text-base"
                            />

                            {/* Footer */}
                            <div className="flex justify-end gap-2 pt-2 px-6">
                                <DialogClose asChild>
                                    <Button variant="outline">Cancel</Button>
                                </DialogClose>

                                <Button disabled={checking || !content.trim()} onClick={handleCheck}>
                                    {checking && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}

                                    {checking ? "Scanning..." : "Start Scan"}
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT PANEL */}
                    <div className="bg-muted/30 flex flex-col">
                        {/* Score */}
                        <div className="border-b p-6">
                            <Card className="p-6 text-center rounded-2xl shadow-none">
                                <div className="space-y-2">
                                    <div className="text-6xl font-bold tracking-tight">
                                        {result ? `${result.score}%` : "%"}
                                    </div>

                                    <p className="text-muted-foreground">Plagiarism Score</p>

                                    {result && <Progress value={result.score} className="mt-4" />}
                                </div>
                            </Card>
                        </div>

                        {/* Empty / Result */}
                        <div className="flex-1 flex items-center justify-center p-8">
                            {!result ? (
                                <div className="text-center space-y-4">
                                    <div className="mx-auto w-24 h-24 rounded-full bg-muted flex items-center justify-center">
                                        <FileText className="w-10 h-10 text-muted-foreground" />
                                    </div>

                                    <div>
                                        <h3 className="font-semibold text-lg">Nothing to check yet!</h3>

                                        <p className="text-sm text-muted-foreground mt-1">
                                            Start writing or pasting something in the editor.
                                        </p>
                                    </div>
                                </div>
                            ) : (
                                <div className="w-full space-y-4">
                                    <div>
                                        <h3 className="font-semibold">Scan Result</h3>

                                        <p className="text-sm text-muted-foreground">
                                            Similarity detected from external sources.
                                        </p>
                                    </div>

                                    {/* Source Example */}
                                    <Card className="p-4 rounded-xl">
                                        <div className="space-y-1">
                                            <p className="font-medium text-sm">Example Source</p>

                                            <p className="text-xs text-muted-foreground">
                                                https://example.com/research-paper
                                            </p>

                                            <p className="text-xs text-amber-600 pt-1">18% matched similarity</p>
                                        </div>
                                    </Card>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default SubmissionPlagiarismChecker;
