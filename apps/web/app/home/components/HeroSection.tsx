import { Users } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="overflow-hidden rounded-[32px] border border-violet-500/20 bg-gradient-to-br from-violet-500/10 via-[#12121A] to-indigo-500/10">
      <div className="grid gap-6 p-6 lg:grid-cols-3 lg:p-8">
        <div>
          <p className="text-sm text-zinc-400">Your Circle</p>

          <div className="mt-4 flex items-center gap-3">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-500/20">
              <Users className="text-violet-300" />
            </div>

            <div>
              <h2 className="text-2xl font-bold">AI-Matched</h2>
              <p className="text-sm text-emerald-400">
                Active • Matched 2 days ago
              </p>
            </div>
          </div>
        </div>

        <div>
          <p className="text-sm text-zinc-400">Circle Rank</p>

          <div className="mt-4">
            <h2 className="text-4xl font-bold text-yellow-400">Gold</h2>

            <p className="mt-2 text-zinc-400">Top 28% circles globally</p>
          </div>
        </div>

        <div>
          <p className="text-sm text-zinc-400">Accountability Score</p>

          <div className="mt-4 flex items-end gap-3">
            <h2 className="text-5xl font-black text-emerald-400">92%</h2>

            <span className="mb-2 rounded-full bg-emerald-500/10 px-3 py-1 text-sm font-semibold text-emerald-400">
              Excellent
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
