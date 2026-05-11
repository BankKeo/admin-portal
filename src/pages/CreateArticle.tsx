import { useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
    ChevronLeft,
    Bold,
    Italic,
    List,
    ListOrdered,
    Quote,
    Heading2,
    Heading3,
    Plus,
    X,
    Send,
    FileText,
    Info,
    Upload,
    Paperclip,
} from "lucide-react";

const CATEGORIES = [
    "Aquatic Ecology",
    "Forest Ecology",
    "Soil Science",
    "Atmospheric Science",
    "Water Quality",
    "Marine Biology",
    "Environmental Chemistry",
    "Climate Science",
    "Biodiversity",
    "Land Use & Management",
];

const KEYWORD_SUGGESTIONS = [
    "biodiversity",
    "climate change",
    "deforestation",
    "carbon sequestration",
    "water quality",
    "soil erosion",
    "coral reefs",
    "microplastics",
    "Philippines",
    "Southeast Asia",
];

type ToolBtn = { icon?: React.ElementType; label: string; text?: string; cmd: string; val?: string };
type ToolGroup = ToolBtn[];

const TOOLBAR: ToolGroup[] = [
    [
        { icon: Bold, label: "Bold", cmd: "bold" },
        { icon: Italic, label: "Italic", cmd: "italic" },
    ],
    [
        { icon: Heading2, label: "Heading 2", cmd: "formatBlock", val: "h2" },
        { icon: Heading3, label: "Heading 3", cmd: "formatBlock", val: "h3" },
        { text: "P", label: "Paragraph", cmd: "formatBlock", val: "p" },
    ],
    [
        { icon: List, label: "Bullet List", cmd: "insertUnorderedList" },
        { icon: ListOrdered, label: "Numbered List", cmd: "insertOrderedList" },
        { icon: Quote, label: "Blockquote", cmd: "formatBlock", val: "blockquote" },
    ],
];

const WORKFLOW_STEPS = [
    ["📨", "Submitted", "Article received by editorial system"],
    ["🔍", "Screening", "Initial editorial pre-review"],
    ["👤", "Peer Review", "Assigned to expert reviewers"],
    ["✅", "Decision", "Accept / Request Revision / Reject"],
];

const GUIDELINES = [
    "Manuscripts must be original and unpublished.",
    "Abstract should be 250–350 words.",
    "Use structured format: Background, Objectives, Methodology, Key Findings, Conclusion.",
    "3 to 8 keywords required.",
    "Review type: Double-blind peer review.",
    "Plagiarism threshold: max 20%.",
    "Authors will be notified within 30 days.",
];

