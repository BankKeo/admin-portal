import { useRef, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Bell, Menu, ChevronRight, X, LogOut, User as UserIcon } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

const PAGE_NAMES: Record<string, string> = {
  "/": "Dashboard",
  "/articles": "Article Management",
  "/plagiarism": "Plagiarism Checker",
  "/reviewers": "Reviewer Management",
  "/users": "User Management",
  "/settings": "Publication Settings",
};

const ROLE_COLOR: Record<string, string> = {
  Admin: "bg-red-100 text-red-700",
  Editor: "bg-purple-100 text-purple-700",
  Reviewer: "bg-blue-100 text-blue-700",
  Author: "bg-green-100 text-green-700",
};

const notifs = [
  { t: "New submission received", d: "JES-2024-005 · 2 min ago", dot: "bg-blue-500" },
  { t: "Review deadline approaching", d: "JES-2024-003 · 1 hr ago", dot: "bg-amber-500" },
  { t: "Article accepted", d: "JES-2024-002 · 3 hrs ago", dot: "bg-green-500" },
];

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function Navbar({ onMenuClick }: { onMenuClick: () => void }) {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const profileRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    function handle(e: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) setProfileOpen(false);
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) setNotifOpen(false);
    }
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, []);

  const pageName = PAGE_NAMES[pathname] ?? PAGE_NAMES[`/${pathname.split("/")[1]}`] ?? "JESAM";

  function handleLogout() {
    logout();
    navigate("/login", { replace: true });
  }

  return (
    <header className="bg-white border-b border-gray-100 px-4 py-3 flex items-center gap-3 shrink-0">
      <button onClick={onMenuClick} className="lg:hidden p-1.5 hover:bg-gray-100 rounded-xl transition-colors">
        <Menu size={18} className="text-gray-600" />
      </button>

      <div className="flex-1 hidden sm:flex items-center gap-2">
        <span className="text-xs text-gray-300">JESAM RER</span>
        <ChevronRight size={12} className="text-gray-300" />
        <span className="text-sm font-semibold text-gray-700">{pageName}</span>
      </div>

      <div className="flex items-center gap-2 ml-auto">
        {/* Notifications */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => {
              setNotifOpen((p) => !p);
              setProfileOpen(false);
            }}
            className="relative p-2 hover:bg-gray-100 rounded-xl transition-colors"
          >
            <Bell size={17} className="text-gray-600" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white" />
          </button>

          {notifOpen && (
            <div className="absolute right-0 top-10 w-72 bg-white rounded-2xl shadow-xl border border-gray-100 z-50 overflow-hidden">
              <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
                <span className="text-sm font-bold text-gray-800">Notifications</span>
                <button onClick={() => setNotifOpen(false)} className="text-gray-400 hover:text-gray-600">
                  <X size={14} />
                </button>
              </div>
              {notifs.map((n, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 px-4 py-3 hover:bg-gray-50 border-b border-gray-50 last:border-0 cursor-pointer"
                >
                  <span className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${n.dot}`} />
                  <div>
                    <div className="text-xs font-semibold text-gray-800">{n.t}</div>
                    <div className="text-xs text-gray-400 mt-0.5">{n.d}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* User avatar + dropdown */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => {
              setProfileOpen((p) => !p);
              setNotifOpen(false);
            }}
            className="flex items-center gap-2 pl-1 pr-2 py-1 hover:bg-gray-100 rounded-xl transition-colors"
          >
            <div className="w-8 h-8 bg-linear-to-br from-green-500 to-emerald-700 rounded-full flex items-center justify-center shadow-sm shadow-green-200">
              <span className="text-xs font-extrabold text-white">
                {currentUser ? initials(currentUser.name) : "?"}
              </span>
            </div>
            {currentUser && (
              <div className="hidden sm:block text-left">
                <p className="text-xs font-semibold text-gray-800 leading-none">
                  {currentUser.name.split(" ").slice(0, 2).join(" ")}
                </p>
                <p className="text-xs text-gray-400 mt-0.5">{currentUser.role}</p>
              </div>
            )}
          </button>

          {profileOpen && (
            <div className="absolute right-0 top-11 w-60 bg-white rounded-2xl shadow-xl border border-gray-100 z-50 overflow-hidden">
              {/* User info */}
              <div className="px-4 py-3.5 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-linear-to-br from-green-500 to-emerald-700 rounded-full flex items-center justify-center shrink-0">
                    <span className="text-xs font-extrabold text-white">
                      {currentUser ? initials(currentUser.name) : "?"}
                    </span>
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-gray-800 truncate">{currentUser?.name}</p>
                    <p className="text-xs text-gray-400 truncate">{currentUser?.email}</p>
                  </div>
                </div>
                {currentUser && (
                  <span
                    className={`inline-block mt-2.5 text-xs px-2.5 py-0.5 rounded-full font-semibold ${ROLE_COLOR[currentUser.role]}`}
                  >
                    {currentUser.role}
                  </span>
                )}
              </div>

              {/* Actions */}
              <div className="p-1.5">
                <button
                  onClick={() => {
                    setProfileOpen(false);
                    currentUser && navigate(`/users/${currentUser.id}`);
                  }}
                  className="flex items-center gap-2.5 w-full px-3 py-2 text-xs text-gray-700 hover:bg-gray-50 rounded-xl transition-colors font-medium"
                >
                  <UserIcon size={13} className="text-gray-400" /> View Profile
                </button>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2.5 w-full px-3 py-2 text-xs text-red-600 hover:bg-red-50 rounded-xl transition-colors font-medium"
                >
                  <LogOut size={13} /> Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
