import { useState, type ElementType } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search, Plus, Mail, BookOpen, Lock, Unlock, Trash2,
  Shield, Edit, Eye, FileText, CheckCircle, X,
} from "lucide-react";
import type { Role, User } from "../types";
import { USRS } from "../data/mockData";
import { Avatar } from "../components/shared";

const RC: Record<Role, string> = {
  Admin: "bg-red-100 text-red-700",
  Editor: "bg-purple-100 text-purple-700",
  Reviewer: "bg-blue-100 text-blue-700",
  Author: "bg-green-100 text-green-700",
};

const roleOptions: { role: Role; desc: string; I: ElementType }[] = [
  { role: "Admin", desc: "Full system access", I: Shield },
  { role: "Editor", desc: "Manage articles & reviews", I: Edit },
  { role: "Reviewer", desc: "Review assigned articles", I: Eye },
  { role: "Author", desc: "Submit & track articles", I: FileText },
];

const ROLES: (Role | "All")[] = ["All", "Admin", "Editor", "Reviewer", "Author"];

export default function UserManagement() {
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>(USRS);
  const [q, setQ] = useState("");
  const [rf, setRf] = useState<Role | "All">("All");
  const [sf, setSf] = useState<"All" | "Active" | "Inactive">("All");
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    name: "", email: "", institution: "", password: "", role: "Author" as Role, active: true,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState(false);

  const rows = users.filter(
    (u) =>
      (rf === "All" || u.role === rf) &&
      (sf === "All" || (sf === "Active" ? u.active : !u.active)) &&
      u.name.toLowerCase().includes(q.toLowerCase()),
  );

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Full name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Invalid email format";
    if (!form.institution.trim()) e.institution = "Institution is required";
    if (!form.password) e.password = "Password is required";
    else if (form.password.length < 8) e.password = "Minimum 8 characters";
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length > 0) { setErrors(e); return; }
    const today = new Date().toISOString().split("T")[0];
    const newUser: User = {
      id: `U${String(users.length + 1).padStart(3, "0")}`,
      name: form.name,
      institution: form.institution,
      email: form.email,
      role: form.role,
      active: form.active,
      joined: today,
      lastActive: today,
      articles: 0,
      activity: [{ date: today, type: "account_created", description: "Account created by administrator" }],
    };
    setUsers([newUser, ...users]);
    setSuccess(true);
    setTimeout(() => {
      setShowModal(false);
      setSuccess(false);
      setForm({ name: "", email: "", institution: "", password: "", role: "Author", active: true });
      setErrors({});
    }, 2000);
  };

  const closeModal = () => {
    setShowModal(false);
    setForm({ name: "", email: "", institution: "", password: "", role: "Author", active: true });
    setErrors({});
    setSuccess(false);
  };

  const handleField = (field: string, value: string) => {
    setForm((p) => ({ ...p, [field]: value }));
    if (errors[field]) setErrors((p) => { const n = { ...p }; delete n[field]; return n; });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors shadow-sm shadow-green-200"
        >
          <Plus size={15} /> Add User
        </button>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <div
          className="bg-white rounded-2xl border border-gray-100 shadow-sm p-3 text-center hover:shadow-md transition-shadow cursor-pointer"
          onClick={() => { setRf("All"); setSf("All"); }}
        >
          <div className="text-2xl font-bold text-gray-900">{users.length}</div>
          <span className="text-xs px-2 py-0.5 rounded-full font-semibold bg-gray-100 text-gray-600">Total Users</span>
        </div>
        {(["Admin", "Editor", "Reviewer", "Author"] as Role[]).map((r) => (
          <div
            key={r}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm p-3 text-center hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => setRf(r)}
          >
            <div className="text-2xl font-bold text-gray-900">{users.filter((u) => u.role === r).length}</div>
            <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${RC[r]}`}>{r}s</span>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
        {/* Filters */}
        <div className="p-3.5 border-b border-gray-100 flex flex-col sm:flex-row gap-2">
          <div className="relative flex-1">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search users…"
              className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-300"
            />
          </div>
          <div className="flex gap-1.5 flex-wrap">
            {ROLES.map((r) => (
              <button
                key={r}
                onClick={() => setRf(r)}
                className={`px-3 py-1.5 text-xs rounded-xl font-medium transition-colors ${rf === r ? "bg-green-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
              >
                {r}
              </button>
            ))}
            <div className="w-px bg-gray-200 self-stretch mx-0.5" />
            {(["All", "Active", "Inactive"] as const).map((s) => (
              <button
                key={s}
                onClick={() => setSf(s)}
                className={`px-3 py-1.5 text-xs rounded-xl font-medium transition-colors ${sf === s ? "bg-gray-700 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="divide-y divide-gray-50">
          {rows.map((u) => (
            <div key={u.id} className="flex items-center gap-3 px-5 py-3.5 hover:bg-gray-50/70 transition-colors">
              <Avatar name={u.name} sz="w-10 h-10" fs="text-sm" />
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold text-gray-900">{u.name}</div>
                <div className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
                  <Mail size={10} /> {u.email}
                </div>
              </div>
              <div className="hidden sm:flex items-center gap-1 text-xs text-gray-400">
                <BookOpen size={11} /> {u.articles} articles
              </div>
              <div className="hidden sm:block text-xs text-gray-400">Joined {u.joined}</div>
              <div className="flex items-center gap-2 shrink-0">
                <select
                  value={u.role}
                  onChange={(e) =>
                    setUsers((prev) => prev.map((x) => x.id === u.id ? { ...x, role: e.target.value as Role } : x))
                  }
                  className={`text-xs px-2 py-0.5 rounded-full font-semibold border-0 outline-none cursor-pointer ${RC[u.role]}`}
                >
                  {(["Admin", "Editor", "Reviewer", "Author"] as Role[]).map((r) => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${u.active ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-400"}`}>
                  {u.active ? "Active" : "Inactive"}
                </span>
                <div className="flex gap-1">
                  <button
                    onClick={() => navigate(`/users/${u.id}`)}
                    className="p-1.5 hover:bg-green-50 rounded-lg"
                    title="View Profile"
                  >
                    <Eye size={13} className="text-green-600" />
                  </button>
                  <button
                    onClick={() => setUsers((prev) => prev.map((x) => x.id === u.id ? { ...x, active: !x.active } : x))}
                    className="p-1.5 hover:bg-amber-50 rounded-lg"
                    title={u.active ? "Deactivate" : "Activate"}
                  >
                    {u.active ? <Lock size={13} className="text-amber-500" /> : <Unlock size={13} className="text-green-500" />}
                  </button>
                  <button className="p-1.5 hover:bg-red-50 rounded-lg" title="Remove">
                    <Trash2 size={13} className="text-red-400" />
                  </button>
                </div>
              </div>
            </div>
          ))}
          {rows.length === 0 && (
            <div className="text-center py-10 text-gray-400 text-sm">No users match your search.</div>
          )}
        </div>
      </div>

      {/* Add User Modal */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <div>
                <h2 className="text-base font-bold text-gray-900">Add New User</h2>
                <p className="text-xs text-gray-400 mt-0.5">Fill in the details to create a new account</p>
              </div>
              <button onClick={closeModal} className="p-1.5 hover:bg-gray-100 rounded-xl transition-colors">
                <X size={16} className="text-gray-400" />
              </button>
            </div>

            {success ? (
              <div className="p-10 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle size={32} className="text-green-600" />
                </div>
                <h3 className="text-base font-bold text-gray-900">User Created!</h3>
                <p className="text-sm text-gray-400 mt-1">The new user has been added to the system.</p>
              </div>
            ) : (
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-gray-500 block mb-1">Full Name *</label>
                    <input
                      value={form.name}
                      onChange={(e) => handleField("name", e.target.value)}
                      placeholder="Dr. Maria Santos"
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
                      placeholder="user@university.edu.ph"
                      className={`w-full text-sm border rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-300 ${errors.email ? "border-red-400 bg-red-50" : "border-gray-200"}`}
                    />
                    {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                  </div>
                </div>

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

                <div>
                  <label className="text-xs font-semibold text-gray-500 block mb-1">Temporary Password *</label>
                  <input
                    type="password"
                    value={form.password}
                    onChange={(e) => handleField("password", e.target.value)}
                    placeholder="Min. 8 characters"
                    className={`w-full text-sm border rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-300 ${errors.password ? "border-red-400 bg-red-50" : "border-gray-200"}`}
                  />
                  {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password}</p>}
                </div>

                {/* Role selector — visual cards */}
                <div>
                  <label className="text-xs font-semibold text-gray-500 block mb-2">Assign Role *</label>
                  <div className="grid grid-cols-2 gap-2">
                    {roleOptions.map(({ role, desc, I }) => (
                      <button
                        key={role}
                        type="button"
                        onClick={() => setForm((p) => ({ ...p, role }))}
                        className={`flex items-start gap-2.5 p-3 rounded-xl border-2 text-left transition-all ${form.role === role ? "border-green-500 bg-green-50" : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"}`}
                      >
                        <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${form.role === role ? "bg-green-100" : "bg-gray-100"}`}>
                          <I size={13} className={form.role === role ? "text-green-600" : "text-gray-500"} />
                        </div>
                        <div>
                          <div className={`text-xs font-bold ${form.role === role ? "text-green-700" : "text-gray-700"}`}>{role}</div>
                          <div className="text-xs text-gray-400 leading-tight mt-0.5">{desc}</div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Active toggle */}
                <div className="flex items-center justify-between py-2 border-t border-gray-100">
                  <div>
                    <div className="text-sm font-semibold text-gray-700">Set as Active</div>
                    <div className="text-xs text-gray-400">User can immediately log in</div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setForm((p) => ({ ...p, active: !p.active }))}
                    className={`w-11 h-6 rounded-full flex items-center transition-colors px-0.5 ${form.active ? "bg-green-600" : "bg-gray-200"}`}
                  >
                    <div className={`w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-200 ${form.active ? "translate-x-5" : "translate-x-0"}`} />
                  </button>
                </div>

                <div className="flex gap-3 pt-1">
                  <button onClick={closeModal} className="flex-1 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-sm font-semibold transition-colors">
                    Cancel
                  </button>
                  <button onClick={handleSubmit} className="flex-1 py-2.5 bg-green-600 hover:bg-green-700 text-white rounded-xl text-sm font-semibold transition-colors shadow-sm shadow-green-200">
                    Create User
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
