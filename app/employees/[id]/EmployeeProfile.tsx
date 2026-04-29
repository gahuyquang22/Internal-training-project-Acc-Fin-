"use client";

import Link from "next/link";
import { useAppData } from "@/components/AppDataProvider";
import { DataTable } from "@/components/DataTable";
import { PageHeader } from "@/components/PageHeader";
import { StatusBadge } from "@/components/StatusBadge";
import { getSkillTotal, getSuggestedTraining, isReadyForFA } from "@/lib/calculations";
import { skillColumns } from "@/lib/skill-columns";

export function EmployeeProfile({ employeeId }: { employeeId: string }) {
  const { employees, modules, registrations, skills } = useAppData();
  const employee = employees.find((item) => item.id === employeeId);
  const skill = skills.find((item) => item.employeeId === employeeId);

  if (!employee || !skill) {
    return (
      <PageHeader
        title="Employee not found"
        description="This employee does not exist in the current local data set."
        action={
          <Link href="/dashboard" className="rounded-md bg-ink px-3 py-2 text-sm font-semibold text-white">
            Back to dashboard
          </Link>
        }
      />
    );
  }

  const history = registrations
    .filter((item) => item.employeeId === employee.id)
    .map((item) => ({ ...item, module: modules.find((module) => module.id === item.moduleId) }))
    .filter((item) => item.module);
  const suggested = getSuggestedTraining(skill, modules);

  return (
    <>
      <PageHeader
        title={employee.name}
        description={`${employee.role} assigned to ${employee.outlet}. Skill score ${getSkillTotal(skill)} out of 30.`}
        action={
          <Link href="/skills" className="rounded-md bg-ink px-3 py-2 text-sm font-semibold text-white">
            Edit scores
          </Link>
        }
      />

      <section className="grid gap-5 lg:grid-cols-[320px_1fr]">
        <div className="rounded-md border border-line bg-white p-5 shadow-soft">
          <h3 className="text-base font-semibold text-ink">Profile</h3>
          <dl className="mt-4 space-y-3 text-sm">
            <div>
              <dt className="font-medium text-slate-500">Role</dt>
              <dd className="mt-1 text-ink">{employee.role}</dd>
            </div>
            <div>
              <dt className="font-medium text-slate-500">Outlet</dt>
              <dd className="mt-1 text-ink">{employee.outlet}</dd>
            </div>
            <div>
              <dt className="font-medium text-slate-500">FA readiness</dt>
              <dd className="mt-1">
                <StatusBadge status={isReadyForFA(skill) ? "Ready" : "Not Ready"} />
              </dd>
            </div>
            <div>
              <dt className="font-medium text-slate-500">Suggested next training</dt>
              <dd className="mt-1 font-semibold text-ink">{suggested.name}</dd>
              <dd className="text-slate-600">
                {suggested.category} - {suggested.level}
              </dd>
            </div>
          </dl>
        </div>

        <div>
          <h3 className="mb-3 text-base font-semibold text-ink">Skill Scores</h3>
          <DataTable>
            <table className="min-w-full text-sm">
              <thead className="bg-panel text-left text-xs uppercase text-slate-500">
                <tr>
                  <th className="px-4 py-3 font-semibold">Skill</th>
                  <th className="px-4 py-3 font-semibold">Score</th>
                  <th className="px-4 py-3 font-semibold">Gap to ready</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {skillColumns.map((column) => (
                  <tr key={column.key}>
                    <td className="px-4 py-3 font-medium text-ink">{column.label}</td>
                    <td className="px-4 py-3 text-slate-700">{skill[column.key]}</td>
                    <td className="px-4 py-3 text-slate-700">{Math.max(0, 3 - skill[column.key])}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </DataTable>
        </div>
      </section>

      <section className="mt-5">
        <h3 className="mb-3 text-base font-semibold text-ink">Training History</h3>
        <DataTable>
          <table className="min-w-full text-sm">
            <thead className="bg-panel text-left text-xs uppercase text-slate-500">
              <tr>
                <th className="px-4 py-3 font-semibold">Module</th>
                <th className="px-4 py-3 font-semibold">Category</th>
                <th className="px-4 py-3 font-semibold">Level</th>
                <th className="px-4 py-3 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {history.length ? (
                history.map((item) => (
                  <tr key={item.moduleId}>
                    <td className="px-4 py-3 font-medium text-ink">{item.module!.name}</td>
                    <td className="px-4 py-3 text-slate-700">{item.module!.category}</td>
                    <td className="px-4 py-3 text-slate-700">{item.module!.level}</td>
                    <td className="px-4 py-3">
                      <StatusBadge status={item.status} />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="px-4 py-4 text-slate-600" colSpan={4}>
                    No training registrations yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </DataTable>
      </section>
    </>
  );
}
