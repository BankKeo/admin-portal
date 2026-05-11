import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ChevronLeft, Mail, Building2, Star, BookOpen, CheckCircle,
  Clock, AlertCircle, XCircle, Users, TrendingUp, Award,
} from "lucide-react";
import type { ReviewStatus, Recommendation } from "../types";
import { REVS } from "../data/mockData";
import { Avatar } from "../components/shared";

type StatusFilter = "All" | ReviewStatus;

const STATUS_FILTERS: StatusFilter[] = ["All", "Pending", "Completed", "Overdue", "Declined"];

const STATUS_META: Record<ReviewStatus, { label: string; color: string; icon: React.ElementType }> = {
  Pending:   { label: "Pending",   color: "bg-blue-50 text-blue-700",    icon: Clock       },
  Completed: { label: "Completed", color: "bg-green-50 text-green-700",  icon: CheckCircle },
  Overdue:   { label: "Overdue",   color: "bg-red-50 text-red-700",      icon: AlertCircle },
  Declined:  { label: "Declined",  color: "bg-gray-100 text-gray-500",   icon: XCircle     },
};

const REC_META: Record<Recommendation, string> = {
  "Accept":         "bg-green-100 text-green-700",
  "Minor Revision": "bg-amber-50 text-amber-700",
  "Major Revision": "bg-orange-50 text-orange-700",
  "Reject":         "bg-red-50 text-red-700",
};

function StarRating({ value, max = 5 }: { value: number; max?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: max }).map((_, i) => (
        <Star
          key={i}
          size={12}
          className={i < Math.round(value) ? "text-amber-400 fill-amber-400" : "text-gray-200 fill-gray-200"}
        />
      ))}
      <span className="text-xs text-gray-500 ml-1 font-medium">{value}</span>
    </div>
  );
}

