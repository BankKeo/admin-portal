import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  Mail,
  Building2,
  Calendar,
  Clock,
  Shield,
  Edit,
  Eye,
  FileText,
  BookOpen,
  CheckCircle,
  AlertCircle,
  XCircle,
  RefreshCw,
  LogIn,
  Settings,
  MessageSquare,
  UserCheck,
  Lock,
  Unlock,
  Trash2,
  TrendingUp,
  Globe,
  Star,
} from "lucide-react";
import type { ActivityType, Role, Status } from "../types";
import { USRS, ARTS, REVS } from "../data/mockData";
import { Avatar, StatusBadge } from "../components/shared";

// ── Role colours & icons ──────────────────────────────────────────────────────
const ROLE_COLOR: Record<Role, string> = {
  Admin: "bg-red-100 text-red-700",
  Editor: "bg-purple-100 text-purple-700",
  Reviewer: "bg-blue-100 text-blue-700",
  Author: "bg-green-100 text-green-700",
};
const ROLE_ICON: Record<Role, React.ElementType> = {
  Admin: Shield,
  Editor: Edit,
  Reviewer: Eye,
  Author: FileText,
};
const ROLE_PERMS: Record<Role, string[]> = {
  Admin: [
    "Manage all users",
    "Configure publication settings",
    "View all articles",
    "Assign reviewers",
    "Publish articles",
    "Access audit logs",
  ],
  Editor: [
    "View all submissions",
    "Assign reviewers",
    "Post editorial comments",
    "Accept / reject articles",
    "Request revisions",
  ],
  Reviewer: ["View assigned articles", "Submit peer-review reports", "Access reviewer portal", "View review history"],
  Author: [
    "Submit new manuscripts",
    "Track submission status",
    "Respond to revision requests",
    "View own articles only",
  ],
};

// ── Activity icon + colour map ────────────────────────────────────────────────
const ACTIVITY_META: Record<ActivityType, { icon: React.ElementType; color: string; bg: string; label: string }> = {
  submission: { icon: FileText, color: "text-blue-600", bg: "bg-blue-100", label: "Submission" },
  revision: { icon: RefreshCw, color: "text-amber-600", bg: "bg-amber-100", label: "Revision" },
  acceptance: { icon: CheckCircle, color: "text-green-600", bg: "bg-green-100", label: "Acceptance" },
  rejection: { icon: XCircle, color: "text-red-600", bg: "bg-red-100", label: "Rejection" },
  publication: { icon: Globe, color: "text-emerald-600", bg: "bg-emerald-100", label: "Publication" },
  review_assigned: { icon: BookOpen, color: "text-purple-600", bg: "bg-purple-100", label: "Assigned" },
  review_completed: { icon: UserCheck, color: "text-teal-600", bg: "bg-teal-100", label: "Review Done" },
  login: { icon: LogIn, color: "text-gray-500", bg: "bg-gray-100", label: "Login" },
  profile_update: { icon: Edit, color: "text-indigo-600", bg: "bg-indigo-100", label: "Profile" },
  comment: { icon: MessageSquare, color: "text-cyan-600", bg: "bg-cyan-100", label: "Comment" },
  settings_change: { icon: Settings, color: "text-orange-600", bg: "bg-orange-100", label: "Settings" },
  account_created: { icon: UserCheck, color: "text-green-600", bg: "bg-green-100", label: "Created" },
};

type ActivityFilter = "All" | "Submissions" | "Reviews" | "Decisions" | "System";
const ACTIVITY_FILTERS: ActivityFilter[] = ["All", "Submissions", "Reviews", "Decisions", "System"];
const ACTIVITY_FILTER_TYPES: Record<ActivityFilter, ActivityType[] | null> = {
  All: null,
  Submissions: ["submission", "revision"],
  Reviews: ["review_assigned", "review_completed"],
  Decisions: ["acceptance", "rejection", "publication"],
  System: ["login", "profile_update", "comment", "settings_change", "account_created"],
};

