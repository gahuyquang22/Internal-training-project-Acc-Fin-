"use client";

import { useAppData } from "@/components/AppDataProvider";
import { PageHeader } from "@/components/PageHeader";
import type { Registration, TrainingCategory, TrainingModule } from "@/lib/types";

const categories: TrainingCategory[] = ["Accounting", "F&B Specialized", "Finance & Analysis"];

function getCompletedCount(moduleId: string, registrations: Registration[]) {
  return registrations.filter((item) => item.moduleId === moduleId && item.status === "Completed").length;
}

function LevelBadge({ level }: { level: TrainingModule["level"] }) {
  const styles = {
    Foundation: "bg-slate-100 text-slate-700 ring-slate-200",
    Core: "bg-emerald-50 text-emerald-700 ring-emerald-200",
    Advanced: "bg-amber-50 text-amber-700 ring-amber-200",
  };

  return <span className={`rounded px-2 py-1 text-xs font-semibold ring-1 ${styles[level]}`}>{level}</span>;
}

function ModuleRow({
  module,
  totalEmployees,
  completed,
}: {
  module: TrainingModule;
  totalEmployees: number;
  completed: number;
}) {
  const percent = totalEmployees ? Math.round((completed / totalEmployees) * 100) : 0;
  const isCore = module.level === "Core";

  return (
    <li className={`ml-4 border-l pl-4 ${isCore ? "border-moss" : "border-line"}`}>
      <div className={`rounded-md border p-4 ${isCore ? "border-emerald-200 bg-emerald-50/45" : "border-line bg-white"}`}>
        <div className="grid gap-3 md:grid-cols-[1fr_120px_160px] md:items-center">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <span className="truncate text-sm font-semibold text-ink">{module.name}</span>
              <LevelBadge level={module.level} />
            </div>
            <p className="mt-1 text-xs text-slate-500">{module.category}</p>
          </div>

          <div className="text-sm text-slate-700">
            <span className="font-semibold text-ink">{completed}</span> / {totalEmployees} completed
          </div>

          <div>
            <div className="flex items-center justify-between text-xs text-slate-600">
              <span>Progress</span>
              <span className="font-semibold text-ink">{percent}%</span>
            </div>
            <div className="mt-2 h-2 overflow-hidden rounded bg-slate-200">
              <div className="h-full rounded bg-moss" style={{ width: `${percent}%` }} />
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}

export default function ModulesPage() {
  const { employees, modules, registrations } = useAppData();

  return (
    <>
      <PageHeader
        title="Training Modules"
        description="Tree view of all training modules grouped by category, with completion progress by employee count."
      />

      <section className="space-y-3">
        {categories.map((category) => {
          const categoryModules = modules.filter((module) => module.category === category);
          const completedModules = categoryModules.filter((module) => getCompletedCount(module.id, registrations) > 0).length;

          return (
            <details key={category} open className="group rounded-md border border-line bg-white shadow-soft">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-3 hover:bg-panel">
                <div className="flex min-w-0 items-center gap-3">
                  <span className="grid h-6 w-6 place-items-center rounded border border-line bg-panel text-xs text-slate-600 group-open:rotate-90">
                    &gt;
                  </span>
                  <div className="min-w-0">
                    <h3 className="truncate text-base font-semibold text-ink">{category}</h3>
                    <p className="text-xs text-slate-500">
                      {categoryModules.length} modules · {completedModules} with completions
                    </p>
                  </div>
                </div>
                <span className="rounded bg-panel px-2 py-1 text-xs font-semibold text-slate-600">
                  {categoryModules.filter((module) => module.level === "Core").length} Core
                </span>
              </summary>

              <ul className="space-y-3 border-t border-line px-4 py-4">
                {categoryModules.map((module) => (
                  <ModuleRow
                    key={module.id}
                    module={module}
                    totalEmployees={employees.length}
                    completed={getCompletedCount(module.id, registrations)}
                  />
                ))}
              </ul>
            </details>
          );
        })}
      </section>
    </>
  );
}
