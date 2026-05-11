import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Eye, Plus } from "lucide-react";
import type { Status } from "../types";
import { ARTS } from "../data/mockData";
import { StatusBadge, PlagBadge } from "../components/shared";

// ── Article List ──────────────────────────────────────────────────────────────
function ArticleList() {
  const navigate = useNavigate();
  const [q, setQ] = useState("");
  const [f, setF] = useState<Status | "All">("All");
  const statuses: (Status | "All")[] = [
    "All", "Submitted", "Under Review", "Revision Required", "Accepted", "Rejected", "Published",
  ];
  const rows = ARTS.filter(
    (a) => (f === "All" || a.status === f) && (a.title + a.author + a.id).toLowerCase().includes(q.toLowerCase()),
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Article Management</h1>
        <button
          onClick={() => navigate("/articles/new")}
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors shadow-sm shadow-green-200"
        >
          <Plus size={15} /> Submit Article
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-3.5 space-y-3">
        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search title, author, article ID…"
            className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-300"
          />
        </div>
        <div className="flex gap-1.5 flex-wrap">
          {statuses.map((s) => (
            <button
              key={s}
              onClick={() => setF(s)}
              className={`px-3 py-1.5 text-xs rounded-xl font-medium transition-colors ${f === s ? "bg-green-600 text-white shadow-sm" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Article</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider hidden md:table-cell">Category</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Status</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider hidden lg:table-cell">Plagiarism</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider hidden lg:table-cell">Submitted</th>
                <th className="px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {rows.map((a) => (
                <tr key={a.id} className="hover:bg-gray-50/70 transition-colors">
                  <td className="px-5 py-3.5">
                    <div className="font-medium text-gray-900 text-xs leading-tight max-w-xs line-clamp-2">{a.title}</div>
                    <div className="text-xs text-gray-400 mt-0.5 font-mono">{a.id} · {a.author}</div>
                  </td>
                  <td className="px-4 py-3.5 hidden md:table-cell">
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{a.category}</span>
                  </td>
                  <td className="px-4 py-3.5"><StatusBadge s={a.status} /></td>
                  <td className="px-4 py-3.5 hidden lg:table-cell"><PlagBadge n={a.plagScore} /></td>
                  <td className="px-4 py-3.5 hidden lg:table-cell text-xs text-gray-500">{a.submitted}</td>
                  <td className="px-4 py-3.5">
                    <button
                      onClick={() => navigate(`/articles/${a.id}`)}
                      className="flex items-center gap-1 text-xs text-green-600 hover:text-green-700 font-semibold bg-green-50 hover:bg-green-100 px-2.5 py-1.5 rounded-lg transition-colors"
                    >
                      <Eye size={11} /> View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {!rows.length && (
            <div className="text-center py-12 text-gray-400 text-sm">No articles match your search.</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ArticleManagement() {
  return <ArticleList />;
}
