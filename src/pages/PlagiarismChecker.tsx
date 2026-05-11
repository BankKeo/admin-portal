import { useState } from "react";
import { Shield, Upload, RefreshCw, Download, AlertTriangle } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { ARTS } from "../data/mockData";
import { PlagBadge } from "../components/shared";

export default function PlagiarismChecker() {
  const [done, setDone] = useState(false);
  const [running, setRunning] = useState(false);
  const score = 14;

  const sources = [
    { src: "Journal of Aquatic Science, 2022", pct: 4, url: "jas.org/vol12/2022/038" },
    { src: "Environmental Research Letters, 2021", pct: 3, url: "erl.iop.org/2021/19/7" },
    { src: "Marine Pollution Bulletin, 2023", pct: 3, url: "mpb.elsevier.com/2023/185" },
    { src: "DENR Technical Report, 2020", pct: 2, url: "denr.gov.ph/reports/2020" },
    { src: "UP Diliman Thesis Repository, 2019", pct: 2, url: "ir.upd.edu.ph/2019/ms312" },
  ];

  const run = () => {
    setRunning(true);
    setTimeout(() => {
      setRunning(false);
      setDone(true);
    }, 2800);
  };

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-gray-900">Plagiarism Checker</h1>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        {/* Upload panel */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2 text-sm">
              <Shield size={15} className="text-green-600" /> Check Manuscript
            </h3>
            <div className="border-2 border-dashed border-gray-200 hover:border-green-400 rounded-xl p-6 text-center cursor-pointer transition-colors group">
              <Upload size={28} className="text-gray-300 group-hover:text-green-400 mx-auto mb-2 transition-colors" />
              <p className="text-sm text-gray-500 font-medium">Drop manuscript here</p>
              <p className="text-xs text-gray-400 mt-1">PDF, DOCX up to 50MB</p>
            </div>
            <div className="mt-4">
              <p className="text-xs font-semibold text-gray-500 mb-2">Or select existing article:</p>
              <div className="space-y-1.5">
                {ARTS.slice(0, 4).map((a) => (
                  <label
                    key={a.id}
                    className="flex items-center gap-2 text-xs text-gray-600 cursor-pointer hover:text-green-700 p-1.5 rounded-lg hover:bg-green-50 transition-colors"
                  >
                    <input type="radio" name="art" className="accent-green-600 shrink-0" />
                    <span className="truncate">{a.title.substring(0, 48)}…</span>
                  </label>
                ))}
              </div>
            </div>
            <button
              onClick={run}
              disabled={running}
              className="mt-4 w-full py-2.5 bg-green-600 hover:bg-green-700 disabled:opacity-60 text-white rounded-xl text-sm font-semibold transition-colors flex items-center justify-center gap-2 shadow-sm shadow-green-200"
            >
              {running ? (
                <>
                  <RefreshCw size={14} className="animate-spin" /> Analyzing…
                </>
              ) : (
                <>
                  <Shield size={14} /> Run Plagiarism Check
                </>
              )}
            </button>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <h3 className="font-semibold text-gray-800 mb-3 text-sm">Previous Checks</h3>
            <div className="space-y-2">
              {ARTS.filter((a) => a.plagScore > 0).map((a) => (
                <div key={a.id} className="flex items-center gap-2">
                  <div className="flex-1 min-w-0">
                    <div className="text-xs text-gray-600 truncate">{a.title.substring(0, 38)}…</div>
                    <div className="text-xs text-gray-400 font-mono">{a.id}</div>
                  </div>
                  <PlagBadge n={a.plagScore} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Report panel */}
        <div className="lg:col-span-3">
          {!done && !running && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-12 text-center">
              <Shield size={44} className="text-gray-100 mx-auto mb-3" />
              <p className="text-gray-400 text-sm">Upload a manuscript and run a check to see the similarity report.</p>
            </div>
          )}

          {running && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-12 text-center">
              <RefreshCw size={40} className="text-green-500 animate-spin mx-auto mb-4" />
              <p className="text-gray-700 text-sm font-semibold">Analyzing manuscript…</p>
              <p className="text-gray-400 text-xs mt-1">Comparing against 50M+ academic sources</p>
              <div className="mt-4 mx-auto max-w-xs bg-gray-100 rounded-full h-1.5 overflow-hidden">
                <div className="h-full bg-green-500 rounded-full animate-pulse" style={{ width: "65%" }} />
              </div>
            </div>
          )}

          {done && (
            <div className="space-y-4">
              {/* Score card */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                <div className="flex items-center gap-5">
                  <div className="relative w-28 h-28 shrink-0">
                    <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                      <circle cx="50" cy="50" r="40" fill="none" stroke="#f3f4f6" strokeWidth="10" />
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="none"
                        stroke="#f59e0b"
                        strokeWidth="10"
                        strokeDasharray={`${score * 2.51} ${251 - score * 2.51}`}
                        strokeLinecap="round"
                        className="transition-all duration-1000"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-2xl font-bold text-gray-900">{score}%</span>
                      <span className="text-xs text-gray-400">Similar</span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900">Similarity Report</h3>
                    <span className="inline-flex items-center gap-1.5 mt-1.5 text-sm font-semibold bg-amber-50 text-amber-700 px-3 py-1 rounded-full">
                      ⚠ Medium Risk — Below 20% threshold
                    </span>
                    <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                      {score}% similarity detected across {sources.length} sources.
                    </p>
                    <div className="flex gap-3 mt-3">
                      {[
                        { v: "6%", l: "Quoted", col: "text-red-600", bg: "bg-red-50" },
                        { v: "8%", l: "Paraphrased", col: "text-amber-600", bg: "bg-amber-50" },
                        { v: `${100 - score}%`, l: "Original", col: "text-green-600", bg: "bg-green-50" },
                      ].map(({ v, l, col, bg }) => (
                        <div key={l} className={`flex-1 text-center py-1.5 rounded-xl ${bg}`}>
                          <div className={`text-base font-bold ${col}`}>{v}</div>
                          <div className="text-xs text-gray-500 mt-0.5">{l}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Source BarChart */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                <h3 className="font-semibold text-gray-800 mb-4 text-sm">Matched Sources Breakdown</h3>
                <ResponsiveContainer width="100%" height={160}>
                  <BarChart
                    data={sources.map((s) => ({ src: s.src.replace(/, \d{4}$/, "").substring(0, 28), pct: s.pct }))}
                    layout="vertical"
                    margin={{ top: 0, right: 30, bottom: 0, left: 8 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" horizontal={false} />
                    <XAxis
                      type="number"
                      domain={[0, 6]}
                      tick={{ fontSize: 10, fill: "#9ca3af" }}
                      axisLine={false}
                      tickLine={false}
                      unit="%"
                    />
                    <YAxis
                      type="category"
                      dataKey="src"
                      tick={{ fontSize: 9, fill: "#6b7280" }}
                      axisLine={false}
                      tickLine={false}
                      width={130}
                    />
                    <Tooltip
                      contentStyle={{ borderRadius: "10px", fontSize: 12 }}
                      formatter={(value: number | string | readonly (number | string)[] | undefined) => {
                        let label: string = "";
                        if (typeof value === "number") label = `${value}%`;
                        else if (typeof value === "string") label = value;
                        else if (Array.isArray(value)) label = value.join(", ");
                        return [label, "Match"] as [string, string];
                      }}
                    />
                    <Bar dataKey="pct" name="Match %" fill="#f59e0b" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
                <button className="mt-3 w-full py-2 border border-green-600 text-green-600 rounded-xl text-sm font-semibold hover:bg-green-50 transition-colors flex items-center justify-center gap-2">
                  <Download size={14} /> Download Full Report
                </button>
              </div>

              {/* Flagged sections */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                <h3 className="font-semibold text-gray-800 mb-4 text-sm flex items-center gap-2">
                  <AlertTriangle size={15} className="text-amber-500" /> Flagged Sections
                </h3>
                <div className="space-y-3">
                  {[
                    {
                      text: "Microplastic contamination has been documented in freshwater ecosystems across multiple regions, with particularly high concentrations found near urban centers and industrial zones.",
                      source: "Journal of Aquatic Science, 2022, Vol. 12, p. 038",
                      match: 4,
                    },
                    {
                      text: "The GIS mapping techniques employed in this study follow established protocols for environmental monitoring, enabling spatial analysis across diverse geographic scales.",
                      source: "Environmental Research Letters, 2021, 19(7), 074023",
                      match: 3,
                    },
                    {
                      text: "Spectroscopic analysis confirmed the presence of polyethylene and polypropylene fragments as the dominant microplastic types, consistent with prior studies in adjacent river basins.",
                      source: "Marine Pollution Bulletin, 2023, Vol. 185",
                      match: 3,
                    },
                  ].map((f, i) => (
                    <div key={i} className="p-3 bg-amber-50/60 border border-amber-100 rounded-xl">
                      <p className="text-xs text-gray-700 leading-relaxed italic">&ldquo;{f.text}&rdquo;</p>
                      <div className="flex items-center justify-between mt-2 gap-2">
                        <span className="text-xs text-amber-700 font-medium truncate">Source: {f.source}</span>
                        <span className="text-xs bg-amber-200 text-amber-800 px-2 py-0.5 rounded-full font-bold shrink-0">
                          {f.match}% match
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
