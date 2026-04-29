"use client";

type ScoreInputProps = {
  value: number;
  onChange: (value: number) => void;
  label: string;
};

export function ScoreInput({ value, onChange, label }: ScoreInputProps) {
  return (
    <input
      aria-label={label}
      type="number"
      min={1}
      max={5}
      value={value}
      onChange={(event) => onChange(Math.min(5, Math.max(1, Number(event.target.value) || 1)))}
      className="h-8 w-14 rounded border border-line bg-white px-2 text-center text-sm font-medium text-ink outline-none focus:border-moss focus:ring-2 focus:ring-moss/20"
    />
  );
}