export default function ReviewerDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("All");

  const reviewer = REVS.find((r) => r.id === id);

  if (!reviewer) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center space-y-3">
        <div className="w-14 h-14 bg-gray-100 rounded-2xl flex items-center justify-center">
          <Users size={22} className="text-gray-400" />
        </div>
        <p className="text-gray-500 font-medium">Reviewer not found</p>
        <p className="text-gray-400 text-sm">The reviewer ID "{id}" does not exist.</p>
        <button
          onClick={() => navigate("/reviewers")}
          className="mt-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-xl text-sm font-semibold transition-colors"
        >
          Back to Reviewers
        </button>
      </div>
    );
  }

  const { reviews } = reviewer;
  const filtered = statusFilter === "All" ? reviews : reviews.filter((r) => r.status === statusFilter);

  const completedReviews = reviews.filter((r) => r.status === "Completed");
  const pendingReviews   = reviews.filter((r) => r.status === "Pending");
  const overdueReviews   = reviews.filter((r) => r.status === "Overdue");
  const total = reviews.length;
  const completionRate = total > 0 ? Math.round((completedReviews.length / total) * 100) : 0;
  const avgGivenRating =
    completedReviews.filter((r) => r.rating).length > 0
      ? (completedReviews.reduce((s, r) => s + (r.rating ?? 0), 0) / completedReviews.filter((r) => r.rating).length).toFixed(1)
      : "—";

  const recCounts = completedReviews.reduce<Record<string, number>>((acc, r) => {
    if (r.recommendation) acc[r.recommendation] = (acc[r.recommendation] ?? 0) + 1;
    return acc;
  }, {});

  return (
    <div className="space-y-4">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm">
        <button
          onClick={() => navigate("/reviewers")}
          className="flex items-center gap-1 text-green-600 hover:text-green-700 font-semibold transition-colors"
        >
          <ChevronLeft size={15} /> Reviewer Management
        </button>
        <span className="text-gray-300">/</span>
        <span className="text-gray-500 text-xs font-mono">{reviewer.id}</span>
        <span
          className={`ml-auto text-xs px-2.5 py-0.5 rounded-full font-semibold ${reviewer.active ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}
        >
          {reviewer.active ? "Active" : "Inactive"}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* ── Left column ── */}
        <div className="lg:col-span-2 space-y-4">

          {/* Profile header card */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <div className="flex items-start gap-4">
              <Avatar name={reviewer.name} sz="w-14 h-14" fs="text-base" />
              <div className="flex-1 min-w-0">
                <h1 className="text-lg font-bold text-gray-900 leading-tight">{reviewer.name}</h1>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1 text-sm text-gray-500">
                  <span className="flex items-center gap-1 text-xs">
                    <Building2 size={11} /> {reviewer.institution}
                  </span>
                  <span className="text-gray-200 hidden sm:inline">·</span>
                  <span className="flex items-center gap-1 text-xs">
                    <Mail size={11} /> {reviewer.email}
                  </span>
                </div>
                <div className="mt-2">
                  <StarRating value={reviewer.rating} />
                </div>
              </div>
            </div>

            {/* Expertise tags */}
            <div className="flex flex-wrap gap-1.5 mt-4 pt-4 border-t border-gray-100">
              {reviewer.expertise.map((e) => (
                <span key={e} className="text-xs bg-blue-50 text-blue-700 px-2.5 py-0.5 rounded-full font-medium">
                  {e}
                </span>
              ))}
            </div>

            {/* Quick stat strip */}
            <div className="grid grid-cols-4 gap-2 mt-4">
              {[
                { label: "Total Reviews", value: total, color: "text-gray-800" },
                { label: "Completed",     value: completedReviews.length, color: "text-green-700" },
                { label: "Pending",       value: pendingReviews.length,   color: "text-blue-700" },
                { label: "Overdue",       value: overdueReviews.length,   color: "text-red-600" },
              ].map(({ label, value, color }) => (
                <div key={label} className="text-center bg-gray-50 rounded-xl py-2.5">
                  <div className={`text-xl font-bold ${color}`}>{value}</div>
                  <div className="text-xs text-gray-400 mt-0.5">{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Review history */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <h2 className="text-sm font-bold text-gray-800 flex items-center gap-2">
                <BookOpen size={15} className="text-green-600" />
                Review History
                <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full font-medium">
                  {filtered.length}
                </span>
              </h2>
              {/* Status filters */}
              <div className="flex gap-1 flex-wrap">
                {STATUS_FILTERS.map((f) => (
                  <button
                    key={f}
                    onClick={() => setStatusFilter(f)}
                    className={`px-2.5 py-1 text-xs rounded-lg font-medium transition-colors ${statusFilter === f ? "bg-green-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            {filtered.length === 0 ? (
              <div className="text-center py-10 text-gray-400 text-sm">
                No reviews with status "{statusFilter}".
              </div>
            ) : (
              <div className="divide-y divide-gray-50">
                {filtered
                  .slice()
                  .sort((a, b) => b.assignedDate.localeCompare(a.assignedDate))
                  .map((rev) => {
                    const sm = STATUS_META[rev.status];
                    const StatusIcon = sm.icon;
                    return (
                      <div key={rev.articleId + rev.assignedDate} className="px-5 py-4 hover:bg-gray-50/60 transition-colors">
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap mb-1">
                              <span className="text-xs font-mono text-gray-400">{rev.articleId}</span>
                              <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                                {rev.category}
                              </span>
                            </div>
                            <p className="text-sm font-semibold text-gray-800 leading-snug line-clamp-2">
                              {rev.title}
                            </p>
                            <p className="text-xs text-gray-400 mt-0.5">by {rev.author}</p>
                          </div>
                          <span className={`flex items-center gap-1 text-xs px-2.5 py-1 rounded-full font-semibold shrink-0 ${sm.color}`}>
                            <StatusIcon size={10} />
                            {sm.label}
                          </span>
                        </div>

                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2.5 text-xs text-gray-400">
                          <span className="flex items-center gap-1">
                            <Clock size={10} /> Assigned {rev.assignedDate}
                          </span>
                          <span className="flex items-center gap-1">
                            Due {rev.dueDate}
                          </span>
                          {rev.completedDate && (
                            <span className="flex items-center gap-1 text-green-600">
                              <CheckCircle size={10} /> Submitted {rev.completedDate}
                            </span>
                          )}
                        </div>

                        {(rev.recommendation || rev.rating) && (
                          <div className="flex items-center gap-2 mt-2.5">
                            {rev.recommendation && (
                              <span className={`text-xs px-2.5 py-0.5 rounded-full font-semibold ${REC_META[rev.recommendation]}`}>
                                {rev.recommendation}
                              </span>
                            )}
                            {rev.rating !== undefined && (
                              <div className="flex items-center gap-0.5 ml-auto">
                                {Array.from({ length: 5 }).map((_, i) => (
                                  <Star
                                    key={i}
                                    size={11}
                                    className={i < rev.rating! ? "text-amber-400 fill-amber-400" : "text-gray-200 fill-gray-200"}
                                  />
                                ))}
                                <span className="text-xs text-gray-400 ml-1">{rev.rating}/5</span>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
              </div>
            )}
          </div>
        </div>

        {/* ── Right sidebar ── */}
        <div className="space-y-4">
          {/* Performance metrics */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
            <h3 className="text-sm font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <TrendingUp size={14} className="text-green-600" /> Performance
            </h3>
            <div className="space-y-4">
              {/* Completion rate */}
              <div>
                <div className="flex justify-between text-xs text-gray-500 mb-1.5">
                  <span>Completion Rate</span>
                  <span className="font-bold text-gray-700">{completionRate}%</span>
                </div>
                <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${completionRate >= 70 ? "bg-green-500" : completionRate >= 40 ? "bg-amber-400" : "bg-red-400"}`}
                    style={{ width: `${completionRate}%` }}
                  />
                </div>
              </div>

              {/* Avg rating given */}
              <div className="flex items-center justify-between py-2 border-t border-gray-50">
                <span className="text-xs text-gray-500">Reviewer Score</span>
                <StarRating value={reviewer.rating} />
              </div>

              {/* Avg quality rating given to articles */}
              <div className="flex items-center justify-between py-2 border-t border-gray-50">
                <span className="text-xs text-gray-500">Avg. Article Rating Given</span>
                <span className="text-sm font-bold text-gray-700">{avgGivenRating}</span>
              </div>

              {/* Active/completed split */}
              <div className="flex items-center justify-between py-2 border-t border-gray-50">
                <span className="text-xs text-gray-500">Overdue Reviews</span>
                <span className={`text-sm font-bold ${overdueReviews.length > 0 ? "text-red-600" : "text-gray-700"}`}>
                  {overdueReviews.length}
                </span>
              </div>
            </div>
          </div>

          {/* Recommendation breakdown */}
          {completedReviews.length > 0 && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
              <h3 className="text-sm font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <Award size={14} className="text-green-600" /> Recommendations
              </h3>
              <div className="space-y-2">
                {(["Accept", "Minor Revision", "Major Revision", "Reject"] as Recommendation[]).map((rec) => {
                  const count = recCounts[rec] ?? 0;
                  const pct = completedReviews.length > 0 ? Math.round((count / completedReviews.length) * 100) : 0;
                  return (
                    <div key={rec}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className={`px-2 py-0.5 rounded-full font-medium ${REC_META[rec]}`}>{rec}</span>
                        <span className="text-gray-500 font-medium">{count} ({pct}%)</span>
                      </div>
                      <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${rec === "Accept" ? "bg-green-500" : rec === "Minor Revision" ? "bg-amber-400" : rec === "Major Revision" ? "bg-orange-400" : "bg-red-400"}`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Expertise coverage */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
            <h3 className="text-sm font-semibold text-gray-800 mb-3">Expertise Areas</h3>
            <div className="space-y-1.5">
              {reviewer.expertise.map((exp) => {
                const count = reviews.filter((r) => r.category === exp || r.category.toLowerCase().includes(exp.toLowerCase())).length;
                return (
                  <div key={exp} className="flex items-center justify-between">
                    <span className="text-xs bg-blue-50 text-blue-700 px-2.5 py-0.5 rounded-full font-medium">{exp}</span>
                    <span className="text-xs text-gray-400">{count} article{count !== 1 ? "s" : ""}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick actions */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 space-y-2">
            <h3 className="text-sm font-semibold text-gray-800 mb-3">Quick Actions</h3>
            <a
              href={`mailto:${reviewer.email}`}
              className="flex items-center justify-center gap-2 w-full py-2 text-xs text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-xl font-medium transition-colors"
            >
              <Mail size={12} /> Contact Reviewer
            </a>
            <button className="flex items-center justify-center gap-2 w-full py-2 text-xs text-green-700 bg-green-50 hover:bg-green-600 hover:text-white rounded-xl font-medium transition-colors">
              <BookOpen size={12} /> Assign New Article
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
