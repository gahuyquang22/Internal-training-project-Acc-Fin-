import { skillColumns } from "./skill-columns";
import type { Registration, RegistrationStatus, SkillRecord, TrainingModule } from "./types";

export function getSkillTotal(skill: SkillRecord) {
  return skillColumns.reduce((total, column) => total + skill[column.key], 0);
}

export function isReadyForFA(skill: SkillRecord) {
  return skillColumns.every((column) => skill[column.key] >= 3);
}

export function getAverageBySkill(skills: SkillRecord[]) {
  return skillColumns.map((column) => ({
    ...column,
    average: skills.reduce((sum, skill) => sum + skill[column.key], 0) / skills.length,
  }));
}

export function getSuggestedTraining(skill: SkillRecord, modules: TrainingModule[]) {
  const lowest = [...skillColumns].sort((a, b) => skill[a.key] - skill[b.key])[0];
  const moduleMap: Record<string, string[]> = {
    fs: ["FS & Management Reporting", "Accounting Foundation"],
    variance: ["Variance Analysis", "Variance to Action"],
    business: ["Store Operation & Cost Drivers", "Outlet P&L"],
    communication: ["Business Partnering", "Performance Management"],
    excel: ["Financial Modeling", "Budgeting & Forecasting"],
    problemSolving: ["Variance to Action", "Inventory Optimization"],
  };
  return modules.find((module) => moduleMap[lowest.key].includes(module.name)) ?? modules[0];
}

export function getTrainingProgress(items: Registration[]) {
  const counts: Record<RegistrationStatus, number> = {
    "Not started": 0,
    "In progress": 0,
    Completed: 0,
  };

  items.forEach((item) => {
    counts[item.status] += 1;
  });

  return counts;
}

export function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(value);
}
