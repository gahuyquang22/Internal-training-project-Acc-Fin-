import type { SkillKey } from "./types";

export const skillColumns: Array<{ key: SkillKey; label: string; short: string }> = [
  { key: "fs", label: "Financial Statement Understanding", short: "FS" },
  { key: "variance", label: "Variance Analysis", short: "Variance" },
  { key: "business", label: "Business Understanding (F&B)", short: "Business" },
  { key: "communication", label: "Communication / Business Partnering", short: "Comms" },
  { key: "excel", label: "Excel / Data", short: "Excel" },
  { key: "problemSolving", label: "Problem Solving", short: "Problem" },
];
