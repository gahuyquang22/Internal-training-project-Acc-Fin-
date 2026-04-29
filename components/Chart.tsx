type ChartDatum = {
  label: string;
  value: number;
  max?: number;
};

type ChartProps = {
  data: ChartDatum[];
  valueSuffix?: string;
};

export function Chart({ data, valueSuffix = "" }: ChartProps) {
  return (
    <div className="space-y-3">
      {data.map((item) => {
        const max = item.max ?? Math.max(...data.map((entry) => entry.value), 1);
        const width = `${Math.min(100, (item.value / max) * 100)}%`;

        return (
          <div key={item.label} className="grid grid-cols-[minmax(120px,180px)_1fr_56px] items-center gap-3">
            <span className="truncate text-sm text-slate-700">{item.label}</span>
            <div className="h-3 overflow-hidden rounded bg-slate-100">
              <div className="h-full rounded bg-moss" style={{ width }} />
            </div>
            <span className="text-right text-sm font-semibold text-ink">
              {item.value.toFixed(item.value % 1 ? 1 : 0)}
              {valueSuffix}
            </span>
          </div>
        );
      })}
    </div>
  );
}
