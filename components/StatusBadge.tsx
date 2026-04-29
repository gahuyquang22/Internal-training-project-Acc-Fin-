import type { RegistrationStatus } from "@/lib/types";

type StatusBadgeProps = {
  status: RegistrationStatus | "Ready" | "Not Ready";
};

const styles: Record<StatusBadgeProps["status"], string> = {
  Ready: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  "Not Ready": "bg-rose-50 text-rose-700 ring-rose-200",
  Completed: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  "In progress": "bg-amber-50 text-amber-700 ring-amber-200",
  "Not started": "bg-slate-100 text-slate-700 ring-slate-200",
};

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span className={`inline-flex whitespace-nowrap rounded px-2 py-1 text-xs font-semibold ring-1 ${styles[status]}`}>
      {status}
    </span>
  );
}
