import type { LucideIcon } from "lucide-react";

type StatCardProps = {
  title: string;
  value: string;
  sub: string;
  icon: LucideIcon;
};

export default function StatCard({ title, value, sub, icon: Icon }: StatCardProps) {
  return (
    <div className="rounded-3xl border border-white/10 bg-[#12121A] p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-zinc-400">{title}</p>
          <h3 className="mt-2 text-3xl font-bold text-white">{value}</h3>
          <p className="mt-2 text-sm text-emerald-400">{sub}</p>
        </div>

        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5">
          <Icon className="text-violet-300" size={22} />
        </div>
      </div>
    </div>
  );
}
