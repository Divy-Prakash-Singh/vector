import Image from "next/image";
import { Crown, Plus } from "lucide-react";

import { members } from "../data";

export default function MembersSection() {
  return (
    <section className="rounded-[32px] border border-white/10 bg-[#0F1017] p-6">
      <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h3 className="text-xl font-bold">Your Accountability Circle</h3>

          <p className="mt-1 text-sm text-zinc-400">
            Circle refreshes in 6 days
          </p>
        </div>

        <button className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium hover:bg-white/10">
          <Plus size={18} />
          Invite Member
        </button>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {members.map((member) => (
          <div
            key={member.name}
            className="group rounded-3xl border border-white/10 bg-[#12121A] p-5 transition hover:border-violet-500/30 hover:bg-[#161622]"
          >
            <div className="relative mx-auto h-24 w-24">
              <Image
                src={member.image}
                alt={member.name}
                fill
                className="rounded-full object-cover"
              />

              {member.badge && (
                <div className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full border-4 border-[#12121A] bg-yellow-400">
                  <Crown size={14} className="text-black" />
                </div>
              )}
            </div>

            <div className="mt-5 text-center">
              <h4 className="font-semibold">{member.name}</h4>

              <p className="mt-2 text-sm text-zinc-400">Consistency</p>

              <p className="mt-1 text-lg font-bold text-violet-300">
                {member.score}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
