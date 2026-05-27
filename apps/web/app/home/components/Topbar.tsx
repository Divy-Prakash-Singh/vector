import Image from "next/image";
import { Bell, Menu, Search } from "lucide-react";

type TopbarProps = {
  onMenuClick: () => void;
};

export default function Topbar({ onMenuClick }: TopbarProps) {
  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-[#06070B]/90 backdrop-blur-xl">
      <div className="flex items-center justify-between gap-4 px-4 py-4 md:px-8">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onMenuClick}
            className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 xl:hidden"
          >
            <Menu size={20} />
          </button>

          <div>
            <h1 className="text-2xl font-bold">Execution Circle</h1>
            <p className="text-sm text-zinc-400">
              Matched with focused peers on a similar journey.
            </p>
          </div>
        </div>

        <div className="hidden items-center gap-4 lg:flex">
          <div className="relative">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
            />

            <input
              type="text"
              placeholder="Search anything..."
              className="h-12 w-[320px] rounded-2xl border border-white/10 bg-[#12121A] pl-11 pr-4 text-sm outline-none transition focus:border-violet-500/50"
            />
          </div>

          <button className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-[#12121A] hover:bg-white/5">
            <Bell size={18} />
          </button>

          <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-[#12121A] px-3 py-2">
            <Image
              src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400"
              alt="profile"
              width={42}
              height={42}
              className="rounded-xl object-cover"
            />

            <div>
              <p className="text-sm font-semibold">Krish</p>
              <p className="text-xs text-violet-300">Pro</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
