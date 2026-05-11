import { NavLink } from "react-router-dom";
import { LayoutDashboard, FileText, Shield, Users, UserCog, Settings, Leaf } from "lucide-react";

const nav = [
  { id: "dashboard", path: "/", lbl: "Dashboard", I: LayoutDashboard },
  { id: "articles", path: "/articles", lbl: "Article Management", I: FileText },
  { id: "plagiarism", path: "/plagiarism", lbl: "Plagiarism Checker", I: Shield },
  { id: "reviewers", path: "/reviewers", lbl: "Reviewer Management", I: Users },
  { id: "users", path: "/users", lbl: "User Management", I: UserCog },
  { id: "settings", path: "/settings", lbl: "Publication Settings", I: Settings },
];

export default function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <aside className="w-60 bg-white border-r border-gray-100 flex flex-col h-full">
      <div className="px-4 py-5 border-b border-gray-50">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-700 rounded-2xl flex items-center justify-center shadow-sm shadow-green-300">
            <Leaf size={18} className="text-white" />
          </div>
          <div>
            <div className="font-extrabold text-gray-900 text-sm tracking-tight">JESAM</div>
            <div className="text-xs text-gray-400 leading-tight">Peer Review System</div>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
        <p className="text-xs font-bold text-gray-300 uppercase tracking-widest px-2 py-2">Main Menu</p>
        {nav.map((n) => (
          <NavLink
            key={n.id}
            to={n.path}
            end={n.path === "/"}
            onClick={onNavigate}
            className={({ isActive }) =>
              `w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                isActive
                  ? "bg-green-600 text-white shadow-sm shadow-green-300"
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-800"
              }`
            }
          >
            <n.I size={16} />
            {n.lbl}
          </NavLink>
        ))}
      </nav>

      <div className="p-3 border-t border-gray-100 m-2 bg-green-50 rounded-2xl">
        <div className="flex items-center gap-2.5 px-1">
          <div className="w-9 h-9 bg-green-600 rounded-full flex items-center justify-center shrink-0">
            <span className="text-xs font-extrabold text-white">AD</span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-xs font-bold text-gray-800 truncate">Admin User</div>
            <div className="text-xs text-gray-400 truncate">admin@jesam.edu.ph</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
