export default function ChangeCard() {
  return (
    <div className="rounded-[32px] border border-white/10 bg-[#0F1017] p-6">
      <h3 className="text-lg font-bold">Need a Better Match?</h3>

      <p className="mt-3 text-sm leading-6 text-zinc-400">
        If your current accountability group no longer aligns with your pace,
        goals, or focus, request a smarter rematch.
      </p>

      <button className="mt-6 w-full rounded-2xl border border-violet-500/30 bg-violet-500/10 py-3 font-semibold text-violet-300 transition hover:bg-violet-500/20">
        Request Change
      </button>
    </div>
  );
}
