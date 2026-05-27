"use client";

import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import Link from "next/link";

import {
  Bell,
  ChevronDown,
  CircleHelp,
  Crown,
  Home,
  Lock,
  LogOut,
  Settings,
  User,
  WalletCards,
  Wrench,
} from "lucide-react";

import { supabase } from "../lib/supabase";

const navItems = [
  { label: "Home", icon: Home },
  { label: "Plus Dashboard", icon: Crown },
  { label: "Pricing", icon: WalletCards },
];

const dropdownItems = [
  { label: "My Profile", icon: User },
  { label: "Account", icon: Settings },
  { label: "Sessions", icon: Bell, locked: true },
  { label: "Troubleshooting", icon: CircleHelp },
  { label: "New Features", icon: Crown },
  { label: "Notification", icon: Bell, arrow: true },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    window.addEventListener("mousedown", handleOutside);
    return () => window.removeEventListener("mousedown", handleOutside);
  }, []);

  useEffect(() => {
    let mounted = true;

    const loadSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (!mounted) return;
      const sessionUser = data.session?.user ?? null;
      setUserEmail(sessionUser?.email ?? null);
      setUserName(
        (sessionUser?.user_metadata?.username as string | undefined) ?? null
      );
    };

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        const sessionUser = session?.user ?? null;
        setUserEmail(sessionUser?.email ?? null);
        setUserName(
          (sessionUser?.user_metadata?.username as string | undefined) ?? null
        );
      }
    );

    loadSession();

    return () => {
      mounted = false;
      authListener.subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setOpen(false);
  };

  return (
    <header className="fixed left-1/2 top-5 z-50 w-[95%] max-w-7xl -translate-x-1/2 rounded-4xl border border-white/10 bg-black/60 shadow-[0_10px_40px_rgba(0,0,0,0.45)] backdrop-blur-2xl">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4">

        {/* LOGO */}
        <div className="flex items-center gap-2">
          <span className="text-2xl font-semibold text-white">
            Vector
          </span>
        </div>

        {/* NAV */}
        <nav className="hidden items-center gap-10 md:flex">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.label}
                className="flex items-center gap-2 text-sm font-medium text-zinc-300 transition hover:text-white"
              >
                <Icon size={18} />
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* PROFILE */}
        {userEmail ? (
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setOpen((prev) => !prev)}
              className="flex items-center gap-2"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-zinc-900">
                <User size={18} className="text-zinc-300" />
              </div>
              <ChevronDown
                size={18}
                className={clsx(
                  "text-zinc-400 transition duration-300",
                  open && "rotate-180"
                )}
              />
            </button>

            {/* DROPDOWN */}
            <div
              className={clsx(
                "absolute right-0 top-16 w-[300px] overflow-hidden rounded-2xl border border-white/10 bg-[#121216] shadow-[0_20px_80px_rgba(0,0,0,0.7)] transition-all duration-200",
                open
                  ? "visible translate-y-0 opacity-100"
                  : "invisible -translate-y-2 opacity-0"
              )}
            >
              {/* TOP */}
              <div className="flex items-center gap-4 border-b border-white/10 px-3 py-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-800">
                  <User size={22} className="text-zinc-300" />
                </div>
                <div>
                  <h3 className="text-[13px] font-semibold text-white">
                    {userName ?? "Profile"}
                  </h3>
                  <p className="text-[12px] text-zinc-400">{userEmail}</p>
                </div>
              </div>

              {/* ITEMS */}
              <div className="py-2">
                {dropdownItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.label}
                      className="flex w-full items-center justify-between px-3 py-2 transition hover:bg-white/5"
                    >
                      <div className="flex items-center gap-3">
                        <Icon size={18} className="text-zinc-400" />
                        <span
                          className={clsx(
                            "text-sm font-medium",
                            item.locked ? "text-zinc-500" : "text-zinc-200"
                          )}
                        >
                          {item.label}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        {item.locked && (
                          <Lock size={14} className="text-orange-400" />
                        )}
                        {item.arrow && (
                          <ChevronDown
                            size={16}
                            className="-rotate-90 text-zinc-500"
                          />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* LOGOUT */}
              <div className="border-t border-white/10 p-2">
                <button
                  onClick={handleLogout}
                  className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-red-500 transition hover:bg-red-500/10"
                >
                  <LogOut size={18} />
                  <span className="text-sm font-medium">Logout</span>
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="rounded-full border border-white/20 px-4 py-2 text-sm font-semibold text-white transition hover:border-white/40"
            >
              Login
            </Link>
            <Link
              href="/signin"
              className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-black transition hover:opacity-90"
            >
              Sign Up
            </Link>
          </div>
        )}

      </div>
      {/* ↑ closes max-w-7xl div */}

    </header>
  );
}