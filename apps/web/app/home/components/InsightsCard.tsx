import { insightBars } from "../data";

export default function InsightsCard() {
  return (
    <div className="rounded-[32px] border border-white/10 bg-[#0F1017] p-6">
      <h3 className="text-lg font-bold">Circle Insights</h3>

      <div className="mt-6">
        <p className="text-sm text-zinc-400">Your circle is performing</p>

        <h2 className="mt-2 text-4xl font-black text-emerald-400">
          18% better
        </h2>

        <p className="mt-2 text-zinc-400">than similar execution circles</p>
      </div>

      <div className="mt-8 flex h-40 items-end gap-3">
        {insightBars.map((height, index) => (
          <div
            key={`bar-${index}`}
            style={{ height }}
            className="flex-1 rounded-t-2xl bg-gradient-to-t from-violet-500 to-indigo-400"
          />
        ))}
      </div>
    </div>
  );
}
