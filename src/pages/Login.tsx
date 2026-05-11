import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Leaf, Lock, Mail, ArrowRight, BookOpen } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

const DEMO_ACCOUNTS = [
  { label: "Admin",    email: "admin@jesam.edu.ph"    },
  { label: "Editor",   email: "c.lim@ust.edu.ph"      },
  { label: "Reviewer", email: "e.reyes@uplb.edu.ph"   },
  { label: "Author",   email: "m.santos@uplb.edu.ph"  },
];

export default function Login() {
  const { login } = useAuth();
  const navigate   = useNavigate();

  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [showPw,   setShowPw]   = useState(false);
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [pwErr,    setPwErr]    = useState("");

  function validate() {
    let ok = true;
    if (!email.trim()) {
      setEmailErr("Email is required"); ok = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailErr("Enter a valid email address"); ok = false;
    } else {
      setEmailErr("");
    }
    if (!password) {
      setPwErr("Password is required"); ok = false;
    } else {
      setPwErr("");
    }
    return ok;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!validate()) return;

    setLoading(true);
    await new Promise((r) => setTimeout(r, 700)); // mock network delay

    const ok = login(email, password);
    setLoading(false);

    if (ok) {
      navigate("/", { replace: true });
    } else {
      setError("No account found with that email. Use a demo account below.");
    }
  }

  function fillDemo(demoEmail: string) {
    setEmail(demoEmail);
    setPassword("password123");
    setError(""); setEmailErr(""); setPwErr("");
  }

  return (
    <div className="min-h-screen flex" style={{ fontFamily: "'Inter',system-ui,sans-serif" }}>

      {/* ── Left branding panel ── */}
      <div className="hidden lg:flex lg:w-2/5 xl:w-1/2 flex-col justify-between bg-gradient-to-br from-green-700 via-green-800 to-emerald-900 p-12 relative overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-white/5" />
        <div className="absolute -bottom-32 -right-20 w-96 h-96 rounded-full bg-white/5" />
        <div className="absolute top-1/2 right-8 w-40 h-40 rounded-full bg-green-600/30" />

        {/* Logo */}
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-white/10 rounded-2xl flex items-center justify-center">
              <Leaf size={22} className="text-green-300" />
            </div>
            <span className="text-white font-extrabold text-xl tracking-tight">JESAM</span>
          </div>
          <p className="text-green-300 text-xs font-medium mt-1 ml-[52px]">Journal of Environmental Science and Management</p>
        </div>

        {/* Center content */}
        <div className="relative z-10 space-y-6">
          <div>
            <h1 className="text-white text-4xl font-extrabold leading-tight">
              Peer Review &<br />
              <span className="text-green-300">Article Approval</span><br />
              System
            </h1>
            <p className="text-green-200 text-sm mt-4 leading-relaxed max-w-xs">
              Manage manuscript submissions, coordinate peer reviews, and oversee the editorial workflow for JESAM publications.
            </p>
          </div>

          {/* Feature bullets */}
          <div className="space-y-3">
            {[
              "AI-powered article summary & plagiarism detection",
              "Multi-stage peer review workflow management",
              "Real-time submission tracking & analytics",
            ].map((f) => (
              <div key={f} className="flex items-start gap-2.5">
                <div className="w-5 h-5 rounded-full bg-green-500/30 flex items-center justify-center shrink-0 mt-0.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-300" />
                </div>
                <span className="text-green-100 text-xs leading-relaxed">{f}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div className="relative z-10">
          <div className="flex items-center gap-2 text-green-400 text-xs">
            <BookOpen size={13} />
            <span>University of the Philippines System · JESAM RER v2024</span>
          </div>
        </div>
      </div>

      {/* ── Right form panel ── */}
      <div className="flex-1 flex items-center justify-center bg-gray-50 p-6">
        <div className="w-full max-w-md">

          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <div className="w-8 h-8 bg-green-600 rounded-xl flex items-center justify-center">
              <Leaf size={16} className="text-white" />
            </div>
            <span className="text-gray-800 font-extrabold text-lg">JESAM RER</span>
          </div>

          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
            <div className="mb-7">
              <h2 className="text-2xl font-extrabold text-gray-900">Welcome back</h2>
              <p className="text-gray-500 text-sm mt-1">Sign in to access the editorial system</p>
            </div>

            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              {/* Email */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">Email address</label>
                <div className="relative">
                  <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setEmailErr(""); setError(""); }}
                    placeholder="you@institution.edu.ph"
                    className={`w-full pl-10 pr-4 py-2.5 text-sm border rounded-xl outline-none transition-all
                      ${emailErr ? "border-red-400 focus:ring-2 focus:ring-red-200" : "border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-100"}`}
                  />
                </div>
                {emailErr && <p className="mt-1 text-xs text-red-500">{emailErr}</p>}
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">Password</label>
                <div className="relative">
                  <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type={showPw ? "text" : "password"}
                    value={password}
                    onChange={(e) => { setPassword(e.target.value); setPwErr(""); setError(""); }}
                    placeholder="••••••••"
                    className={`w-full pl-10 pr-10 py-2.5 text-sm border rounded-xl outline-none transition-all
                      ${pwErr ? "border-red-400 focus:ring-2 focus:ring-red-200" : "border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-100"}`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPw((p) => !p)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
                {pwErr && <p className="mt-1 text-xs text-red-500">{pwErr}</p>}
              </div>

              {/* Global error */}
              {error && (
                <div className="px-3.5 py-2.5 bg-red-50 border border-red-200 rounded-xl text-xs text-red-600">
                  {error}
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 py-2.5 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white text-sm font-semibold rounded-xl transition-colors mt-2"
              >
                {loading ? (
                  <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                  </svg>
                ) : (
                  <>Sign In <ArrowRight size={15} /></>
                )}
              </button>
            </form>

            {/* Demo accounts */}
            <div className="mt-6 pt-5 border-t border-gray-100">
              <p className="text-xs text-gray-400 font-medium mb-3">Demo accounts (any password)</p>
              <div className="grid grid-cols-2 gap-2">
                {DEMO_ACCOUNTS.map(({ label, email: demoEmail }) => (
                  <button
                    key={label}
                    onClick={() => fillDemo(demoEmail)}
                    className="text-left px-3 py-2 bg-gray-50 hover:bg-green-50 hover:border-green-200 border border-gray-100 rounded-xl transition-colors"
                  >
                    <span className="block text-xs font-semibold text-gray-700">{label}</span>
                    <span className="block text-xs text-gray-400 truncate">{demoEmail}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <p className="text-center text-xs text-gray-400 mt-6">
            JESAM Peer Review & Article Approval System · UP System
          </p>
        </div>
      </div>
    </div>
  );
}
