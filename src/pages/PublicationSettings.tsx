import { useState } from "react";
import { BookOpen, Shield, Globe } from "lucide-react";

export default function PublicationSettings() {
  const [toggles, setToggles] = useState({ oa: true, doi: true, idx: false, notif: true });
  const tog = (k: keyof typeof toggles) => setToggles((p) => ({ ...p, [k]: !p[k] }));

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-gray-900">Publication Settings</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Journal Information */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2 text-sm">
            <BookOpen size={15} className="text-green-600" /> Journal Information
          </h3>
          <div className="space-y-3">
            {[
              ["Journal Abbreviation", "JESAM"],
              ["Full Name", "Journal of Environmental Science and Management"],
              ["ISSN (Print)", "0119-1144"],
              ["ISSN (Online)", "2244-5943"],
              ["Publisher", "UPLB College of Forestry and Natural Resources"],
              ["Publication Frequency", "Bi-annual (June & December)"],
              ["Website URL", "https://jesam.uplb.edu.ph"],
            ].map(([l, v]) => (
              <div key={l}>
                <label className="text-xs font-semibold text-gray-400 mb-1 block">{l}</label>
                <input
                  defaultValue={v}
                  className="w-full text-sm border border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-300"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          {/* Review Configuration */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2 text-sm">
              <Shield size={15} className="text-green-600" /> Review Configuration
            </h3>
            <div className="space-y-3">
              {[
                ["Review Type", "Double-blind Peer Review"],
                ["Review Deadline (days)", "30"],
                ["Min. Reviewers per Article", "2"],
                ["Max. Reviewers per Article", "3"],
                ["Plagiarism Threshold (%)", "20"],
              ].map(([l, v]) => (
                <div key={l}>
                  <label className="text-xs font-semibold text-gray-400 mb-1 block">{l}</label>
                  <input
                    defaultValue={v}
                    className="w-full text-sm border border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-300"
                  />
                </div>
              ))}
              <div>
                <label className="text-xs font-semibold text-gray-400 mb-1 block">Review Workflow</label>
                <select className="w-full text-sm border border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-300">
                  <option>Standard (Submit → Screen → Review → Decision)</option>
                  <option>Express (Submit → Decision)</option>
                  <option>Extended (Submit → Screen → Review → Revision → Decision)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Access & Visibility */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2 text-sm">
              <Globe size={15} className="text-green-600" /> Access & Visibility
            </h3>
            <div className="space-y-3">
              {[
                ["oa", "Open Access (Free to Read)"],
                ["doi", "Automatic DOI Assignment"],
                ["idx", "Scopus/WoS Indexing Feed"],
                ["notif", "Author Email Notifications"],
              ].map(([k, lbl]) => (
                <label key={k} className="flex items-center justify-between cursor-pointer group py-1">
                  <span className="text-sm text-gray-700 group-hover:text-gray-900 transition-colors">{lbl}</span>
                  <button
                    onClick={() => tog(k as keyof typeof toggles)}
                    className={`w-11 h-6 rounded-full flex items-center transition-colors px-0.5 ${toggles[k as keyof typeof toggles] ? "bg-green-600" : "bg-gray-200"}`}
                  >
                    <div
                      className={`w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-200 ${toggles[k as keyof typeof toggles] ? "translate-x-5" : "translate-x-0"}`}
                    />
                  </button>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <button className="px-5 py-2 bg-green-600 hover:bg-green-700 text-white rounded-xl text-sm font-semibold transition-colors shadow-sm shadow-green-200">
          Save Changes
        </button>
        <button className="px-5 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-sm font-semibold transition-colors">
          Reset to Defaults
        </button>
      </div>
    </div>
  );
}
