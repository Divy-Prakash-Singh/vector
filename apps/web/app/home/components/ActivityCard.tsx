import { activities } from "../data";

export default function ActivityCard() {
  return (
    <div className="rounded-[32px] border border-white/10 bg-[#0F1017] p-6">
      <h3 className="text-lg font-bold">Recent Activity</h3>

      <div className="mt-6 space-y-5">
        {activities.map((activity, index) => (
          <div key={activity} className="flex gap-4">
            <div className="mt-1 h-3 w-3 rounded-full bg-violet-400" />

            <div>
              <p className="text-sm text-zinc-200">{activity}</p>

              <p className="mt-1 text-xs text-zinc-500">
                {index + 2}h ago
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