export default function CreateArticle() {
    const navigate = useNavigate();
    const editorRef = useRef<HTMLDivElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [email, setEmail] = useState("");
    const [category, setCategory] = useState("");
    const [keywords, setKeywords] = useState<string[]>([]);
    const [kwInput, setKwInput] = useState("");
    const [manuscriptFile, setManuscriptFile] = useState<File | null>(null);
    const [dragOver, setDragOver] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [submitted, setSubmitted] = useState(false);

    const ACCEPTED_TYPES = [
        "application/pdf",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    const handleFileChange = (file: File | null) => {
        if (!file) return;
        if (!ACCEPTED_TYPES.includes(file.type)) {
            setErrors((e) => ({ ...e, file: "Only PDF or DOCX files are accepted." }));
            return;
        }
        setErrors((e) => {
            const n = { ...e };
            delete n.file;
            return n;
        });
        setManuscriptFile(file);
    };

    const formatBytes = (bytes: number) => {
        if (bytes < 1024) return `${bytes} B`;
        if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
        return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
    };

    const exec = useCallback((cmd: string, val?: string) => {
        editorRef.current?.focus();
        document.execCommand(cmd, false, val);
    }, []);

    const addKeyword = () => {
        const v = kwInput.trim().toLowerCase();
        if (v && !keywords.includes(v)) setKeywords((k) => [...k, v]);
        setKwInput("");
    };

    const removeKeyword = (kw: string) => setKeywords((k) => k.filter((x) => x !== kw));

    const validate = () => {
        const e: Record<string, string> = {};
        if (!title.trim()) e.title = "Title is required.";
        if (!author.trim()) e.author = "Author name is required.";
        if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = "Valid email is required.";
        if (!category) e.category = "Please select a category.";
        const html = editorRef.current?.innerHTML ?? "";
        if (!html || html === "<br>") e.abstract = "Abstract content is required.";
        if (keywords.length === 0) e.keywords = "Add at least one keyword.";
        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const handleSubmit = () => {
        if (!validate()) return;
        setSubmitted(true);
        setTimeout(() => navigate("/articles"), 2200);
    };

    if (submitted) {
        return (
            <div className="flex flex-col items-center justify-center py-28 text-center space-y-3">
                <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center animate-pulse">
                    <FileText size={22} className="text-green-600" />
                </div>
                <p className="text-gray-800 font-semibold text-lg">Article Submitted!</p>
                <p className="text-gray-400 text-sm max-w-xs">
                    Your manuscript has been received. An editor will screen it within 2–3 business days.
                </p>
                <div className="flex items-center gap-2 text-xs text-gray-400 mt-2">
                    <div className="w-3 h-3 border-2 border-green-500 border-t-transparent rounded-full animate-spin" />
                    Redirecting to Article Management…
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm">
                <button
                    onClick={() => navigate("/articles")}
                    className="flex items-center gap-1 text-green-600 hover:text-green-700 font-semibold transition-colors"
                >
                    <ChevronLeft size={15} /> Article Management
                </button>
                <span className="text-gray-300">/</span>
                <span className="text-gray-500">Submit New Article</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* ── Left column ── */}
                <div className="lg:col-span-2 space-y-4">
                    {/* Article metadata */}
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-4">
                        <h2 className="text-sm font-bold text-gray-800">Article Information</h2>

                        {/* Title */}
                        <div>
                            <label className="text-xs font-semibold text-gray-400 mb-1 block">Article Title *</label>
                            <input
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Enter the full article title…"
                                className={`w-full text-sm border rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-green-300 transition-shadow ${errors.title ? "border-red-300 bg-red-50/30" : "border-gray-200"}`}
                            />
                            {errors.title && <p className="text-xs text-red-500 mt-1">{errors.title}</p>}
                        </div>

                        {/* Author + Email */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                                <label className="text-xs font-semibold text-gray-400 mb-1 block">Author Name *</label>
                                <input
                                    value={author}
                                    onChange={(e) => setAuthor(e.target.value)}
                                    placeholder="e.g. Dr. Maria Santos"
                                    className={`w-full text-sm border rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-green-300 transition-shadow ${errors.author ? "border-red-300 bg-red-50/30" : "border-gray-200"}`}
                                />
                                {errors.author && <p className="text-xs text-red-500 mt-1">{errors.author}</p>}
                            </div>
                            <div>
                                <label className="text-xs font-semibold text-gray-400 mb-1 block">Author Email *</label>
                                <input
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="e.g. m.santos@uplb.edu.ph"
                                    className={`w-full text-sm border rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-green-300 transition-shadow ${errors.email ? "border-red-300 bg-red-50/30" : "border-gray-200"}`}
                                />
                                {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                            </div>
                        </div>

                        {/* Category */}
                        <div>
                            <label className="text-xs font-semibold text-gray-400 mb-1 block">Category *</label>
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className={`w-full text-sm border rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-green-300 bg-white transition-shadow ${errors.category ? "border-red-300 bg-red-50/30" : "border-gray-200"}`}
                            >
                                <option value="">Select a category…</option>
                                {CATEGORIES.map((c) => (
                                    <option key={c}>{c}</option>
                                ))}
                            </select>
                            {errors.category && <p className="text-xs text-red-500 mt-1">{errors.category}</p>}
                        </div>

                        {/* Keywords */}
                        <div>
                            <label className="text-xs font-semibold text-gray-400 mb-1 block">Keywords *</label>
                            <div
                                className={`border rounded-xl p-2.5 focus-within:ring-2 focus-within:ring-green-300 transition-shadow ${errors.keywords ? "border-red-300 bg-red-50/30" : "border-gray-200"}`}
                            >
                                {keywords.length > 0 && (
                                    <div className="flex flex-wrap gap-1.5 mb-2">
                                        {keywords.map((k) => (
                                            <span
                                                key={k}
                                                className="flex items-center gap-1 bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs font-medium"
                                            >
                                                {k}
                                                <button
                                                    onClick={() => removeKeyword(k)}
                                                    className="hover:text-green-900 transition-colors"
                                                >
                                                    <X size={10} />
                                                </button>
                                            </span>
                                        ))}
                                    </div>
                                )}
                                <div className="flex gap-2 items-center">
                                    <input
                                        value={kwInput}
                                        onChange={(e) => setKwInput(e.target.value)}
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter") {
                                                e.preventDefault();
                                                addKeyword();
                                            }
                                        }}
                                        placeholder="Type a keyword and press Enter…"
                                        className="flex-1 text-xs focus:outline-none bg-transparent placeholder:text-gray-400"
                                    />
                                    <button
                                        onClick={addKeyword}
                                        className="text-xs text-green-600 hover:text-green-700 font-semibold flex items-center gap-1 shrink-0"
                                    >
                                        <Plus size={11} /> Add
                                    </button>
                                </div>
                            </div>
                            <div className="flex flex-wrap gap-1.5 mt-2">
                                {KEYWORD_SUGGESTIONS.filter((s) => !keywords.includes(s)).map((s) => (
                                    <button
                                        key={s}
                                        onClick={() => setKeywords((k) => [...k, s])}
                                        className="text-xs bg-gray-100 hover:bg-green-50 hover:text-green-700 text-gray-500 px-2 py-0.5 rounded-full transition-colors"
                                    >
                                        + {s}
                                    </button>
                                ))}
                            </div>
                            {errors.keywords && <p className="text-xs text-red-500 mt-1">{errors.keywords}</p>}
                        </div>

                        {/* Manuscript File Upload */}
                        <div>
                            <label className="text-xs font-semibold text-gray-400 mb-1 block">
                                Manuscript File <span className="font-normal text-gray-300">(PDF or DOCX)</span>
                            </label>
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                                className="hidden"
                                onChange={(e) => handleFileChange(e.target.files?.[0] ?? null)}
                            />
                            {manuscriptFile ? (
                                <div className="flex items-center gap-3 p-3 border border-green-200 bg-green-50/60 rounded-xl">
                                    <div className="w-8 h-8 shrink-0 bg-green-100 rounded-lg flex items-center justify-center">
                                        <Paperclip size={14} className="text-green-600" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-xs font-semibold text-gray-800 truncate">
                                            {manuscriptFile.name}
                                        </p>
                                        <p className="text-xs text-gray-400">{formatBytes(manuscriptFile.size)}</p>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setManuscriptFile(null);
                                            if (fileInputRef.current) fileInputRef.current.value = "";
                                        }}
                                        className="w-6 h-6 flex items-center justify-center rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors shrink-0"
                                    >
                                        <X size={12} />
                                    </button>
                                </div>
                            ) : (
                                <div
                                    onDragOver={(e) => {
                                        e.preventDefault();
                                        setDragOver(true);
                                    }}
                                    onDragLeave={() => setDragOver(false)}
                                    onDrop={(e) => {
                                        e.preventDefault();
                                        setDragOver(false);
                                        handleFileChange(e.dataTransfer.files?.[0] ?? null);
                                    }}
                                    onClick={() => fileInputRef.current?.click()}
                                    className={`flex flex-col items-center justify-center gap-2 p-5 border-2 border-dashed rounded-xl cursor-pointer transition-colors ${
                                        dragOver
                                            ? "border-green-400 bg-green-50"
                                            : "border-gray-200 hover:border-green-300 hover:bg-green-50/40"
                                    } ${errors.file ? "border-red-300 bg-red-50/30" : ""}`}
                                >
                                    <Upload size={18} className="text-gray-400" />
                                    <div className="text-center">
                                        <p className="text-xs font-semibold text-gray-600">
                                            Drop file here or <span className="text-green-600">browse</span>
                                        </p>
                                        <p className="text-xs text-gray-400 mt-0.5">PDF or DOCX · max 20 MB</p>
                                    </div>
                                </div>
                            )}
                            {errors.file && <p className="text-xs text-red-500 mt-1">{errors.file}</p>}
                        </div>
                    </div>

                    {/* ── Abstract rich-text editor ── */}
                    <div
                        className={`bg-white rounded-2xl border shadow-sm overflow-hidden ${errors.abstract ? "border-red-300" : "border-gray-100"}`}
                    >
                        <div className="px-5 pt-5 pb-3">
                            <h2 className="text-sm font-bold text-gray-800 mb-0.5">Abstract *</h2>
                            <p className="text-xs text-gray-400">
                                Write a structured abstract using headings, bullet lists, and blockquotes for clarity.
                            </p>
                        </div>

                        {/* Toolbar */}
                        <div className="flex items-center gap-0.5 px-3 py-2 border-t border-b border-gray-100 bg-gray-50 flex-wrap">
                            {TOOLBAR.map((group, gi) => (
                                <div key={gi} className="flex items-center gap-0.5">
                                    {gi > 0 && <div className="w-px h-5 bg-gray-200 mx-1.5" />}
                                    {group.map(({ icon: Icon, label, text, cmd, val }) => (
                                        <button
                                            key={label}
                                            title={label}
                                            onMouseDown={(e) => {
                                                e.preventDefault();
                                                exec(cmd, val);
                                            }}
                                            className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-green-100 hover:text-green-700 text-gray-500 transition-colors text-xs font-bold"
                                        >
                                            {Icon ? (
                                                <Icon size={13} />
                                            ) : (
                                                <span className="text-[11px] font-bold">{text}</span>
                                            )}
                                        </button>
                                    ))}
                                </div>
                            ))}
                        </div>

                        {/* Editable area */}
                        <div
                            ref={editorRef}
                            contentEditable
                            suppressContentEditableWarning
                            data-placeholder="Start writing your abstract here…  Try: select text and click H2 to make a section heading, or click the quote icon for a blockquote."
                            className="abstract-editor min-h-64 p-5 text-sm text-gray-700 leading-relaxed focus:outline-none
                [&_h2]:text-base [&_h2]:font-bold [&_h2]:text-gray-800 [&_h2]:mt-5 [&_h2]:mb-1.5 first:[&_h2]:mt-0
                [&_h3]:text-sm [&_h3]:font-semibold [&_h3]:text-gray-700 [&_h3]:mt-4 [&_h3]:mb-1
                [&_p]:mt-2 [&_p]:text-gray-600
                [&_ul]:mt-2 [&_ul]:ml-5 [&_ul]:list-disc [&_ul>li]:mt-1
                [&_ol]:mt-2 [&_ol]:ml-5 [&_ol]:list-decimal [&_ol>li]:mt-1
                [&_blockquote]:mt-3 [&_blockquote]:border-l-2 [&_blockquote]:border-green-400 [&_blockquote]:pl-3 [&_blockquote]:italic [&_blockquote]:text-gray-500 [&_blockquote]:bg-green-50/40 [&_blockquote]:py-1.5 [&_blockquote]:rounded-r-xl
                [&_strong]:font-semibold [&_em]:italic [&_hr]:my-3 [&_hr]:border-gray-200"
                        />
                        {errors.abstract && <p className="text-xs text-red-500 px-5 pb-3 -mt-1">{errors.abstract}</p>}
                    </div>

                    {/* Action buttons */}
                    <div className="flex gap-3">
                        <button
                            onClick={handleSubmit}
                            className="flex items-center gap-2 px-5 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-xl text-sm font-semibold transition-colors shadow-sm shadow-green-200"
                        >
                            <Send size={14} /> Submit for Review
                        </button>
                        <button
                            onClick={() => navigate("/articles")}
                            className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-sm font-semibold transition-colors"
                        >
                            Cancel
                        </button>
                    </div>
                </div>

                {/* ── Right sidebar ── */}
                <div className="space-y-4">
                    {/* Submission guidelines */}
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
                        <h3 className="text-sm font-semibold text-gray-800 mb-3 flex items-center gap-2">
                            <Info size={14} className="text-green-600" /> Submission Guidelines
                        </h3>
                        <ul className="space-y-2">
                            {GUIDELINES.map((g) => (
                                <li key={g} className="flex gap-2 text-xs text-gray-500">
                                    <span className="text-green-500 shrink-0 mt-0.5">•</span>
                                    {g}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Editor tips */}
                    <div className="bg-green-50 rounded-2xl border border-green-100 p-4">
                        <h3 className="text-sm font-semibold text-green-800 mb-3">Abstract Editor Tips</h3>
                        <ul className="space-y-2">
                            {[
                                ["H2", "Section headings (Background, Methodology…)"],
                                ["H3", "Sub-section headings"],
                                ["B / I", "Bold and italic emphasis"],
                                ["• / 1.", "Bullet or numbered lists"],
                                ['" "', "Blockquote for key statements"],
                            ].map(([key, desc]) => (
                                <li key={key} className="flex gap-2 items-start text-xs text-green-700">
                                    <kbd className="bg-white border border-green-200 text-green-700 text-[10px] px-1.5 py-0.5 rounded font-mono shrink-0 leading-4">
                                        {key}
                                    </kbd>
                                    <span>{desc}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Workflow preview */}
                    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
                        <h3 className="text-sm font-semibold text-gray-800 mb-3">What Happens Next</h3>
                        <div className="relative">
                            <div className="absolute left-2.5 top-3 bottom-3 w-px bg-gray-100" />
                            <div className="space-y-3">
                                {WORKFLOW_STEPS.map(([emoji, label, desc]) => (
                                    <div key={label} className="flex items-start gap-3 pl-0.5">
                                        <span className="text-base shrink-0 w-5 text-center">{emoji}</span>
                                        <div>
                                            <div className="text-xs font-semibold text-gray-700">{label}</div>
                                            <div className="text-xs text-gray-400">{desc}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
