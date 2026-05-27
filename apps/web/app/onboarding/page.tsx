"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Brain, ArrowRight } from "lucide-react";
import api from "../lib/api";

export default function OnboardingPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    goal: "",
    currentLevel: "",
    duration: "",
    dailyHours: "",
    targetCompany: "",
  });

  const handleSubmit = async () => {
    try {
      setLoading(true);

      await api.post("/api/roadmap/generate", form);

      router.push("/dashboard");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-6">
      <div className="w-full max-w-3xl bg-zinc-950 border border-zinc-800 rounded-3xl p-10">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 rounded-2xl bg-violet-500/20 flex items-center justify-center">
            <Brain className="w-6 h-6 text-violet-400" />
          </div>

          <div>
            <h1 className="text-3xl font-bold">
              Build Your AI Roadmap
            </h1>

            <p className="text-zinc-400 text-sm mt-1">
              Tell the AI your target and current level
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          <input
            placeholder="Goal (FAANG, DSA, ML, etc)"
            className="bg-zinc-900 border border-zinc-800 rounded-2xl px-4 py-4 outline-none"
            value={form.goal}
            onChange={(e) =>
              setForm({
                ...form,
                goal: e.target.value,
              })
            }
          />

          <select
            className="bg-zinc-900 border border-zinc-800 rounded-2xl px-4 py-4 outline-none"
            value={form.currentLevel}
            onChange={(e) =>
              setForm({
                ...form,
                currentLevel: e.target.value,
              })
            }
          >
            <option value="">Current Level</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>

          <input
            placeholder="Duration (6 months)"
            className="bg-zinc-900 border border-zinc-800 rounded-2xl px-4 py-4 outline-none"
            value={form.duration}
            onChange={(e) =>
              setForm({
                ...form,
                duration: e.target.value,
              })
            }
          />

          <input
            placeholder="Daily Study Hours"
            className="bg-zinc-900 border border-zinc-800 rounded-2xl px-4 py-4 outline-none"
            value={form.dailyHours}
            onChange={(e) =>
              setForm({
                ...form,
                dailyHours: e.target.value,
              })
            }
          />

          <input
            placeholder="Target Company"
            className="bg-zinc-900 border border-zinc-800 rounded-2xl px-4 py-4 outline-none md:col-span-2"
            value={form.targetCompany}
            onChange={(e) =>
              setForm({
                ...form,
                targetCompany: e.target.value,
              })
            }
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="mt-8 w-full bg-violet-600 hover:bg-violet-500 transition-all rounded-2xl py-4 font-semibold flex items-center justify-center gap-2"
        >
          {loading
            ? "Generating AI Roadmap..."
            : "Generate Roadmap"}

          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}