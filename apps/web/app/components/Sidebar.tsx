"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Crown } from "lucide-react";

import { sidebarGroups } from "./sidebarData";

type SidebarProps = {
  variant?: "desktop" | "mobile";
  onNavigate?: () => void;
};

export default function Sidebar({ variant = "desktop", onNavigate }: SidebarProps) {
  const pathname = usePathname();
  const baseClasses =
    "w-[280px] flex-col border-r border-white/10 bg-[#0B0B12] px-5 py-6";
  const wrapperClasses =
    variant === "desktop" ? `hidden xl:flex ${baseClasses}` : `flex ${baseClasses}`;

  return (
    <aside className={wrapperClasses}>
      <div className="mb-10 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-indigo-500 font-bold text-white">
          V
        </div>

        <div>
          <h1 className="text-lg font-bold tracking-wide text-white">
            VECTOR
          </h1>
          <p className="text-xs text-zinc-500">Execution OS</p>
        </div>
      </div>

      <div className="flex-1 space-y-8">
        {sidebarGroups.map((group) => (
          <div key={group.section}>
            <p className="mb-3 px-3 text-[11px] font-semibold tracking-[0.2em] text-zinc-500">
              {group.section}
            </p>

            <div className="space-y-1">
              {group.items.map((item) => {
                const Icon = item.icon;
                const isActive =
                  pathname === item.href || pathname.startsWith(`${item.href}/`);

                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={onNavigate}
                    aria-current={isActive ? "page" : undefined}
                    className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all ${
                      isActive
                        ? "border border-violet-500/20 bg-violet-500/15 text-violet-300"
                        : "text-zinc-400 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <Icon size={18} />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-3xl border border-violet-500/20 bg-gradient-to-br from-violet-500/10 to-indigo-500/10 p-5">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-500/20">
          <Crown className="text-violet-300" />
        </div>

        <h3 className="text-lg font-semibold text-white">Upgrade to Pro</h3>

        <p className="mt-2 text-sm leading-6 text-zinc-400">
          Unlock advanced analytics, private circles, and AI execution tools.
        </p>

        <button className="mt-5 w-full rounded-2xl bg-violet-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-violet-400">
          Upgrade Now
        </button>
      </div>
    </aside>
  );
}
