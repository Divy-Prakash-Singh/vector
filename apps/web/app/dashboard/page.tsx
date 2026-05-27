"use client";

import { useEffect, useMemo, useState } from "react";
import Sidebar from "../components/Sidebar";
import api from "../lib/api";

interface DashboardTask {
  id: string;
  title: string;
  estimatedMinutes: number;
  completed: boolean;
}

interface DashboardData {
  success: boolean;

  data: {
    profile: {
      username: string;
    };

    roadmap: {
      title: string;
      progress: number;
    };

    analytics: {
      completionRate: number;
      executionGrade: string;
      totalTasks: number;
      completedTasks: number;
    };

    streak: {
      current: number;
    };

    tasks: {
      today: DashboardTask[];
    };

    ai: {
      predictions: unknown;
      recovery: unknown;
    };

    metrics: unknown;
  };
}

function ProgressBar({ value }: { value: number }) {
  return (
    <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
      <div
        className="h-full bg-red-500 rounded-full transition-all duration-500"
        style={{
          width: `${value}%`,
        }}
      />
    </div>
  );
}

export default function Dashboard() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const [dashboard, setDashboard] =
    useState<DashboardData | null>(null);

  const [loading, setLoading] = useState(true);
  const [updatingTaskId, setUpdatingTaskId] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await api.get("/api/dashboard");

        console.log("DASHBOARD RESPONSE:", response.data);

        setDashboard(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  const data = dashboard?.data;

  const completedToday = useMemo(() => {
    if (!data) return 0;

    return data.tasks.today.filter(
      (task) => task.completed
    ).length;
  }, [data]);

  const handleTaskComplete = async (task: DashboardTask) => {
    if (!dashboard || !data || task.completed || updatingTaskId) return;

    setUpdatingTaskId(task.id);

    try {
      console.log(`Marking task ${task.id} as complete...`);
      await api.post(`/api/dailytask/${task.id}/complete`);

      setDashboard((prev) => {
        if (!prev) return prev;

        return {
          ...prev,
          data: {
            ...prev.data,
            tasks: {
              ...prev.data.tasks,
              today: prev.data.tasks.today.map((item) =>
                item.id === task.id
                  ? { ...item, completed: true }
                  : item
              ),
            },
          },
        };
      });
    } catch (error) {
      console.error(error);
    } finally {
      setUpdatingTaskId(null);
    }
  };

  const weekDays = useMemo(() => {
    if (!data) return [];

    const today = new Date();
    const streakCount = Math.min(
      Math.max(data.streak.current, 0),
      7
    );

    return Array.from({ length: 7 }, (_, idx) => {
      const date = new Date(today);
      date.setDate(today.getDate() - (6 - idx));

      return {
        key: date.toISOString().slice(0, 10),
        label: date.toLocaleDateString("en-US", {
          weekday: "short",
        }),
        completed: idx >= 7 - streakCount,
      };
    });
  }, [data]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white">
        Loading Dashboard...
      </div>
    );
  }

  if (!dashboard || !data) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white">
        Failed to load dashboard
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#05060A] text-white">
      <div className="flex">
        {/* MOBILE SIDEBAR */}

        <div
          className={`fixed inset-0 z-50 xl:hidden transition ${
            mobileOpen
              ? "pointer-events-auto opacity-100"
              : "pointer-events-none opacity-0"
          }`}
        >
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />

          <div
            className={`absolute left-0 top-0 h-full w-[280px] transform bg-[#0B0B12] transition-transform duration-300 ${
              mobileOpen
                ? "translate-x-0"
                : "-translate-x-full"
            }`}
          >
            <Sidebar
              variant="mobile"
              onNavigate={() => setMobileOpen(false)}
            />
          </div>
        </div>

        {/* DESKTOP SIDEBAR */}

        <Sidebar
          onNavigate={() => setMobileOpen(false)}
        />

        {/* MAIN */}

        <main className="flex-1 px-6 py-6 space-y-6">
          {/* HERO */}

          <section className="relative overflow-hidden rounded-3xl border border-zinc-800 bg-gradient-to-br from-[#101010] via-[#0B0B12] to-[#050505] p-8 shadow-[0_25px_80px_-50px_rgba(255,76,76,0.5)]">
            <div className="pointer-events-none absolute -right-24 -top-28 h-64 w-64 rounded-full bg-red-500/10 blur-3xl" />
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-red-500/20 bg-red-500/10 text-red-400 text-sm font-medium">
                  🔥 {data.streak.current} Day Streak
                </div>

                <h1 className="text-5xl font-black mt-5 leading-tight">
                  Welcome Back,
                  <br />
                  {data.profile.username}
                </h1>

                <p className="text-zinc-400 text-lg mt-4 leading-relaxed">
                  Your roadmap toward{" "}
                  <span className="text-red-400 font-semibold">
                    {data.roadmap.title}
                  </span>{" "}
                  is actively progressing.
                </p>

                <div className="flex flex-wrap gap-4 mt-6">
                  <div className="rounded-2xl border border-zinc-800 bg-zinc-900/70 px-5 py-4 transition-transform duration-300 hover:-translate-y-1">
                    <p className="text-xs text-zinc-500">
                      Current Goal
                    </p>

                    <h3 className="font-bold mt-1">
                      {data.roadmap.title}
                    </h3>
                  </div>

                  <div className="rounded-2xl border border-zinc-800 bg-zinc-900/70 px-5 py-4 transition-transform duration-300 hover:-translate-y-1">
                    <p className="text-xs text-zinc-500">
                      Completion Rate
                    </p>

                    <h3 className="font-bold mt-1">
                      {
                        data.analytics
                          .completionRate
                      }
                      %
                    </h3>
                  </div>

                  <div className="rounded-2xl border border-zinc-800 bg-zinc-900/70 px-5 py-4 transition-transform duration-300 hover:-translate-y-1">
                    <p className="text-xs text-zinc-500">
                      Execution Grade
                    </p>

                    <h3 className="font-bold mt-1">
                      {
                        data.analytics
                          .executionGrade
                      }
                    </h3>
                  </div>
                </div>
              </div>

              {/* PROGRESS */}

              <div className="w-full lg:w-[360px] rounded-3xl border border-zinc-800 bg-black/40 p-6 backdrop-blur">
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <p className="text-sm text-zinc-500">
                      Overall Progress
                    </p>

                    <h2 className="text-5xl font-black mt-2">
                      {data.roadmap.progress}%
                    </h2>
                  </div>

                  <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-2xl motion-safe:animate-pulse">
                    🚀
                  </div>
                </div>

                <ProgressBar
                  value={data.roadmap.progress}
                />

                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-4 transition-transform duration-300 hover:-translate-y-1">
                    <p className="text-xs text-zinc-500">
                      Tasks Done
                    </p>

                    <h3 className="text-2xl font-bold mt-2">
                      {
                        data.analytics
                          .completedTasks
                      }
                    </h3>
                  </div>

                  <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-4 transition-transform duration-300 hover:-translate-y-1">
                    <p className="text-xs text-zinc-500">
                      Total Tasks
                    </p>

                    <h3 className="text-2xl font-bold mt-2">
                      {
                        data.analytics
                          .totalTasks
                      }
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* STATS */}

          <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                title: "Completed",
                value: `${data.analytics.completedTasks}/${data.analytics.totalTasks}`,
                icon: "✅",
              },

              {
                title: "Completion Rate",
                value: `${data.analytics.completionRate}%`,
                icon: "📈",
              },

              {
                title: "Execution Grade",
                value: data.analytics.executionGrade,
                icon: "🏆",
              },

              {
                title: "Streak",
                value: `${data.streak.current} Days`,
                icon: "🔥",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-3xl border border-zinc-800 bg-[#0D0D11] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-red-500/30"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-zinc-500">
                      {item.title}
                    </p>

                    <h3 className="text-2xl font-black mt-2">
                      {item.value}
                    </h3>
                  </div>

                  <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-xl">
                    {item.icon}
                  </div>
                </div>
              </div>
            ))}
          </section>

          {/* WEEKLY TRACKER */}

          <section className="grid gap-4 lg:grid-cols-[1.3fr_1fr]">
            <div className="rounded-3xl border border-zinc-800 bg-[#0D0D11] p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold">
                    Weekly Tracker
                  </h2>

                  <p className="text-sm text-zinc-500 mt-1">
                    {data.streak.current} day streak in progress
                  </p>
                </div>

                <div className="flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 motion-safe:animate-pulse" />
                  Active
                </div>
              </div>

              <div className="mt-6 grid grid-cols-7 gap-3">
                {weekDays.map((day) => (
                  <div
                    key={day.key}
                    className="flex flex-col items-center gap-2"
                  >
                    <div
                      className={`h-12 w-12 rounded-2xl border text-sm font-semibold flex items-center justify-center transition-all duration-300 ${
                        day.completed
                          ? "border-emerald-500/60 bg-emerald-500/15 text-emerald-300 shadow-[0_0_20px_rgba(16,185,129,0.25)]"
                          : "border-zinc-700 bg-zinc-900 text-zinc-400"
                      }`}
                    >
                      {day.completed ? "✓" : ""}
                    </div>

                    <span className="text-xs text-zinc-500">
                      {day.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-zinc-800 bg-gradient-to-br from-[#0D0D11] to-[#0A0A0F] p-6">
              <h3 className="text-lg font-semibold">
                Momentum Snapshot
              </h3>

              <p className="text-sm text-zinc-500 mt-2">
                Keep the cadence strong by closing one key task
                before noon.
              </p>

              <div className="mt-6 space-y-4">
                <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-4">
                  <p className="text-xs text-zinc-500">
                    Tasks Today
                  </p>

                  <div className="flex items-center justify-between mt-2">
                    <h4 className="text-2xl font-bold">
                      {completedToday}/{data.tasks.today.length}
                    </h4>

                    <span className="text-xs text-zinc-400">
                      done
                    </span>
                  </div>
                </div>

                <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-4">
                  <p className="text-xs text-zinc-500">
                    Roadmap Progress
                  </p>

                  <div className="flex items-center justify-between mt-2">
                    <h4 className="text-2xl font-bold">
                      {data.roadmap.progress}%
                    </h4>

                    <span className="text-xs text-zinc-400">
                      complete
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* TODAY TASKS */}

          <section className="rounded-3xl border border-zinc-800 bg-[#0D0D11] p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold">
                  Today's Plan
                </h2>

                <p className="text-sm text-zinc-500 mt-1">
                  {completedToday} of{" "}
                  {data.tasks.today.length} tasks
                  completed
                </p>
              </div>
            </div>

            {data.tasks.today.length === 0 ? (
              <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-8 text-center">
                <p className="text-zinc-400">
                  No tasks available for today.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {data.tasks.today.map(
                  (task) => (
                    <div
                      key={task.id}
                      className={`rounded-2xl border border-zinc-800 bg-zinc-900/50 p-5 transition-all duration-300 ${
                        task.completed
                          ? "cursor-default opacity-70"
                          : "cursor-pointer hover:-translate-y-1 hover:border-emerald-500/40"
                      }`}
                      onClick={() => handleTaskComplete(task)}
                    >
                      <div className="flex items-center justify-between gap-5">
                        <div className="flex items-center gap-4">
                          <div
                            className={`w-6 h-6 rounded-lg border flex items-center justify-center ${
                              task.completed
                                ? "bg-emerald-500 border-emerald-500"
                                : "border-zinc-700"
                            }`}
                          >
                            {(task.completed || updatingTaskId === task.id) && "✓"}
                          </div>

                          <div>
                            <h3 className="font-bold text-lg">
                              {task.title}
                            </h3>

                            <p className="text-zinc-500 text-sm mt-1">
                              ⏱{" "}
                              {
                                task.estimatedMinutes
                              }{" "}
                              mins
                            </p>
                          </div>
                        </div>

                        <div
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            task.completed
                              ? "bg-emerald-500/10 border border-emerald-500/30 text-emerald-400"
                              : updatingTaskId === task.id
                              ? "bg-blue-500/10 border border-blue-500/30 text-blue-400"
                              : "bg-yellow-500/10 border border-yellow-500/30 text-yellow-400"
                          }`}
                        >
                          {task.completed
                            ? "Completed"
                            : updatingTaskId === task.id
                            ? "Updating"
                            : "Pending"}
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>
            )}
          </section>
        </main>
      </div>
    </div>
  );
}