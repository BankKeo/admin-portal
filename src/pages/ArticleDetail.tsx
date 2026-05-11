import { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  Download,
  Globe,
  Users,
  MessageSquare,
  Activity,
  Bot,
  Send,
  FileText,
  Star,
  Clock,
} from "lucide-react";
import { ARTS } from "../data/mockData";
import { StatusBadge, PlagBadge, Avatar } from "../components/shared";

type Tab = "overview" | "reviews" | "ai" | "timeline";

const TABS: { id: Tab; label: string; icon: React.ElementType }[] = [
  { id: "overview", label: "Overview", icon: FileText },
  { id: "reviews", label: "Reviewer Comments", icon: MessageSquare },
  { id: "ai", label: "AI Summary", icon: Bot },
  { id: "timeline", label: "Timeline", icon: Activity },
];

const AI_SUGGESTIONS = [
  "Summarize this article",
  "Assess research quality",
  "Identify key contributions",
  "Suggest reviewer expertise",
];

const MOCK_AI_SUMMARY = `This manuscript presents a comprehensive investigation into environmental management practices within Philippine forestry ecosystems. The research employs a mixed-methods approach combining quantitative field measurements with qualitative stakeholder interviews.

Key contributions include: (1) a novel framework for assessing biodiversity indices in managed forests, (2) empirical evidence linking community-based governance to improved conservation outcomes, and (3) policy recommendations aligned with national sustainable development goals.

The methodology is rigorous and the conclusions are well-supported by data. Minor improvements in the literature review and statistical reporting would strengthen the final publication.`;

