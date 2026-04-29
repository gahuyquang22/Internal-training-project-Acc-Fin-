type MetricCardProps = {
  label: string;
  value: string;
  note?: string;
};

export function MetricCard({ label, value, note }: MetricCardProps) {
  return (
    <div className="rounded-md border border-line bg-white p-4 shadow-soft">
      <p className="text-sm font-medium text-slate-500">{label}</p>
      <p className="mt-2 text-3xl font-semibold text-ink">{value}</p>
      {note ? <p className="mt-1 text-sm text-slate-600">{note}</p> : null}
    </div>
  );
}
