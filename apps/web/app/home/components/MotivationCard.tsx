export default function MotivationCard() {
  return (
    <section className="rounded-[32px] border border-yellow-500/10 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 p-6">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h3 className="text-xl font-bold">Keep going, Krish.</h3>

          <p className="mt-2 text-zinc-300">
            Your execution consistency is outperforming 73% of users this month.
          </p>
        </div>

        <button className="rounded-2xl bg-white px-6 py-3 font-semibold text-black transition hover:opacity-90">
          View Leaderboard
        </button>
      </div>
    </section>
  );
}