export default function ArticleDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [tab, setTab] = useState<Tab>("overview");
  const [msgs, setMsgs] = useState<{ r: "u" | "a"; t: string }[]>([]);
  const [inp, setInp] = useState("");
  const [loading, setLoading] = useState(false);
  const [comment, setComment] = useState("");
  const endRef = useRef<HTMLDivElement>(null);

  const a = ARTS.find((x) => x.id === id);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs]);

  const sendAI = async () => {
    if (!inp.trim() || loading || !a) return;
    const msg = inp.trim();
    setInp("");
    setLoading(true);
    setMsgs((m) => [...m, { r: "u", t: msg }]);
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          messages: [
            {
              role: "user",
              content: `You are an academic journal assistant for JESAM (Journal of Environmental Science and Management).
Article: "${a.title}" by ${a.author}
Category: ${a.category} | Status: ${a.status}
Abstract: ${a.abstract}
Keywords: ${a.keywords.join(", ")}

Question: ${msg}

Respond concisely and professionally as an academic editor assistant.`,
            },
          ],
        }),
      });
      const d = await res.json();
      setMsgs((m) => [
        ...m,
        { r: "a", t: d.content?.map((i: { text?: string }) => i.text || "").join("\n") || "No response." },
      ]);
    } catch {
      setMsgs((m) => [...m, { r: "a", t: "Connection error. Please try again." }]);
    }
    setLoading(false);
  };

  if (!a) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center space-y-3">
        <div className="w-14 h-14 bg-gray-100 rounded-2xl flex items-center justify-center">
          <FileText size={22} className="text-gray-400" />
        </div>
        <p className="text-gray-500 font-medium">Article not found</p>
        <p className="text-gray-400 text-sm">The article ID "{id}" does not exist.</p>
        <button
          onClick={() => navigate("/articles")}
          className="mt-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-xl text-sm font-semibold transition-colors"
        >
          Back to Articles
        </button>
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
        <span className="text-gray-500 font-mono text-xs">{a.id}</span>
        <div className="ml-auto">
          <StatusBadge s={a.status} />
        </div>
      </div>

      {/* Header card */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
        <h1 className="text-lg font-bold text-gray-900 leading-snug">{a.title}</h1>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-2 text-sm text-gray-500">
          <Avatar name={a.author} sz="w-6 h-6" fs="text-[10px]" />
          <span className="text-sm font-medium text-gray-700">{a.author}</span>
          <span className="text-gray-200">·</span>
          <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full text-xs">{a.category}</span>
          <span className="text-gray-200">·</span>
          <span className="flex items-center gap-1 text-xs text-gray-400">
            <Clock size={11} /> {a.submitted}
          </span>
        </div>

        {/* Action buttons */}
        <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-100">
          {!["Published", "Rejected"].includes(a.status) && (
            <>
              <button className="px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white rounded-xl text-xs font-semibold transition-colors shadow-sm shadow-green-200">
                ✓ Accept
              </button>
              <button className="px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-700 rounded-xl text-xs font-semibold transition-colors">
                ✗ Reject
              </button>
              <button className="px-3 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-700 rounded-xl text-xs font-semibold transition-colors">
                ↩ Request Revision
              </button>
              <button className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-xl text-xs font-semibold transition-colors flex items-center gap-1">
                <Users size={11} /> Assign Reviewer
              </button>
            </>
          )}
          {a.status === "Accepted" && (
            <button className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold transition-colors flex items-center gap-1 shadow-sm shadow-emerald-200">
              <Globe size={11} /> Publish
            </button>
          )}
          <button className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-xs font-semibold flex items-center gap-1 transition-colors ml-auto">
            <Download size={11} /> Download PDF
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Left — tabs */}
        <div className="lg:col-span-2 space-y-4">
          {/* Tab nav */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-1.5 flex gap-1">
            {TABS.map(({ id: tabId, label, icon: Icon }) => (
              <button
                key={tabId}
                onClick={() => setTab(tabId)}
                className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                  tab === tabId
                    ? "bg-green-600 text-white shadow-sm"
                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                }`}
              >
                <Icon size={12} />
                <span className="hidden sm:inline">{label}</span>
              </button>
            ))}
          </div>

          {/* Tab panels */}
          {tab === "overview" && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-4">
              <div>
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Abstract</h3>
                <div
                  className="p-4 bg-green-50/50 rounded-xl border border-green-100 text-sm text-gray-600 leading-relaxed
                    [&_h2]:text-sm [&_h2]:font-bold [&_h2]:text-gray-800 [&_h2]:mt-4 [&_h2]:mb-1 first:[&_h2]:mt-0
                    [&_p]:mt-2
                    [&_ul]:mt-2 [&_ul]:ml-5 [&_ul]:list-disc [&_ul>li]:mt-1
                    [&_ol]:mt-2 [&_ol]:ml-5 [&_ol]:list-decimal [&_ol>li]:mt-1
                    [&_blockquote]:mt-3 [&_blockquote]:border-l-2 [&_blockquote]:border-green-400 [&_blockquote]:pl-3 [&_blockquote]:italic [&_blockquote]:text-gray-500
                    [&_strong]:font-semibold [&_em]:italic
                    [&_hr]:my-3 [&_hr]:border-gray-200"
                  dangerouslySetInnerHTML={{ __html: a.abstract }}
                />
              </div>
              <div>
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Keywords</h3>
                <div className="flex flex-wrap gap-1.5">
                  {a.keywords.map((k) => (
                    <span
                      key={k}
                      className="px-2.5 py-0.5 bg-green-100 text-green-700 rounded-full text-xs font-medium"
                    >
                      {k}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                  Assigned Reviewers
                </h3>
                {a.reviewers.length > 0 ? (
                  <div className="space-y-2">
                    {a.reviewers.map((r, i) => (
                      <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
                        <Avatar name={r} sz="w-8 h-8" fs="text-xs" />
                        <div>
                          <div className="text-sm font-medium text-gray-800">{r}</div>
                          <div className="flex items-center gap-1 mt-0.5">
                            {[1, 2, 3, 4, 5].map((s) => (
                              <Star
                                key={s}
                                size={10}
                                className={s <= 4 ? "text-amber-400 fill-amber-400" : "text-gray-200 fill-gray-200"}
                              />
                            ))}
                            <span className="text-xs text-gray-400 ml-1">4.0</span>
                          </div>
                        </div>
                        <span className="ml-auto text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full font-medium">
                          Reviewing
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-400 italic py-2">No reviewers assigned yet.</p>
                )}
              </div>
            </div>
          )}

          {tab === "reviews" && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-4">
              <h3 className="font-semibold text-gray-800 flex items-center gap-2 text-sm">
                <MessageSquare size={15} className="text-green-600" /> Reviewer Comments
              </h3>
              {a.reviewers.length > 0 ? (
                a.reviewers.map((r, i) => (
                  <div key={i} className="p-4 bg-gray-50 rounded-xl border border-gray-100 space-y-2">
                    <div className="flex items-center gap-2">
                      <Avatar name={r} sz="w-7 h-7" fs="text-xs" />
                      <div>
                        <div className="text-xs font-semibold text-gray-800">{r}</div>
                        <div className="text-xs text-gray-400">Reviewer {i + 1} · submitted 3 days ago</div>
                      </div>
                      <span className="ml-auto text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full font-medium">
                        Under Review
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      {i === 0
                        ? "The methodology section requires more detail on statistical analysis. The literature review is comprehensive but recent 2023–2024 publications should be incorporated to strengthen the theoretical framework."
                        : "Abstract is well-structured. Consider expanding the results section with additional quantitative data. Minor language corrections needed in the discussion."}
                    </p>
                    <div className="flex items-center gap-3 pt-1">
                      <span className="text-xs text-gray-400">Recommendation:</span>
                      <span
                        className={`text-xs font-semibold px-2 py-0.5 rounded-full ${i === 0 ? "bg-amber-50 text-amber-700" : "bg-green-50 text-green-700"}`}
                      >
                        {i === 0 ? "Minor Revision" : "Accept"}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-400 italic py-4 text-center">
                  No reviewer comments yet. Assign reviewers to begin the peer review process.
                </p>
              )}
              <div className="pt-2 border-t border-gray-100">
                <label className="text-xs font-semibold text-gray-400 mb-1.5 block">Editorial Note</label>
                <div className="flex gap-2">
                  <input
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Add editorial note visible to reviewers…"
                    className="flex-1 text-xs border border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-300"
                  />
                  <button
                    onClick={() => setComment("")}
                    className="px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded-xl text-xs font-semibold transition-colors"
                  >
                    Post
                  </button>
                </div>
              </div>
            </div>
          )}

          {tab === "ai" && (
            <div className="space-y-4">
              {/* AI Summary panel */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-7 h-7 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                    <Bot size={13} className="text-white" />
                  </div>
                  <span className="text-sm font-bold text-gray-800">AI-Generated Summary</span>
                  <span className="ml-auto text-xs bg-green-50 text-green-600 px-2 py-0.5 rounded-full font-semibold">
                    Claude
                  </span>
                </div>
                <div className="p-4 bg-green-50/40 rounded-xl border border-green-100 text-sm text-gray-600 leading-relaxed whitespace-pre-line">
                  {MOCK_AI_SUMMARY}
                </div>
                <div className="flex flex-wrap gap-2 mt-3">
                  {["Rigorous methodology", "Policy relevance", "Mixed-methods approach"].map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-0.5 bg-green-100 text-green-700 rounded-full text-xs font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* AI Chat */}
              <div
                className="bg-white rounded-2xl border border-gray-100 shadow-sm flex flex-col"
                style={{ height: 420 }}
              >
                <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-100 shrink-0">
                  <div className="w-7 h-7 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                    <Bot size={13} className="text-white" />
                  </div>
                  <span className="text-sm font-bold text-gray-800">Ask AI about this article</span>
                </div>
                <div className="flex-1 overflow-y-auto p-3 space-y-2 min-h-0">
                  {msgs.length === 0 && (
                    <div className="pt-2">
                      <p className="text-xs text-gray-400 text-center mb-3">Choose a prompt or type your own:</p>
                      <div className="space-y-1.5">
                        {AI_SUGGESTIONS.map((s) => (
                          <button
                            key={s}
                            onClick={() => setInp(s)}
                            className="w-full text-left text-xs bg-green-50 hover:bg-green-100 text-green-700 px-3 py-2 rounded-xl transition-colors leading-snug"
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                  {msgs.map((m, i) => (
                    <div key={i} className={`flex ${m.r === "u" ? "justify-end" : "justify-start"}`}>
                      <div
                        className={`max-w-[88%] text-xs rounded-2xl px-3 py-2 leading-relaxed ${
                          m.r === "u"
                            ? "bg-green-600 text-white rounded-tr-sm"
                            : "bg-gray-100 text-gray-700 rounded-tl-sm"
                        }`}
                      >
                        {m.t}
                      </div>
                    </div>
                  ))}
                  {loading && (
                    <div className="flex justify-start">
                      <div className="bg-gray-100 rounded-2xl rounded-tl-sm px-3 py-2.5 flex gap-1">
                        {[0, 150, 300].map((d) => (
                          <div
                            key={d}
                            className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"
                            style={{ animationDelay: `${d}ms` }}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                  <div ref={endRef} />
                </div>
                <div className="p-3 border-t border-gray-100 shrink-0">
                  <div className="flex gap-2">
                    <input
                      value={inp}
                      onChange={(e) => setInp(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && sendAI()}
                      placeholder="Ask about this article…"
                      className="flex-1 text-xs border border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-300"
                    />
                    <button
                      onClick={sendAI}
                      disabled={loading}
                      className="w-9 h-9 bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white rounded-xl flex items-center justify-center transition-colors shrink-0"
                    >
                      <Send size={13} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {tab === "timeline" && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <h3 className="font-semibold text-gray-800 mb-5 flex items-center gap-2 text-sm">
                <Activity size={15} className="text-green-600" /> Activity Timeline
              </h3>
              <div className="relative">
                <div className="absolute left-[9px] top-0 bottom-0 w-px bg-green-100" />
                <div className="space-y-5">
                  {a.timeline.map((t, i) => {
                    const icons: Record<string, string> = {
                      submitted: "📨",
                      review: "🔍",
                      assigned: "👤",
                      revision: "✏️",
                      accepted: "✅",
                      rejected: "❌",
                      published: "🌐",
                    };
                    const key = Object.keys(icons).find((k) => t.action.toLowerCase().includes(k)) ?? "";
                    const emoji = icons[key] ?? "📋";
                    return (
                      <div key={i} className="flex gap-4 pl-1">
                        <div className="relative shrink-0 mt-0.5">
                          <div className="w-5 h-5 bg-white border-2 border-green-400 rounded-full flex items-center justify-center text-[10px]">
                            {emoji}
                          </div>
                        </div>
                        <div className="pb-1">
                          <div className="text-sm font-semibold text-gray-800">{t.action}</div>
                          <div className="text-xs text-gray-400 mt-0.5">
                            {t.date} · by {t.by}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right sidebar */}
        <div className="space-y-4">
          {/* Article Details */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
            <h3 className="text-sm font-semibold text-gray-800 mb-3">Article Details</h3>
            <div className="space-y-0">
              {[
                ["ID", a.id],
                ["Submitted", a.submitted],
                ["Category", a.category],
                ["Author", a.author],
                ["Email", a.email],
                ["Reviewers", a.reviewers.length.toString()],
              ].map(([k, v]) => (
                <div
                  key={k}
                  className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0 gap-2"
                >
                  <span className="text-xs text-gray-400 shrink-0">{k}</span>
                  <span className="text-xs font-medium text-gray-700 text-right truncate">{v}</span>
                </div>
              ))}
              <div className="flex justify-between items-center pt-2">
                <span className="text-xs text-gray-400">Plagiarism</span>
                <PlagBadge n={a.plagScore} />
              </div>
            </div>
          </div>

          {/* Status History */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
            <h3 className="text-sm font-semibold text-gray-800 mb-3">Status History</h3>
            <div className="relative">
              <div className="absolute left-[7px] top-0 bottom-0 w-px bg-gray-100" />
              <div className="space-y-3">
                {a.timeline.slice(0, 4).map((t, i) => (
                  <div key={i} className="flex gap-3 pl-0.5">
                    <div
                      className={`shrink-0 mt-1 w-3.5 h-3.5 rounded-full border-2 ${
                        i === 0 ? "border-green-500 bg-green-500" : "border-gray-300 bg-white"
                      }`}
                    />
                    <div>
                      <div className="text-xs font-medium text-gray-700 leading-tight">{t.action}</div>
                      <div className="text-xs text-gray-400">{t.date}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Current Status */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
            <h3 className="text-sm font-semibold text-gray-800 mb-3">Current Status</h3>
            <div className="flex items-center justify-between">
              <StatusBadge s={a.status} />
              <PlagBadge n={a.plagScore} />
            </div>
            <div className="mt-3 text-xs text-gray-400 leading-relaxed">
              {a.status === "Under Review"
                ? `${a.reviewers.length} reviewer(s) assigned. Awaiting feedback.`
                : a.status === "Revision Required"
                  ? "Author has been notified to submit revisions."
                  : a.status === "Accepted"
                    ? "Article accepted. Ready to publish."
                    : a.status === "Published"
                      ? "Article is live and publicly accessible."
                      : a.status === "Rejected"
                        ? "Article did not meet publication criteria."
                        : "Awaiting editorial screening."}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
