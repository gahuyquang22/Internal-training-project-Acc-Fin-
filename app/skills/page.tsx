"use client";

import Link from "next/link";
import { useMemo } from "react";
import { useAppData } from "@/components/AppDataProvider";
import { DataTable } from "@/components/DataTable";
import { PageHeader } from "@/components/PageHeader";
import { ScoreInput } from "@/components/ScoreInput";
import { StatusBadge } from "@/components/StatusBadge";
import { getAverageBySkill, getSkillTotal, isReadyForFA } from "@/lib/calculations";
import { skillColumns } from "@/lib/skill-columns";
import type { SkillKey } from "@/lib/types";

export default function SkillsPage() {
  const { employees, skills, updateSkillScore } = useAppData();
  const averages = useMemo(() => getAverageBySkill(skills), [skills]);

  function updateScore(employeeId: string, key: SkillKey, value: number) {
    updateSkillScore(employeeId, key, value);
  }

  return (
    <>
      <PageHeader
        title="Skill Matrix"
        description="Edit scores from 1 to 5. FA readiness is calculated when every core skill is at least 3."
      />

      <DataTable>
        <table className="min-w-[1080px] text-sm">
          <thead className="bg-panel text-left text-xs uppercase text-slate-500">
            <tr>
              <th className="sticky left-0 z-10 bg-panel px-4 py-3 font-semibold">Employee</th>
              <th className="px-4 py-3 font-semibold">Role</th>
              <th className="px-4 py-3 font-semibold">Outlet</th>
              {skillColumns.map((column) => (
                <th key={column.key} className="px-4 py-3 font-semibold">
                  {column.label}
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
                  <td className="sticky left-0 z-10 bg-white px-4 py-3 font-medium text-ink">
                    <Link href={`/employees/${employee.id}`} className="hover:underline">
                      {employee.name}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-slate-700">{employee.role}</td>
                  <td className="px-4 py-3 text-slate-700">{employee.outlet}</td>
                  {skillColumns.map((column) => (
                    <td key={column.key} className="px-4 py-3">
                      <ScoreInput
                        label={`${employee.name} ${column.label}`}
                        value={skill[column.key]}
                        onChange={(value) => updateScore(employee.id, column.key, value)}
                      />
                    </td>
                  ))}
                  <td className="px-4 py-3 text-base font-semibold text-ink">{getSkillTotal(skill)}</td>
                  <td className="px-4 py-3">
                    <StatusBadge status={isReadyForFA(skill) ? "Ready" : "Not Ready"} />
                  </td>
                </tr>
              );
            })}
          </tbody>
          <tfoot className="bg-panel text-sm">
            <tr>
              <td className="sticky left-0 z-10 bg-panel px-4 py-3 font-semibold text-ink" colSpan={3}>
                Average
              </td>
              {averages.map((item) => (
                <td key={item.key} className="px-4 py-3 font-semibold text-ink">
                  {item.average.toFixed(1)}
                </td>
              ))}
              <td className="px-4 py-3" colSpan={2} />
            </tr>
          </tfoot>
        </table>
      </DataTable>
    </>
  );
}
