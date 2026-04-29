import type { Employee, Registration, Simulation, SkillRecord, TrainingModule } from "./types";

export const employees: Employee[] = [
  { id: "e-001", name: "Linh Tran", role: "Junior Accountant", outlet: "District 1 Bistro" },
  { id: "e-002", name: "Minh Pham", role: "Senior Accountant", outlet: "Saigon Central" },
  { id: "e-003", name: "An Nguyen", role: "GA", outlet: "Thao Dien Cafe" },
  { id: "e-004", name: "Khoa Le", role: "FA", outlet: "Airport Kiosk" },
  { id: "e-005", name: "Mai Hoang", role: "Senior Accountant", outlet: "Riverside Kitchen" },
  { id: "e-006", name: "Huy Vo", role: "Junior Accountant", outlet: "Ben Thanh Express" },
];

export const skills: SkillRecord[] = [
  { employeeId: "e-001", fs: 2, variance: 2, business: 3, communication: 2, excel: 3, problemSolving: 2 },
  { employeeId: "e-002", fs: 4, variance: 3, business: 3, communication: 3, excel: 4, problemSolving: 3 },
  { employeeId: "e-003", fs: 3, variance: 2, business: 4, communication: 3, excel: 3, problemSolving: 3 },
  { employeeId: "e-004", fs: 4, variance: 4, business: 4, communication: 4, excel: 5, problemSolving: 4 },
  { employeeId: "e-005", fs: 3, variance: 3, business: 2, communication: 3, excel: 4, problemSolving: 3 },
  { employeeId: "e-006", fs: 2, variance: 3, business: 2, communication: 2, excel: 3, problemSolving: 2 },
];

export const modules: TrainingModule[] = [
  { id: "m-acc-01", name: "Accounting Foundation", category: "Accounting", level: "Foundation" },
  { id: "m-acc-02", name: "R2R", category: "Accounting", level: "Core" },
  { id: "m-acc-03", name: "P2P", category: "Accounting", level: "Core" },
  { id: "m-acc-04", name: "O2C", category: "Accounting", level: "Core" },
  { id: "m-acc-05", name: "FS & Management Reporting", category: "Accounting", level: "Advanced" },
  { id: "m-acc-06", name: "Inventory & COGS", category: "Accounting", level: "Core" },
  { id: "m-acc-07", name: "Internal Control", category: "Accounting", level: "Core" },
  { id: "m-acc-08", name: "Tax", category: "Accounting", level: "Core" },
  { id: "m-fnb-01", name: "Store Operation & Cost Drivers", category: "F&B Specialized", level: "Foundation" },
  { id: "m-fnb-02", name: "Inventory Optimization", category: "F&B Specialized", level: "Core" },
  { id: "m-fnb-03", name: "COGS & Cost Control", category: "F&B Specialized", level: "Core" },
  { id: "m-fnb-04", name: "Waste Management", category: "F&B Specialized", level: "Core" },
  { id: "m-fnb-05", name: "Menu Engineering", category: "F&B Specialized", level: "Advanced" },
  { id: "m-fnb-06", name: "Outlet P&L", category: "F&B Specialized", level: "Advanced" },
  { id: "m-fnb-07", name: "Variance to Action", category: "F&B Specialized", level: "Advanced" },
  { id: "m-fa-01", name: "Budgeting & Forecasting", category: "Finance & Analysis", level: "Core" },
  { id: "m-fa-02", name: "Variance Analysis", category: "Finance & Analysis", level: "Core" },
  { id: "m-fa-03", name: "Cash Flow Management", category: "Finance & Analysis", level: "Core" },
  { id: "m-fa-04", name: "Business Partnering", category: "Finance & Analysis", level: "Advanced" },
  { id: "m-fa-05", name: "Financial Modeling", category: "Finance & Analysis", level: "Advanced" },
  { id: "m-fa-06", name: "Performance Management", category: "Finance & Analysis", level: "Advanced" },
];

export const registrations: Registration[] = [
  { employeeId: "e-001", moduleId: "m-acc-01", status: "Completed" },
  { employeeId: "e-001", moduleId: "m-fnb-01", status: "In progress" },
  { employeeId: "e-002", moduleId: "m-fa-02", status: "Completed" },
  { employeeId: "e-002", moduleId: "m-fa-04", status: "In progress" },
  { employeeId: "e-003", moduleId: "m-fnb-06", status: "Not started" },
  { employeeId: "e-004", moduleId: "m-fa-05", status: "Completed" },
  { employeeId: "e-005", moduleId: "m-fnb-03", status: "In progress" },
  { employeeId: "e-006", moduleId: "m-acc-06", status: "Not started" },
];

export const simulations: Simulation[] = [
  {
    employeeId: "e-001",
    outlet: "District 1 Bistro",
    sales: 418000000,
    cogsPercent: 34.2,
    waste: 11900000,
    pnl: 58400000,
    issue: "High dairy COGS versus budget",
    rootCause: "Promo drinks used more cream than recipe standard",
    action: "Review recipe card and retrain bar team on portioning",
    feedback: "Good operational link. Add target savings next time.",
  },
  {
    employeeId: "e-002",
    outlet: "Saigon Central",
    sales: 582000000,
    cogsPercent: 31.8,
    waste: 8200000,
    pnl: 94600000,
    issue: "Labor efficiency slipped during weekdays",
    rootCause: "Roster not adjusted after traffic pattern changed",
    action: "Move one prep shift from Tuesday to Friday peak",
    feedback: "Clear action and measurable owner.",
  },
  {
    employeeId: "e-003",
    outlet: "Thao Dien Cafe",
    sales: 376000000,
    cogsPercent: 36.5,
    waste: 15200000,
    pnl: 39100000,
    issue: "Waste above outlet benchmark",
    rootCause: "Overproduction of bakery items",
    action: "Reduce par for slow SKUs and review sell-through daily",
    feedback: "",
  },
];
