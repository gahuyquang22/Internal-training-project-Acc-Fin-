"use client";

import { useState } from "react";
import { useAppData } from "@/components/AppDataProvider";
import { DataTable } from "@/components/DataTable";
import { PageHeader } from "@/components/PageHeader";
import { formatCurrency } from "@/lib/calculations";
import type { Simulation } from "@/lib/types";

export default function SimulationPage() {
  const { employees, simulations, updateSimulation } = useAppData();
  const [selectedEmployee, setSelectedEmployee] = useState(simulations[0].employeeId);
  const simulation = simulations.find((item) => item.employeeId === selectedEmployee)!;
  const employee = employees.find((item) => item.id === selectedEmployee)!;

  function updateField(field: keyof Pick<Simulation, "issue" | "rootCause" | "action" | "feedback">, value: string) {
    updateSimulation(selectedEmployee, field, value);
  }

  return (
    <>
      <PageHeader
        title="FA Simulation"
        description="Practice outlet analysis by linking P&L signals to root cause and action."
        action={
          <select
            value={selectedEmployee}
            onChange={(event) => setSelectedEmployee(event.target.value)}
            className="h-10 rounded-md border border-line bg-white px-3 text-sm text-ink outline-none focus:border-moss focus:ring-2 focus:ring-moss/20"
          >
            {simulations.map((item) => {
              const employee = employees.find((entry) => entry.id === item.employeeId)!;
              return (
                <option key={item.employeeId} value={item.employeeId}>
                  {employee.name}
                </option>
              );
            })}
          </select>
        }
      />

      <section className="grid gap-5 xl:grid-cols-[360px_1fr]">
        <div className="rounded-md border border-line bg-white p-5 shadow-soft">
          <p className="text-sm font-medium text-slate-500">Assigned outlet</p>
          <h3 className="mt-1 text-xl font-semibold text-ink">{simulation.outlet}</h3>
          <p className="mt-1 text-sm text-slate-600">
            {employee.name} · {employee.role}
          </p>

          <dl className="mt-5 grid grid-cols-2 gap-3">
            <div className="rounded border border-line bg-panel p-3">
              <dt className="text-xs uppercase text-slate-500">Sales</dt>
              <dd className="mt-1 text-sm font-semibold text-ink">{formatCurrency(simulation.sales)}</dd>
            </div>
            <div className="rounded border border-line bg-panel p-3">
              <dt className="text-xs uppercase text-slate-500">P&L</dt>
              <dd className="mt-1 text-sm font-semibold text-ink">{formatCurrency(simulation.pnl)}</dd>
            </div>
            <div className="rounded border border-line bg-panel p-3">
              <dt className="text-xs uppercase text-slate-500">COGS %</dt>
              <dd className="mt-1 text-sm font-semibold text-ink">{simulation.cogsPercent.toFixed(1)}%</dd>
            </div>
            <div className="rounded border border-line bg-panel p-3">
              <dt className="text-xs uppercase text-slate-500">Waste</dt>
              <dd className="mt-1 text-sm font-semibold text-ink">{formatCurrency(simulation.waste)}</dd>
            </div>
          </dl>
        </div>

        <div className="rounded-md border border-line bg-white p-5 shadow-soft">
          <div className="grid gap-4 lg:grid-cols-3">
            <label className="block">
              <span className="text-sm font-semibold text-ink">Issue</span>
              <textarea
                value={simulation.issue}
                onChange={(event) => updateField("issue", event.target.value)}
                className="mt-2 min-h-36 w-full rounded-md border border-line px-3 py-2 text-sm outline-none focus:border-moss focus:ring-2 focus:ring-moss/20"
              />
            </label>
            <label className="block">
              <span className="text-sm font-semibold text-ink">Root cause</span>
              <textarea
                value={simulation.rootCause}
                onChange={(event) => updateField("rootCause", event.target.value)}
                className="mt-2 min-h-36 w-full rounded-md border border-line px-3 py-2 text-sm outline-none focus:border-moss focus:ring-2 focus:ring-moss/20"
              />
            </label>
            <label className="block">
              <span className="text-sm font-semibold text-ink">Action plan</span>
              <textarea
                value={simulation.action}
                onChange={(event) => updateField("action", event.target.value)}
                className="mt-2 min-h-36 w-full rounded-md border border-line px-3 py-2 text-sm outline-none focus:border-moss focus:ring-2 focus:ring-moss/20"
              />
            </label>
          </div>

          <label className="mt-4 block">
            <span className="text-sm font-semibold text-ink">Manager feedback</span>
            <textarea
              value={simulation.feedback}
              onChange={(event) => updateField("feedback", event.target.value)}
              className="mt-2 min-h-24 w-full rounded-md border border-line px-3 py-2 text-sm outline-none focus:border-moss focus:ring-2 focus:ring-moss/20"
            />
          </label>
        </div>
      </section>

      <section className="mt-5">
        <h3 className="mb-3 text-base font-semibold text-ink">Simulation Tracker</h3>
        <DataTable>
          <table className="min-w-full text-sm">
            <thead className="bg-panel text-left text-xs uppercase text-slate-500">
              <tr>
                <th className="px-4 py-3 font-semibold">Employee</th>
                <th className="px-4 py-3 font-semibold">Outlet</th>
                <th className="px-4 py-3 font-semibold">Issue</th>
                <th className="px-4 py-3 font-semibold">Feedback</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {simulations.map((item) => {
                const employee = employees.find((entry) => entry.id === item.employeeId)!;
                return (
                  <tr key={item.employeeId} className="hover:bg-panel/70">
                    <td className="px-4 py-3 font-medium text-ink">{employee.name}</td>
                    <td className="px-4 py-3 text-slate-700">{item.outlet}</td>
                    <td className="px-4 py-3 text-slate-700">{item.issue}</td>
                    <td className="px-4 py-3 text-slate-700">{item.feedback || "Pending review"}</td>
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
