import type { Metadata } from "next";
import Link from "next/link";
import { AppDataProvider, ResetDataButton } from "@/components/AppDataProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Finance Training Matrix",
  description: "Internal Finance Training and Skill Matrix for F&B teams",
};

const navItems = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/skills", label: "Skills" },
  { href: "/training", label: "Training" },
  { href: "/modules", label: "Modules" },
  { href: "/simulation", label: "Simulation" },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        <AppDataProvider>
        <div className="flex min-h-screen">
          <aside className="hidden w-64 border-r border-line bg-white px-5 py-6 shadow-soft md:block">
            <div className="mb-8">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">F&B Finance</p>
              <h1 className="mt-1 text-xl font-semibold text-ink">Training Matrix</h1>
            </div>
            <nav className="space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block rounded-md px-3 py-2 text-sm font-medium text-slate-700 hover:bg-panel hover:text-ink"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="mt-8">
              <ResetDataButton />
            </div>
          </aside>
          <main className="min-w-0 flex-1">
            <header className="border-b border-line bg-white px-4 py-3 md:hidden">
              <div className="flex items-center justify-between gap-3">
                <Link href="/dashboard" className="text-base font-semibold text-ink">
                  Training Matrix
                </Link>
                <nav className="flex gap-1 overflow-x-auto text-sm">
                  {navItems.map((item) => (
                    <Link key={item.href} href={item.href} className="rounded-md px-2 py-1 text-slate-700">
                      {item.label}
                    </Link>
                  ))}
                </nav>
                <ResetDataButton />
              </div>
            </header>
            <div className="px-4 py-5 sm:px-6 lg:px-8">{children}</div>
          </main>
        </div>
        </AppDataProvider>
      </body>
    </html>
  );
}
