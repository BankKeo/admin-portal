import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search, Plus, Users, BookOpen, CheckCircle, Star, Mail,
  AlertTriangle, X, Eye,
} from "lucide-react";
import type { Reviewer } from "../types";
import { REVS } from "../data/mockData";
import { Avatar } from "../components/shared";

export default function ReviewerManagement() {
  const navigate = useNavigate();
  const [reviewers, setReviewers] = useState<Reviewer[]>(REVS);
  const [q, setQ] = useState("");
  const [activeFilter, setActiveFilter] = useState<"all" | "active" | "inactive">("all");

  // ── Modal state ────────────────────────────────────────────────────────────
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", institution: "", active: true });
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState(false);

  // ── Filtered list ──────────────────────────────────────────────────────────
  const rows = reviewers.filter(
    (r) =>
      (activeFilter === "all" || (activeFilter === "active" ? r.active : !r.active)) &&
      (r.name.toLowerCase().includes(q.toLowerCase()) ||
        r.expertise.some((e) => e.toLowerCase().includes(q.toLowerCase()))),
  );
  const pendingCount = reviewers.filter((r) => r.assigned > 0).length;

  // ── Tag helpers ────────────────────────────────────────────────────────────
  const addTag = () => {
    const t = tagInput.trim();
    if (t && !tags.includes(t)) {
      setTags((p) => [...p, t]);
      if (errors.expertise) setErrors((p) => { const n = { ...p }; delete n.expertise; return n; });
    }
    setTagInput("");
  };
  const removeTag = (t: string) => setTags((p) => p.filter((x) => x !== t));

  // ── Form helpers ───────────────────────────────────────────────────────────
  const handleField = (field: string, value: string) => {
    setForm((p) => ({ ...p, [field]: value }));
    if (errors[field]) setErrors((p) => { const n = { ...p }; delete n[field]; return n; });
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Full name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Invalid email format";
    if (!form.institution.trim()) e.institution = "Institution is required";
    if (tags.length === 0) e.expertise = "Add at least one area of expertise";
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length > 0) { setErrors(e); return; }
    const newReviewer: Reviewer = {
      id: `R${String(reviewers.length + 1).padStart(3, "0")}`,
      name: form.name,
      institution: form.institution,
      email: form.email,
      expertise: tags,
      assigned: 0,
      completed: 0,
      rating: 0,
      active: form.active,
      reviews: [],
    };
    setReviewers([newReviewer, ...reviewers]);
    setSuccess(true);
    setTimeout(() => {
      setShowModal(false);
      setSuccess(false);
      setForm({ name: "", email: "", institution: "", active: true });
      setTags([]);
      setTagInput("");
      setErrors({});
    }, 2000);
  };

  const closeModal = () => {
    setShowModal(false);
    setForm({ name: "", email: "", institution: "", active: true });
    setTags([]);
    setTagInput("");
    setErrors({});
    setSuccess(false);
  };

  // ── Suggested expertise areas ──────────────────────────────────────────────
  const suggestions = [
    "Aquatic Ecology", "Forest Ecology", "Soil Science", "Atmospheric Science",
    "Marine Biology", "Water Quality", "Climate Change", "Biodiversity",
    "Environmental Chemistry", "Toxicology", "Land Use", "Carbon Science",
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Reviewer Management</h1>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors shadow-sm shadow-green-200"
        >
          <Plus size={15} /> Add Reviewer
        </button>
      </div>

      {/* Pending alert */}
      {pendingCount > 0 && (
        <div className="flex items-center gap-3 bg-amber-50 border border-amber-200 rounded-2xl px-4 py-3">
          <AlertTriangle size={16} className="text-amber-600 shrink-0" />
          <span className="text-sm text-amber-800 font-medium">
            {pendingCount} reviewer{pendingCount > 1 ? "s have" : " has"} active assignments pending completion.
          </span>
          <button className="ml-auto text-xs text-amber-700 hover:text-amber-900 font-semibold shrink-0">View all</button>
        </div>
      )}

      {/* 4 stat cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { lbl: "Total Reviewers", val: reviewers.length, I: Users, ic: "text-green-600", bg: "bg-green-50" },
          { lbl: "Assigned", val: reviewers.filter((r) => r.assigned > 0).length, I: BookOpen, ic: "text-blue-600", bg: "bg-blue-50" },
          { lbl: "Reviews Done", val: reviewers.reduce((a, r) => a + r.completed, 0), I: CheckCircle, ic: "text-emerald-600", bg: "bg-emerald-50" },
          { lbl: "Avg. Rating", val: reviewers.filter(r => r.rating > 0).length > 0 ? (reviewers.filter(r => r.rating > 0).reduce((a, r) => a + r.rating, 0) / reviewers.filter(r => r.rating > 0).length).toFixed(1) : "—", I: Star, ic: "text-amber-500", bg: "bg-amber-50" },
        ].map((s) => (
          <div key={s.lbl} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex items-center gap-3">
            <div className={`w-10 h-10 ${s.bg} rounded-xl flex items-center justify-center shrink-0`}>
              <s.I size={18} className={s.ic} />
            </div>
            <div>
              <div className="text-xl font-bold text-gray-900">{s.val}</div>
              <div className="text-xs text-gray-400">{s.lbl}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Search + Active/Inactive filter */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-3.5 flex flex-col sm:flex-row gap-2">
        <div className="relative flex-1">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search by name or expertise…"
            className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-300"
          />
        </div>
        <div className="flex gap-1.5">
          {(["all", "active", "inactive"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-3 py-1.5 text-xs rounded-xl font-medium capitalize transition-colors ${activeFilter === f ? "bg-green-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Reviewer grid cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {rows.map((r) => {
          const total = r.assigned + r.completed;
          const pct = total > 0 ? Math.round((r.completed / total) * 100) : 100;
          return (
            <div key={r.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start gap-3 mb-3">
                <Avatar name={r.name} sz="w-11 h-11" fs="text-sm" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-semibold text-gray-900 text-sm">{r.name}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${r.active ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-400"}`}>
                      {r.active ? "Active" : "Inactive"}
                    </span>
                  </div>
                  {r.rating > 0 ? (
                    <div className="text-xs text-amber-500 mt-0.5 font-semibold">
                      {"★".repeat(Math.round(r.rating))}
                      <span className="text-gray-400 font-normal ml-1">{r.rating}</span>
                    </div>
                  ) : (
                    <div className="text-xs text-gray-300 mt-0.5">No reviews yet</div>
                  )}
                  <div className="text-xs text-gray-400 mt-0.5 flex items-center gap-1">
                    <Mail size={10} /> {r.email}
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-1 mb-3">
                {r.expertise.map((e) => (
                  <span key={e} className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full font-medium">{e}</span>
                ))}
              </div>

              <div className="grid grid-cols-3 gap-2 mb-3">
                {[
                  { v: r.assigned, l: "Active" },
                  { v: r.completed, l: "Completed" },
                  { v: total, l: "Total" },
                ].map((x) => (
                  <div key={x.l} className="text-center bg-gray-50 rounded-xl py-2">
                    <div className="font-bold text-gray-900 text-base">{x.v}</div>
                    <div className="text-xs text-gray-400">{x.l}</div>
                  </div>
                ))}
              </div>

              <div className="mb-3">
                <div className="flex justify-between text-xs text-gray-500 mb-1">
                  <span>Review Completion</span>
                  <span className="font-semibold text-gray-700">{pct}%</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${pct >= 70 ? "bg-green-500" : pct >= 40 ? "bg-amber-400" : "bg-red-400"}`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>

              <div className="flex gap-2 pt-3 border-t border-gray-100">
                <button
                  onClick={() => navigate(`/reviewers/${r.id}`)}
                  className="flex-1 flex items-center justify-center gap-1.5 text-xs text-green-700 bg-green-50 hover:bg-green-600 hover:text-white py-2 rounded-xl transition-colors font-medium"
                >
                  <Eye size={11} /> View Profile
                </button>
                <button className="flex-1 flex items-center justify-center gap-1.5 text-xs text-gray-600 hover:text-gray-900 bg-gray-50 hover:bg-gray-100 py-2 rounded-xl transition-colors font-medium">
                  <BookOpen size={11} /> Assign
                </button>
              </div>
            </div>
          );
        })}

        {rows.length === 0 && (
          <div className="col-span-full text-center py-12 text-gray-400 text-sm bg-white rounded-2xl border border-gray-100">
            No reviewers match your search.
          </div>
        )}
      </div>

      {/* ── Add Reviewer Modal ─────────────────────────────────────────────── */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <div>
                <h2 className="text-base font-bold text-gray-900">Add New Reviewer</h2>
                <p className="text-xs text-gray-400 mt-0.5">Register a peer reviewer for the journal</p>
              </div>
              <button onClick={closeModal} className="p-1.5 hover:bg-gray-100 rounded-xl transition-colors">
                <X size={16} className="text-gray-400" />
              </button>
            </div>

            {success ? (
              /* Success state */
              <div className="p-10 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle size={32} className="text-green-600" />
                </div>
                <h3 className="text-base font-bold text-gray-900">Reviewer Added!</h3>
                <p className="text-sm text-gray-400 mt-1">
                  {form.name} has been registered as a reviewer.
                </p>
              </div>
            ) : (
              <div className="p-6 space-y-4">
                {/* Name + Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-gray-500 block mb-1">Full Name *</label>
                    <input
                      value={form.name}
                      onChange={(e) => handleField("name", e.target.value)}
                      placeholder="Dr. Elena Reyes"
                      className={`w-full text-sm border rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-300 ${errors.name ? "border-red-400 bg-red-50" : "border-gray-200"}`}
                    />
                    {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-500 block mb-1">Email Address *</label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => handleField("email", e.target.value)}
                      placeholder="reviewer@university.edu.ph"
                      className={`w-full text-sm border rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-300 ${errors.email ? "border-red-400 bg-red-50" : "border-gray-200"}`}
                    />
                    {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                  </div>
                </div>

                {/* Institution */}
                <div>
                  <label className="text-xs font-semibold text-gray-500 block mb-1">Institution *</label>
                  <input
                    value={form.institution}
                    onChange={(e) => handleField("institution", e.target.value)}
                    placeholder="University of the Philippines Los Baños"
                    className={`w-full text-sm border rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-300 ${errors.institution ? "border-red-400 bg-red-50" : "border-gray-200"}`}
                  />
                  {errors.institution && <p className="text-xs text-red-500 mt-1">{errors.institution}</p>}
                </div>

                {/* Expertise tag input */}
                <div>
                  <label className="text-xs font-semibold text-gray-500 block mb-1">Areas of Expertise *</label>
                  <div className="flex gap-2">
                    <input
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addTag(); } }}
                      placeholder="Type an area and press Enter…"
                      className={`flex-1 text-sm border rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-300 ${errors.expertise && tags.length === 0 ? "border-red-400 bg-red-50" : "border-gray-200"}`}
                    />
                    <button
                      type="button"
                      onClick={addTag}
                      className="px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded-xl text-sm font-semibold transition-colors shrink-0"
                    >
                      Add
                    </button>
                  </div>

                  {/* Added tags */}
                  {tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {tags.map((t) => (
                        <span
                          key={t}
                          className="inline-flex items-center gap-1 px-2.5 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium"
                        >
                          {t}
                          <button
                            onClick={() => removeTag(t)}
                            className="text-blue-400 hover:text-blue-700 transition-colors ml-0.5"
                          >
                            <X size={10} />
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                  {errors.expertise && <p className="text-xs text-red-500 mt-1">{errors.expertise}</p>}

                  {/* Quick-add suggestions */}
                  <div className="mt-2">
                    <p className="text-xs text-gray-400 mb-1.5">Quick add:</p>
                    <div className="flex flex-wrap gap-1">
                      {suggestions.filter((s) => !tags.includes(s)).slice(0, 8).map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => { setTags((p) => [...p, s]); if (errors.expertise) setErrors((p) => { const n = { ...p }; delete n.expertise; return n; }); }}
                          className="text-xs px-2 py-0.5 bg-gray-100 hover:bg-green-100 hover:text-green-700 text-gray-600 rounded-full transition-colors"
                        >
                          + {s}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Active toggle */}
                <div className="flex items-center justify-between py-2 border-t border-gray-100">
                  <div>
                    <div className="text-sm font-semibold text-gray-700">Set as Active</div>
                    <div className="text-xs text-gray-400">Reviewer can receive article assignments</div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setForm((p) => ({ ...p, active: !p.active }))}
                    className={`w-11 h-6 rounded-full flex items-center transition-colors px-0.5 ${form.active ? "bg-green-600" : "bg-gray-200"}`}
                  >
                    <div className={`w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-200 ${form.active ? "translate-x-5" : "translate-x-0"}`} />
                  </button>
                </div>

                {/* Footer actions */}
                <div className="flex gap-3 pt-1">
                  <button
                    onClick={closeModal}
                    className="flex-1 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-sm font-semibold transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmit}
                    className="flex-1 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-xl text-sm font-semibold transition-colors shadow-sm shadow-green-200"
                  >
                    Create Reviewer
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
