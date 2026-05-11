import { useNavigate } from "react-router-dom";
import {
  FileText, Clock, TrendingUp, CheckCircle, Users, Activity,
  Download, ChevronRight, Leaf,
} from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, Legend,
} from "recharts";
import { ARTS, trendData, pieData, catData } from "../data/mockData";
import { StatusBadge } from "../components/shared";

export default function Dashboard() {
  const navigate = useNavigate();

  const stats = [
    { lbl: "Total Articles", val: "45", Icon: FileText, ch: "+12%", up: true, ic: "text-green-600", bg: "bg-green-50" },
    { lbl: "Under Review", val: "8", Icon: Clock, ch: "+2 this week", up: true, ic: "text-blue-600", bg: "bg-blue-50" },
    { lbl: "Accepted", val: "3", Icon: TrendingUp, ch: "+1 this month", up: true, ic: "text-teal-600", bg: "bg-teal-50" },
    { lbl: "Published", val: "4", Icon: CheckCircle, ch: "+1 this month", up: true, ic: "text-emerald-600", bg: "bg-emerald-50" },
    { lbl: "Active Reviewers", val: "5", Icon: Users, ch: "Stable", up: null, ic: "text-purple-600", bg: "bg-purple-50" },
    { lbl: "Avg. Review Time", val: "12d", Icon: Activity, ch: "−2d vs last mo.", up: true, ic: "text-orange-600", bg: "bg-orange-50" },
  ];

  return (
    <div className="space-y-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
          <p className="text-sm text-gray-400 mt-0.5">
            Welcome back, Administrator ·{" "}
            {new Date().toLocaleDateString("en-PH", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
        <button className="shrink-0 flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors shadow-sm shadow-green-200">
          <Download size={15} /> Export Report
        </button>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {stats.map((s) => (
          <div
            key={s.lbl}
            className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all cursor-default"
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 ${s.bg} rounded-xl flex items-center justify-center`}>
                <s.Icon size={19} className={s.ic} />
              </div>
              <span
                className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                  s.up === true ? "bg-green-50 text-green-600" : s.up === false ? "bg-red-50 text-red-600" : "bg-gray-50 text-gray-400"
                }`}
              >
                {s.ch}
              </span>
            </div>
            <div className="text-2xl font-bold text-gray-900">{s.val}</div>
            <div className="text-xs text-gray-400 mt-0.5">{s.lbl}</div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-800">Submission & Publication Trend</h3>
            <span className="text-xs text-gray-400 bg-gray-50 px-2 py-1 rounded-lg">Last 6 months</span>
          </div>
          <ResponsiveContainer width="100%" height={195}>
            <AreaChart data={trendData} margin={{ top: 5, right: 5, bottom: 0, left: -20 }}>
              <defs>
                <linearGradient id="gS" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#16a34a" stopOpacity={0.18} />
                  <stop offset="95%" stopColor="#16a34a" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gP" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.18} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="m" tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: "12px", border: "1px solid #e5e7eb", fontSize: 12, boxShadow: "0 4px 12px #0001" }} />
              <Area type="monotone" dataKey="sub" stroke="#16a34a" strokeWidth={2.5} fill="url(#gS)" name="Submissions" dot={{ r: 3, fill: "#16a34a" }} />
              <Area type="monotone" dataKey="pub" stroke="#3b82f6" strokeWidth={2.5} fill="url(#gP)" name="Published" dot={{ r: 3, fill: "#3b82f6" }} />
              <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 11, paddingTop: 8 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <h3 className="font-semibold text-gray-800 mb-3">Status Distribution</h3>
          <ResponsiveContainer width="100%" height={150}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" innerRadius={42} outerRadius={65} dataKey="v" paddingAngle={3}>
                {pieData.map((e, i) => <Cell key={i} fill={e.c} />)}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: "10px", fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-1.5 mt-2">
            {pieData.map((s) => (
              <div key={s.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full" style={{ background: s.c }} />
                  <span className="text-gray-500">{s.name}</span>
                </div>
                <span className="font-semibold text-gray-700">{s.v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between px-5 py-3.5 border-b border-gray-50">
            <h3 className="font-semibold text-gray-800">Recent Submissions</h3>
            <button
              onClick={() => navigate("/articles")}
              className="text-xs text-green-600 hover:text-green-700 font-semibold flex items-center gap-0.5"
            >
              View All <ChevronRight size={13} />
            </button>
          </div>
          <div className="divide-y divide-gray-50">
            {ARTS.slice(0, 4).map((a) => (
              <div
                key={a.id}
                className="flex items-center gap-3 px-5 py-3 hover:bg-gray-50 transition-colors cursor-pointer"
                onClick={() => navigate(`/articles/${a.id}`)}
              >
                <div className="w-8 h-8 bg-green-100 rounded-xl flex items-center justify-center shrink-0">
                  <Leaf size={13} className="text-green-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-gray-800 truncate">{a.title}</div>
                  <div className="text-xs text-gray-400 mt-0.5">
                    {a.author} · {a.submitted}
                  </div>
                </div>
                <div className="shrink-0">
                  <StatusBadge s={a.status} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <h3 className="font-semibold text-gray-800 mb-3">Articles by Category</h3>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={catData} margin={{ top: 0, right: 0, bottom: 0, left: -25 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" horizontal vertical={false} />
              <XAxis dataKey="cat" tick={{ fontSize: 10, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: "10px", fontSize: 12 }} />
              <Bar dataKey="n" name="Articles" fill="#16a34a" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