const PLAG_COLOR = (n: number) =>
  n === 0
    ? "text-gray-400"
    : n <= 15
      ? "text-green-700 bg-green-50"
      : n <= 25
        ? "text-amber-700 bg-amber-50"
        : "text-red-700 bg-red-50";

export default function UserDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [actFilter, setActFilter] = useState<ActivityFilter>("All");

  const user = USRS.find((u) => u.id === id);

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center space-y-3">
        <div className="w-14 h-14 bg-gray-100 rounded-2xl flex items-center justify-center">
          <Eye size={22} className="text-gray-400" />
        </div>
        <p className="text-gray-500 font-medium">User not found</p>
        <p className="text-gray-400 text-sm">No user with ID "{id}" exists in the system.</p>
        <button
          onClick={() => navigate("/users")}
          className="mt-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-xl text-sm font-semibold transition-colors"
        >
          Back to User Management
        </button>
      </div>
    );
  }

  const RoleIcon = ROLE_ICON[user.role];
  const filterTypes = ACTIVITY_FILTER_TYPES[actFilter];
  const filteredActivity = filterTypes ? user.activity.filter((a) => filterTypes.includes(a.type)) : user.activity;

  // Author article stats
  const articleStats = user.submittedArticles ?? [];
  const acceptedCount = articleStats.filter((a) => a.status === "Accepted" || a.status === "Published").length;
  const publishedCount = articleStats.filter((a) => a.status === "Published").length;
  const pendingCount = articleStats.filter((a) =>
    ["Submitted", "Under Review", "Revision Required"].includes(a.status),
  ).length;
  const rejectedCount = articleStats.filter((a) => a.status === "Rejected").length;

  // Reviewer article data (matched by email in REVS)
  const reviewerRecord = user.role === "Reviewer" ? REVS.find((r) => r.email === user.email) : undefined;
  const reviewerArticles = reviewerRecord?.reviews ?? [];
  const revCompleted = reviewerArticles.filter((r) => r.status === "Completed").length;
  const revPending = reviewerArticles.filter((r) => r.status === "Pending").length;
  const revOverdue = reviewerArticles.filter((r) => r.status === "Overdue").length;

  // Editor/Admin handled articles (JES- refs in activity → lookup ARTS)
  const handledArticleIds =
    user.role === "Editor" || user.role === "Admin"
      ? [...new Set(user.activity.filter((a) => a.ref?.startsWith("JES-")).map((a) => a.ref!))]
      : [];
  const handledArticles = handledArticleIds
    .map((aid) => ARTS.find((a) => a.id === aid))
    .filter(Boolean) as (typeof ARTS)[number][];

  const articleCount =
    user.role === "Author"
      ? articleStats.length
      : user.role === "Reviewer"
        ? reviewerArticles.length
        : handledArticles.length;

  const sectionTitle =
    user.role === "Author" ? "Submitted Articles" : user.role === "Reviewer" ? "Review History" : "Handled Articles";

  // Account age in days
  const joinedDays = Math.floor((Date.now() - new Date(user.joined).getTime()) / 86_400_000);

  return (
    <div className="space-y-4">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm">
        <button
          onClick={() => navigate("/users")}
          className="flex items-center gap-1 text-green-600 hover:text-green-700 font-semibold transition-colors"
        >
          <ChevronLeft size={15} /> User Management
        </button>
        <span className="text-gray-300">/</span>
        <span className="text-gray-500 text-xs font-mono">{user.id}</span>
        <span
          className={`ml-auto text-xs px-2.5 py-0.5 rounded-full font-semibold ${user.active ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}
        >
          {user.active ? "Active" : "Inactive"}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* ── Left column ── */}
        <div className="lg:col-span-2 space-y-4">
          {/* Profile card */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <div className="flex items-start gap-4">
              <Avatar name={user.name} sz="w-16 h-16" fs="text-lg" />
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-lg font-bold text-gray-900 leading-tight">{user.name}</h1>
                  <span
                    className={`flex items-center gap-1 text-xs px-2.5 py-0.5 rounded-full font-semibold ${ROLE_COLOR[user.role]}`}
                  >
                    <RoleIcon size={10} /> {user.role}
                  </span>
                </div>
                <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1.5 text-xs text-gray-400">
                  <span className="flex items-center gap-1">
                    <Building2 size={11} /> {user.institution}
                  </span>
                  <span className="flex items-center gap-1">
                    <Mail size={11} /> {user.email}
                  </span>
                </div>
                {user.bio && <p className="text-xs text-gray-500 leading-relaxed mt-2 max-w-xl">{user.bio}</p>}
              </div>
            </div>

            {/* Meta row */}
            <div className="flex flex-wrap gap-4 mt-4 pt-4 border-t border-gray-100 text-xs text-gray-500">
              <span className="flex items-center gap-1">
                <Calendar size={11} className="text-gray-400" />
                Joined {user.joined}
              </span>
              <span className="flex items-center gap-1">
                <Clock size={11} className="text-gray-400" />
                Last active {user.lastActive}
              </span>
              <span className="flex items-center gap-1">
                <UserCheck size={11} className="text-gray-400" />
                Account age: {joinedDays} days
              </span>
              <span className="flex items-center gap-1 font-semibold text-green-700">
                <FileText size={11} />
                {articleCount}{" "}
                {user.role === "Author" ? "submissions" : user.role === "Reviewer" ? "reviews" : "articles handled"}
              </span>
            </div>
          </div>

          {/* Articles section — visible for all roles */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 flex-wrap gap-2">
              <h2 className="text-sm font-bold text-gray-800 flex items-center gap-2">
                <FileText size={15} className="text-green-600" />
                {sectionTitle}
                <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">{articleCount}</span>
              </h2>
              {user.role === "Author" && articleCount > 0 && (
                <div className="flex gap-3 text-xs text-gray-400">
                  <span className="flex items-center gap-1 text-green-600 font-medium">
                    <CheckCircle size={11} /> {acceptedCount} accepted
                  </span>
                  <span className="flex items-center gap-1 text-blue-600 font-medium">
                    <Clock size={11} /> {pendingCount} pending
                  </span>
                  {rejectedCount > 0 && (
                    <span className="flex items-center gap-1 text-red-500 font-medium">
                      <XCircle size={11} /> {rejectedCount} rejected
                    </span>
                  )}
                </div>
              )}
              {user.role === "Reviewer" && articleCount > 0 && (
                <div className="flex gap-3 text-xs text-gray-400">
                  <span className="flex items-center gap-1 text-green-600 font-medium">
                    <CheckCircle size={11} /> {revCompleted} done
                  </span>
                  <span className="flex items-center gap-1 text-blue-600 font-medium">
                    <Clock size={11} /> {revPending} pending
                  </span>
                  {revOverdue > 0 && (
                    <span className="flex items-center gap-1 text-red-500 font-medium">
                      <AlertCircle size={11} /> {revOverdue} overdue
                    </span>
                  )}
                </div>
              )}
            </div>

            {articleCount === 0 ? (
              <div className="text-center py-10 text-gray-400 text-sm">No articles found for this user.</div>
            ) : (
              <div className="divide-y divide-gray-50">
                {/* Author rows */}
                {user.role === "Author" &&
                  articleStats.map((art) => (
                    <div
                      key={art.id}
                      onClick={() => navigate(`/articles/${art.id}`)}
                      className="flex items-center gap-3 px-5 py-3.5 hover:bg-gray-50/70 transition-colors cursor-pointer group"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="text-xs font-mono text-gray-400">{art.id}</span>
                          <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">
                            {art.category}
                          </span>
                        </div>
                        <p className="text-sm font-medium text-gray-800 group-hover:text-green-700 transition-colors leading-snug line-clamp-1">
                          {art.title}
                        </p>
                        <p className="text-xs text-gray-400 mt-0.5 flex items-center gap-1">
                          <Calendar size={10} /> {art.submitted}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <StatusBadge s={art.status as Status} />
                        {art.plagScore > 0 && (
                          <span
                            className={`text-xs px-2 py-0.5 rounded-full font-semibold ${PLAG_COLOR(art.plagScore)}`}
                          >
                            {art.plagScore}%
                          </span>
                        )}
                      </div>
                    </div>
                  ))}

                {/* Reviewer rows */}
                {user.role === "Reviewer" &&
                  reviewerArticles.map((rev) => (
                    <div
                      key={rev.articleId}
                      onClick={() => navigate(`/articles/${rev.articleId}`)}
                      className="flex items-center gap-3 px-5 py-3.5 hover:bg-gray-50/70 transition-colors cursor-pointer group"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="text-xs font-mono text-gray-400">{rev.articleId}</span>
                          <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">
                            {rev.category}
                          </span>
                        </div>
                        <p className="text-sm font-medium text-gray-800 group-hover:text-green-700 transition-colors leading-snug line-clamp-1">
                          {rev.title}
                        </p>
                        <p className="text-xs text-gray-400 mt-0.5">
                          by {rev.author} · Assigned {rev.assignedDate}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
                            rev.status === "Completed"
                              ? "bg-green-100 text-green-700"
                              : rev.status === "Pending"
                                ? "bg-blue-100 text-blue-700"
                                : rev.status === "Overdue"
                                  ? "bg-red-100 text-red-700"
                                  : "bg-gray-100 text-gray-500"
                          }`}
                        >
                          {rev.status}
                        </span>
                        {rev.recommendation && (
                          <span
                            className={`hidden sm:inline text-xs px-2 py-0.5 rounded-full font-semibold ${
                              rev.recommendation === "Accept"
                                ? "bg-green-50 text-green-600"
                                : rev.recommendation === "Minor Revision"
                                  ? "bg-amber-50 text-amber-600"
                                  : rev.recommendation === "Major Revision"
                                    ? "bg-orange-50 text-orange-600"
                                    : "bg-red-50 text-red-600"
                            }`}
                          >
                            {rev.recommendation}
                          </span>
                        )}
                        {rev.rating && (
                          <span className="flex items-center gap-0.5 text-xs text-amber-500 font-semibold">
                            <Star size={11} fill="currentColor" /> {rev.rating}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}

                {/* Editor / Admin rows */}
                {(user.role === "Editor" || user.role === "Admin") &&
                  handledArticles.map((art) => (
                    <div
                      key={art.id}
                      onClick={() => navigate(`/articles/${art.id}`)}
                      className="flex items-center gap-3 px-5 py-3.5 hover:bg-gray-50/70 transition-colors cursor-pointer group"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="text-xs font-mono text-gray-400">{art.id}</span>
                          <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">
                            {art.category}
                          </span>
                        </div>
                        <p className="text-sm font-medium text-gray-800 group-hover:text-green-700 transition-colors leading-snug line-clamp-1">
                          {art.title}
                        </p>
                        <p className="text-xs text-gray-400 mt-0.5 flex items-center gap-1">
                          <Calendar size={10} /> {art.submitted} · by {art.author}
                        </p>
                      </div>
                      <div className="shrink-0">
                        <StatusBadge s={art.status} />
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>

          {/* Activity feed */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 flex-wrap gap-2">
              <h2 className="text-sm font-bold text-gray-800 flex items-center gap-2">
                <TrendingUp size={15} className="text-green-600" />
                Activity History
                <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">
                  {filteredActivity.length}
                </span>
              </h2>
              <div className="flex gap-1 flex-wrap">
                {ACTIVITY_FILTERS.map((f) => (
                  <button
                    key={f}
                    onClick={() => setActFilter(f)}
                    className={`px-2.5 py-1 text-xs rounded-lg font-medium transition-colors ${actFilter === f ? "bg-green-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            {filteredActivity.length === 0 ? (
              <div className="text-center py-10 text-gray-400 text-sm">No activity in this category.</div>
            ) : (
              <div className="p-5">
                <div className="relative">
                  <div className="absolute left-3.75 top-0 bottom-0 w-px bg-gray-100" />
                  <div className="space-y-5">
                    {filteredActivity
                      .slice()
                      .sort((a, b) => b.date.localeCompare(a.date))
                      .map((act, i) => {
                        const meta = ACTIVITY_META[act.type];
                        const Icon = meta.icon;
                        return (
                          <div key={i} className="flex gap-4 pl-0.5">
                            <div
                              className={`shrink-0 w-8 h-8 ${meta.bg} rounded-xl flex items-center justify-center z-10`}
                            >
                              <Icon size={14} className={meta.color} />
                            </div>
                            <div className="flex-1 pb-1">
                              <div className="flex items-start justify-between gap-2">
                                <div>
                                  <span
                                    className={`text-xs font-bold px-2 py-0.5 rounded-full ${meta.bg} ${meta.color} mr-2`}
                                  >
                                    {meta.label}
                                  </span>
                                  <span className="text-sm text-gray-700">{act.description}</span>
                                </div>
                                <span className="text-xs text-gray-400 shrink-0 mt-0.5">{act.date}</span>
                              </div>
                              {act.ref && (
                                <div className="mt-1">
                                  <span className="text-xs font-mono bg-gray-100 text-gray-500 px-2 py-0.5 rounded-lg">
                                    {act.ref}
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ── Right sidebar ── */}
        <div className="space-y-4">
          {/* Account stats */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
            <h3 className="text-sm font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <TrendingUp size={14} className="text-green-600" /> Account Overview
            </h3>
            <div className="space-y-2.5">
              {user.role === "Author" && (
                <>
                  {[
                    { label: "Total Submissions", value: articleStats.length, color: "text-gray-800" },
                    { label: "Published", value: publishedCount, color: "text-emerald-700" },
                    { label: "Under Review", value: pendingCount, color: "text-blue-700" },
                    { label: "Rejected", value: rejectedCount, color: "text-red-600" },
                  ].map(({ label, value, color }) => (
                    <div
                      key={label}
                      className="flex justify-between items-center py-1.5 border-b border-gray-50 last:border-0"
                    >
                      <span className="text-xs text-gray-500">{label}</span>
                      <span className={`text-sm font-bold ${color}`}>{value}</span>
                    </div>
                  ))}
                </>
              )}
              {user.role === "Reviewer" && (
                <>
                  {[
                    { label: "Total Assigned", value: reviewerArticles.length, color: "text-gray-800" },
                    { label: "Reviews Completed", value: revCompleted, color: "text-green-700" },
                    { label: "Pending Reviews", value: revPending, color: "text-blue-700" },
                    { label: "Overdue Reviews", value: revOverdue, color: "text-red-600" },
                  ].map(({ label, value, color }) => (
                    <div
                      key={label}
                      className="flex justify-between items-center py-1.5 border-b border-gray-50 last:border-0"
                    >
                      <span className="text-xs text-gray-500">{label}</span>
                      <span className={`text-sm font-bold ${color}`}>{value}</span>
                    </div>
                  ))}
                </>
              )}
              {(user.role === "Editor" || user.role === "Admin") && (
                <>
                  {[
                    { label: "Articles Handled", value: handledArticles.length, color: "text-gray-800" },
                    {
                      label: "Decisions Made",
                      value: user.activity.filter((a) => ["acceptance", "rejection", "publication"].includes(a.type))
                        .length,
                      color: "text-green-700",
                    },
                    {
                      label: "Reviewers Assigned",
                      value: user.activity.filter((a) => a.type === "review_assigned").length,
                      color: "text-blue-700",
                    },
                    {
                      label: "Comments Posted",
                      value: user.activity.filter((a) => a.type === "comment").length,
                      color: "text-gray-700",
                    },
                  ].map(({ label, value, color }) => (
                    <div
                      key={label}
                      className="flex justify-between items-center py-1.5 border-b border-gray-50 last:border-0"
                    >
                      <span className="text-xs text-gray-500">{label}</span>
                      <span className={`text-sm font-bold ${color}`}>{value}</span>
                    </div>
                  ))}
                </>
              )}
              <div className="flex justify-between items-center pt-1">
                <span className="text-xs text-gray-500">Total Actions</span>
                <span className="text-sm font-bold text-gray-800">{user.activity.length}</span>
              </div>
            </div>
          </div>

          {/* Submission success rate — Authors only */}
          {user.role === "Author" && articleStats.length > 0 && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
              <h3 className="text-sm font-semibold text-gray-800 mb-3">Acceptance Rate</h3>
              <div className="text-2xl font-bold text-green-700 mb-1">
                {Math.round((acceptedCount / articleStats.length) * 100)}%
              </div>
              <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden mb-2">
                <div
                  className="h-full bg-green-500 rounded-full"
                  style={{ width: `${Math.round((acceptedCount / articleStats.length) * 100)}%` }}
                />
              </div>
              <p className="text-xs text-gray-400">
                {acceptedCount} of {articleStats.length} submissions accepted or published
              </p>
            </div>
          )}

          {/* Role & permissions */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
            <h3 className="text-sm font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <Shield size={13} className="text-green-600" /> Role & Permissions
            </h3>
            <div
              className={`inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full font-semibold mb-3 ${ROLE_COLOR[user.role]}`}
            >
              <RoleIcon size={11} /> {user.role}
            </div>
            <ul className="space-y-1.5">
              {ROLE_PERMS[user.role].map((p) => (
                <li key={p} className="flex items-start gap-1.5 text-xs text-gray-600">
                  <CheckCircle size={11} className="text-green-500 shrink-0 mt-0.5" />
                  {p}
                </li>
              ))}
            </ul>
          </div>

          {/* Account security */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
            <h3 className="text-sm font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <Shield size={13} className="text-green-600" /> Account Security
            </h3>
            <div className="space-y-2 text-xs">
              {[
                ["Account ID", user.id],
                ["Email", user.email],
                ["Last Active", user.lastActive],
                ["Member Since", user.joined],
                ["Status", user.active ? "Active" : "Deactivated"],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between items-center py-1.5 border-b border-gray-50 last:border-0">
                  <span className="text-gray-400">{k}</span>
                  <span
                    className={`font-medium ${k === "Status" ? (user.active ? "text-green-700" : "text-gray-400") : "text-gray-700"}`}
                  >
                    {v}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick actions */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 space-y-2">
            <h3 className="text-sm font-semibold text-gray-800 mb-3">Quick Actions</h3>
            <a
              href={`mailto:${user.email}`}
              className="flex items-center justify-center gap-2 w-full py-2 text-xs text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-xl font-medium transition-colors"
            >
              <Mail size={12} /> Send Email
            </a>
            <button className="flex items-center justify-center gap-2 w-full py-2 text-xs text-amber-700 bg-amber-50 hover:bg-amber-100 rounded-xl font-medium transition-colors">
              {user.active ? <Lock size={12} /> : <Unlock size={12} />}
              {user.active ? "Deactivate Account" : "Activate Account"}
            </button>
            <button className="flex items-center justify-center gap-2 w-full py-2 text-xs text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded-xl font-medium transition-colors">
              <Edit size={12} /> Change Role
            </button>
            <button className="flex items-center justify-center gap-2 w-full py-2 text-xs text-red-600 bg-red-50 hover:bg-red-100 rounded-xl font-medium transition-colors">
              <Trash2 size={12} /> Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
