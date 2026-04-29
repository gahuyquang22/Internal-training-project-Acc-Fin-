"use client";

import { useMemo, useState } from "react";
import { useAppData } from "@/components/AppDataProvider";
import { DataTable } from "@/components/DataTable";
import { PageHeader } from "@/components/PageHeader";
import { StatusBadge } from "@/components/StatusBadge";
import type { RegistrationStatus, TrainingCategory } from "@/lib/types";

const statuses: RegistrationStatus[] = ["Not started", "In progress", "Completed"];
const categories: TrainingCategory[] = ["Accounting", "F&B Specialized", "Finance & Analysis"];

export default function TrainingPage() {
  const { employees, modules, registrations, updateRegistration } = useAppData();
  const [selectedEmployee, setSelectedEmployee] = useState(employees[0].id);

  const registrationMap = useMemo(() => {
    return new Map(registrations.map((item) => [`${item.employeeId}:${item.moduleId}`, item]));
  }, [registrations]);

  function setRegistration(moduleId: string, status: RegistrationStatus) {
    updateRegistration(selectedEmployee, moduleId, status);
  }

  return (
    <>
      <PageHeader
        title="Training"
        description="Register employees to modules and update training status by category."
        action={
          <select
            value={selectedEmployee}
            onChange={(event) => setSelectedEmployee(event.target.value)}
            className="h-10 rounded-md border border-line bg-white px-3 text-sm text-ink outline-none focus:border-moss focus:ring-2 focus:ring-moss/20"
          >
            {employees.map((employee) => (
              <option key={employee.id} value={employee.id}>
                {employee.name}
              </option>
            ))}
          </select>
        }
      />

      <div className="space-y-5">
        {categories.map((category) => (
          <section key={category}>
            <h3 className="mb-3 text-base font-semibold text-ink">{category}</h3>
            <DataTable>
              <table className="min-w-full text-sm">
                <thead className="bg-panel text-left text-xs uppercase text-slate-500">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Module</th>
                    <th className="px-4 py-3 font-semibold">Level</th>
                    <th className="px-4 py-3 font-semibold">Selected employee status</th>
                    <th className="px-4 py-3 font-semibold">Update</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {modules
                    .filter((module) => module.category === category)
                    .map((module) => {
                      const registration = registrationMap.get(`${selectedEmployee}:${module.id}`);
                      const status = registration?.status ?? "Not started";
                      return (
                        <tr key={module.id} className="hover:bg-panel/70">
                          <td className="px-4 py-3 font-medium text-ink">{module.name}</td>
                          <td className="px-4 py-3 text-slate-700">{module.level}</td>
                          <td className="px-4 py-3">
                            <StatusBadge status={status} />
                          </td>
                          <td className="px-4 py-3">
                            <select
                              value={status}
                              onChange={(event) => setRegistration(module.id, event.target.value as RegistrationStatus)}
                              className="h-9 rounded border border-line bg-white px-2 text-sm text-ink outline-none focus:border-moss focus:ring-2 focus:ring-moss/20"
                            >
                              {statuses.map((item) => (
                                <option key={item} value={item}>
                                  {item}
                                </option>
                              ))}
                            </select>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </DataTable>
          </section>
        ))}
      </div>
    </>
  );
}
