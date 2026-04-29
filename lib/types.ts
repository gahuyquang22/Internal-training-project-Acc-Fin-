export type Role = "Junior Accountant" | "Senior Accountant" | "GA" | "FA";

export type Employee = {
  id: string;
  name: string;
  role: Role;
  outlet: string;
};

export type SkillKey = "fs" | "variance" | "business" | "communication" | "excel" | "problemSolving";

export type SkillRecord = Record<SkillKey, number> & {
  employeeId: string;
};

export type TrainingCategory = "Accounting" | "F&B Specialized" | "Finance & Analysis";

export type TrainingModule = {
  id: string;
  name: string;
  category: TrainingCategory;
  level: "Foundation" | "Core" | "Advanced";
};

export type RegistrationStatus = "Not started" | "In progress" | "Completed";

export type Registration = {
  employeeId: string;
  moduleId: string;
  status: RegistrationStatus;
};

export type Simulation = {
  employeeId: string;
  outlet: string;
  sales: number;
  cogsPercent: number;
  waste: number;
  pnl: number;
  issue: string;
  rootCause: string;
  action: string;
  feedback: string;
};
