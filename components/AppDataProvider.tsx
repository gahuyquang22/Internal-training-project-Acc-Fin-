"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { clearData, defaultData, getData, setData, type AppData } from "@/lib/storage";
import type { RegistrationStatus, Simulation, SkillKey } from "@/lib/types";

type AppDataContextValue = AppData & {
  updateSkillScore: (employeeId: string, key: SkillKey, value: number) => void;
  updateRegistration: (employeeId: string, moduleId: string, status: RegistrationStatus) => void;
  updateSimulation: (
    employeeId: string,
    field: keyof Pick<Simulation, "issue" | "rootCause" | "action" | "feedback">,
    value: string,
  ) => void;
  resetData: () => void;
};

const AppDataContext = createContext<AppDataContextValue | null>(null);

function cloneDefaultData(): AppData {
  return JSON.parse(JSON.stringify(defaultData)) as AppData;
}

export function AppDataProvider({ children }: { children: React.ReactNode }) {
  const [data, setDataState] = useState<AppData>(() => cloneDefaultData());
  const [toast, setToast] = useState("");

  useEffect(() => {
    setDataState(getData());
  }, []);

  function commit(nextData: AppData, message = "Saved successfully") {
    setDataState(nextData);
    setData(nextData);
    setToast(message);
    window.setTimeout(() => setToast(""), 1600);
  }

  const value = useMemo<AppDataContextValue>(
    () => ({
      ...data,
      updateSkillScore(employeeId, key, value) {
        const nextData = {
          ...data,
          skills: data.skills.map((skill) =>
            skill.employeeId === employeeId ? { ...skill, [key]: value } : skill,
          ),
        };
        commit(nextData);
      },
      updateRegistration(employeeId, moduleId, status) {
        const exists = data.registrations.some(
          (item) => item.employeeId === employeeId && item.moduleId === moduleId,
        );
        const registrations = exists
          ? data.registrations.map((item) =>
              item.employeeId === employeeId && item.moduleId === moduleId ? { ...item, status } : item,
            )
          : [...data.registrations, { employeeId, moduleId, status }];

        commit({ ...data, registrations });
      },
      updateSimulation(employeeId, field, value) {
        const nextData = {
          ...data,
          simulations: data.simulations.map((simulation) =>
            simulation.employeeId === employeeId ? { ...simulation, [field]: value } : simulation,
          ),
        };
        commit(nextData);
      },
      resetData() {
        clearData();
        const nextData = cloneDefaultData();
        commit(nextData, "Data reset");
      },
    }),
    [data],
  );

  return (
    <AppDataContext.Provider value={value}>
      {children}
      {toast ? (
        <div className="fixed bottom-4 right-4 z-50 rounded-md border border-emerald-200 bg-white px-4 py-3 text-sm font-semibold text-emerald-700 shadow-soft">
          {toast}
        </div>
      ) : null}
    </AppDataContext.Provider>
  );
}

export function useAppData() {
  const context = useContext(AppDataContext);
  if (!context) {
    throw new Error("useAppData must be used inside AppDataProvider");
  }

  return context;
}

export function ResetDataButton() {
  const { resetData } = useAppData();

  return (
    <button
      type="button"
      onClick={resetData}
      className="rounded-md border border-line bg-white px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-panel"
    >
      Reset Data
    </button>
  );
}
