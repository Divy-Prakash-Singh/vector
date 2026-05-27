// app/components/CodeNestHero.tsx

"use client";

import { useEffect, useRef, useState } from "react";
import Hls from "hls.js";
import { ArrowRight, Menu, X } from "lucide-react";
import Navbar from "./components/Navbar";

const navItems = ["PROJECTS", "BLOG", "ABOUT", "RESUME"];

export default function CodeNestHero() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
    const video = videoRef.current;

    if (!video) return;

    const videoSrc =
      "https://stream.mux.com/tLkHO1qZoaaQOUeVWo8hEBeGQfySP02EPS02BmnNFyXys.m3u8";

    let hls: Hls | null = null;

    if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = videoSrc;
    } else if (Hls.isSupported()) {
      hls = new Hls({
        enableWorker: false,
      });

      hls.loadSource(videoSrc);
      hls.attachMedia(video);
    }

    return () => {
      if (hls) {
        hls.destroy();
      }
    };
  }, []);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#070b0a] text-white">
      <Navbar />
      {/* ================= VIDEO ================= */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover opacity-60"
      />

      {/* Left Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#070b0a] via-[#070b0ad9] to-transparent" />

      {/* Bottom Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#070b0a] via-[#070b0a80] to-transparent" />

      {/* ================= GRID LINES ================= */}
      <div className="pointer-events-none absolute inset-0 hidden md:block">
        <div className="absolute left-1/4 top-0 h-full w-px bg-white/10" />
        <div className="absolute left-1/2 top-0 h-full w-px bg-white/10" />
        <div className="absolute left-3/4 top-0 h-full w-px bg-white/10" />
      </div>

      {/* ================= GLOW ================= */}
      <div className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2">
        <svg
          width="900"
          height="400"
          viewBox="0 0 900 400"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="opacity-70"
        >
          <g filter="url(#blur)">
            <ellipse
              cx="450"
              cy="120"
              rx="260"
              ry="70"
              fill="#5ed29c"
              fillOpacity="0.25"
            />
          </g>

          <defs>
            <filter
              id="blur"
              x="0"
              y="0"
              width="900"
              height="400"
              filterUnits="userSpaceOnUse"
            >
              <feGaussianBlur stdDeviation="25" />
            </filter>
          </defs>
        </svg>
      </div>

      {/* ================= MOBILE MENU ================= */}
      <div
        className={`fixed inset-0 z-[100] bg-[#070b0a] transition-all duration-300 ${
          mobileMenu
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      >
        <div className="flex items-center justify-between px-6 py-6">
          <div className="flex items-center gap-3">
            <div className="h-3 w-3 rounded-full bg-[#5ed29c]" />

            <span className="text-lg font-semibold">CodeNest</span>
          </div>

          <button
            onClick={() => setMobileMenu(false)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex h-[80vh] flex-col items-center justify-center gap-10">
          {navItems.map((item) => (
            <a
              key={item}
              href="#"
              onClick={() => setMobileMenu(false)}
              className="text-3xl font-bold tracking-tight text-white transition-colors hover:text-[#5ed29c]"
            >
              {item}
            </a>
          ))}
        </div>
      </div>

      {/* ================= HERO ================= */}
      <section className="relative z-10 flex min-h-screen items-center">
        <div className="mx-auto flex w-full max-w-7xl flex-col px-6 pt-32 md:px-10">

          {/* Eyebrow */}
          <span className="mb-5 text-[11px] font-bold uppercase tracking-[0.2em] text-[#5ed29c]">
            Career-Ready Curriculum
          </span>

          {/* Headline */}
          <div className="max-w-5xl text-[30px] font-bold uppercase leading-[0.95] tracking-tight sm:text-[52px] md:text-[64px] lg:text-[72px]">
            Stop Planning. <br />Start Executing
            <span className="text-[#5ed29c]">.</span>
          </div>

          {/* Description */}
          <p className="mt-7 max-w-[512px] text-[14px] leading-7 text-white/70 md:text-[15px]">
            Vector bridges the gap between ambition and execution by helping students stay consistent, track progress, and achieve career goals with structured guidance and AI-powered recommendations.
          </p>

          {/* CTA */}
          <div className="mt-10 flex gap-2">
            <button className="group inline-flex items-center gap-3 rounded-full bg-[#5ed29c] px-7 py-4 text-sm font-bold uppercase tracking-wide text-[#070b0a] transition-all duration-300 hover:scale-[1.02]">
              Start for free

              <span className="transition-transform duration-300 group-hover:translate-x-1">
                <ArrowRight size={18} strokeWidth={2.5} />
              </span>
            </button>
            <button className="group inline-flex items-center gap-3 rounded-full bg-[#5ed29c] px-7 py-4 text-sm font-bold uppercase tracking-wide text-[#070b0a] transition-all duration-300 hover:scale-[1.02]">
              Explore Plus

              <span className="transition-transform duration-300 group-hover:translate-x-1">
                <ArrowRight size={18} strokeWidth={2.5} />
              </span>
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}