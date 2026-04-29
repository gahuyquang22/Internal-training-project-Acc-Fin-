"use client";

import Link from "next/link";
import { useAppData } from "@/components/AppDataProvider";
import { Chart } from "@/components/Chart";
import { DataTable } from "@/components/DataTable";
import { MetricCard } from "@/components/MetricCard";
import { PageHeader } from "@/components/PageHeader";
import { StatusBadge } from "@/components/StatusBadge";
import { getAverageBySkill, getSkillTotal, getTrainingProgress, isReadyForFA } from "@/lib/calculations";
import { skillColumns } from "@/lib/skill-columns";

export default function DashboardPage() {
  const { employees, modules, registrations, skills } = useAppData();
  const readyCount = skills.filter(isReadyForFA).length;
  const readyPercent = employees.length ? Math.round((readyCount / employees.length) * 100) : 0;
  const trainingProgress = getTrainingProgress(registrations);
  const trainingTotal = registrations.length || 1;
  const completedPercent = Math.round((trainingProgress.Completed / trainingTotal) * 100);
  const averages = getAverageBySkill(skills);
  const lowestSkills = [...averages].sort((a, b) => a.average - b.average).slice(0, 3);

  return (
    <>
      <PageHeader
        title="Dashboard"
        description="A compact view of FA readiness, skill gaps, and training movement for the Finance team."
      />

      <section className="grid gap-4 md:grid-cols-4">
        <MetricCard label="Total employees" value={String(employees.length)} note="Across assigned outlets" />
        <MetricCard label="Ready for FA" value={`${readyPercent}%`} note={`${readyCount} employees ready`} />
        <MetricCard label="Training complete" value={`${completedPercent}%`} note={`${trainingProgress.Completed} completions`} />
        <MetricCard label="Active modules" value={String(modules.length)} note="Accounting, F&B, FA" />
      </section>

      <section className="mt-5 grid gap-5 xl:grid-cols-[1fr_420px]">
        <div className="rounded-md border border-line bg-white p-5 shadow-soft">
          <h3 className="text-base font-semibold text-ink">Average Skill Score</h3>
          <div className="mt-4">
            <Chart data={averages.map((item) => ({ label: item.short, value: item.average, max: 5 }))} />
          </div>
        </div>

        <div className="rounded-md border border-line bg-white p-5 shadow-soft">
          <h3 className="text-base font-semibold text-ink">Training Progress</h3>
          <div className="mt-4">
            <Chart
              data={[
                { label: "Completed", value: trainingProgress.Completed, max: trainingTotal },
                { label: "In progress", value: trainingProgress["In progress"], max: trainingTotal },
                { label: "Not started", value: trainingProgress["Not started"], max: trainingTotal },
              ]}
            />
          </div>
        </div>
      </section>

      <section className="mt-5">
        <div className="mb-3 flex items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-semibold text-ink">Readiness Snapshot</h3>
            <p className="text-sm text-slate-600">
              Lowest gaps: {lowestSkills.map((item) => item.label).join(", ")}
            </p>
          </div>
          <Link href="/skills" className="rounded-md bg-ink px-3 py-2 text-sm font-semibold text-white">
            Open matrix
          </Link>
        </div>
        <DataTable>
          <table className="min-w-full text-sm">
            <thead className="bg-panel text-left text-xs uppercase text-slate-500">
              <tr>
                <th className="px-4 py-3 font-semibold">Employee</th>
                <th className="px-4 py-3 font-semibold">Role</th>
                <th className="px-4 py-3 font-semibold">Outlet</th>
                {skillColumns.slice(0, 3).map((column) => (
                  <th key={column.key} className="px-4 py-3 font-semibold">
                    {column.short}
                  </th>
                ))}
                <th className="px-4 py-3 font-semibold">Total</th>
                <th className="px-4 py-3 font-semibold">FA readiness</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {employees.map((employee) => {
                const skill = skills.find((item) => item.employeeId === employee.id)!;
                return (
                  <tr key={employee.id} className="hover:bg-panel/70">
                    <td className="px-4 py-3 font-medium text-ink">
                      <Link href={`/employees/${employee.id}`} className="hover:underline">
                        {employee.name}
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-slate-700">{employee.role}</td>
                    <td className="px-4 py-3 text-slate-700">{employee.outlet}</td>
                    {skillColumns.slice(0, 3).map((column) => (
                      <td key={column.key} className="px-4 py-3 text-slate-700">
                        {skill[column.key]}
                      </td>
                    ))}
                    <td className="px-4 py-3 font-semibold text-ink">{getSkillTotal(skill)}</td>
                    <td className="px-4 py-3">
                      <StatusBadge status={isReadyForFA(skill) ? "Ready" : "Not Ready"} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </DataTable>
      </section>
    </>
  );
}
