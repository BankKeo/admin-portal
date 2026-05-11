import type { Status } from "../types";

export const SC: Record<Status, { bg: string; tx: string; dot: string }> = {
  Submitted: { bg: "bg-violet-100", tx: "text-violet-700", dot: "bg-violet-500" },
  "Under Review": { bg: "bg-blue-100", tx: "text-blue-700", dot: "bg-blue-500" },
  "Revision Required": { bg: "bg-amber-100", tx: "text-amber-700", dot: "bg-amber-500" },
  Accepted: { bg: "bg-green-100", tx: "text-green-700", dot: "bg-green-500" },
  Rejected: { bg: "bg-red-100", tx: "text-red-700", dot: "bg-red-500" },
  Published: { bg: "bg-emerald-100", tx: "text-emerald-700", dot: "bg-emerald-600" },
};

export function StatusBadge({ s }: { s: Status }) {
  const c = SC[s];
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${c.bg} ${c.tx}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${c.dot}`} />
      {s}
    </span>
  );
}

export function PlagBadge({ n }: { n: number }) {
  const [bg, tx, lbl] =
    n >= 20
      ? ["bg-red-100", "text-red-700", "High Risk"]
      : n >= 10
        ? ["bg-amber-100", "text-amber-700", "Medium Risk"]
        : ["bg-green-100", "text-green-700", "Low Risk"];
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold ${bg} ${tx}`}>
      {n}% · {lbl}
    </span>
  );
}

export function Avatar({ name, sz = "w-9 h-9", fs = "text-sm" }: { name: string; sz?: string; fs?: string }) {
  const initials = name
    .split(" ")
    .filter(Boolean)
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  const hue = (name.charCodeAt(0) * 47) % 360;
  return (
    <div
      className={`${sz} rounded-full flex items-center justify-center font-bold ${fs} shrink-0`}
      style={{ background: `hsl(${hue},60%,85%)`, color: `hsl(${hue},60%,30%)` }}
    >
      {initials}
    </div>
  );
}
