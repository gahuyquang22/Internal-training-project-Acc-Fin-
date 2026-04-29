import { employees, modules, registrations, simulations, skills } from "./mock-data";
import type { Employee, Registration, Simulation, SkillRecord, TrainingModule } from "./types";

export type AppData = {
  employees: Employee[];
  skills: SkillRecord[];
  modules: TrainingModule[];
  registrations: Registration[];
  simulations: Simulation[];
};

const STORAGE_KEY = "finance-training-matrix-data";

export const defaultData: AppData = {
  employees,
  skills,
  modules,
  registrations,
  simulations,
};

function cloneData(data: AppData): AppData {
  return JSON.parse(JSON.stringify(data)) as AppData;
}

export function getData(): AppData {
  if (typeof window === "undefined") {
    return cloneData(defaultData);
  }

  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    const seeded = cloneData(defaultData);
    setData(seeded);
    return seeded;
  }

  try {
    return JSON.parse(stored) as AppData;
  } catch {
    const seeded = cloneData(defaultData);
    setData(seeded);
    return seeded;
  }
}

export function setData(data: AppData) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function clearData() {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.removeItem(STORAGE_KEY);
}
