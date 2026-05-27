// services/dailyTask.service.ts

import { supabase } from "../../lib/supabase.js";

export class DailyTaskService {
  // =========================================================
  // GENERATE DAILY TASKS
  // =========================================================

  async generateDailyTasks(userId: string) {
    const today = new Date();

    const todayStr = today.toISOString().split("T")[0];

    // =========================================================
    // CHECK IF TODAY TASKS ALREADY EXIST
    // =========================================================

    const { data: existingTasks } = await supabase
      .from("daily_tasks")
      .select("id")
      .eq("user_id", userId)
      .eq("scheduled_for", todayStr);

    if (existingTasks && existingTasks.length > 0) {
      return existingTasks;
    }

    // =========================================================
    // GET USER PROFILE
    // =========================================================

    const { data: profile } = await supabase
      .from("profiles")
      .select("daily_study_minutes")
      .eq("id", userId)
      .single();

    const dailyMinutes = profile?.daily_study_minutes || 120;

    // =========================================================
    // GET USER GOAL
    // =========================================================

    const { data: goal } = await supabase
      .from("user_goals")
      .select("id")
      .eq("user_id", userId)
      .order("created_at", {
        ascending: false,
      })
      .limit(1)
      .single();

    if (!goal) {
      throw new Error("Goal not found");
    }

    // =========================================================
    // GET ROADMAP
    // =========================================================

    const { data: roadmap } = await supabase
      .from("roadmaps")
      .select("id")
      .eq("goal_id", goal.id)
      .single();

    if (!roadmap) {
      throw new Error("Roadmap not found");
    }

    // =========================================================
    // GET CURRENT ACTIVE TASK
    // =========================================================

    const { data: currentTask } = await supabase
      .from("tasks")
      .select("*")
      .eq("roadmap_id", roadmap.id)
      .eq("completed", false)
      .order("task_order", {
        ascending: true,
      })
      .limit(1)
      .single();

    if (!currentTask) {
      return [];
    }

    // =========================================================
    // CALCULATE REMAINING MINUTES
    // =========================================================

    const remainingMinutes =
      currentTask.estimated_minutes - (currentTask.progress_minutes || 0);

    if (remainingMinutes <= 0) {
      return [];
    }

    // =========================================================
    // GENERATE TODAY SESSION
    // =========================================================

    const sessionMinutes = Math.min(dailyMinutes, remainingMinutes);

    const { data: dailyTask, error } = await supabase
      .from("daily_tasks")
      .insert({
        user_id: userId,

        roadmap_task_id: currentTask.id,

        title: currentTask.title,

        scheduled_for: todayStr,

        session_minutes: sessionMinutes,
      })
      .select()
      .single();

    if (error) {
      throw error;
    }

    return dailyTask;
  }

  // =========================================================
  // COMPLETE DAILY TASK
  // =========================================================

  async completeDailyTask(dailyTaskId: string, userId: string) {
    // =========================================================
    // GET DAILY TASK
    // =========================================================

    const { data: dailyTask } = await supabase
      .from("daily_tasks")
      .select("*")
      .eq("id", dailyTaskId)
      .eq("user_id", userId)
      .single();

    if (!dailyTask) {
      throw new Error("Daily task not found");
    }

    if (dailyTask.completed) {
      return dailyTask;
    }

    // =========================================================
    // MARK DAILY TASK COMPLETE
    // =========================================================
    const { data, error } = await supabase
      .from("daily_tasks")
      .update({
        completed: true,
        completed_at: new Date(),
      })
      .eq("id", dailyTaskId)
      .select();

    console.log(data);
    console.log(error);

    // =========================================================
    // UPDATE ROADMAP TASK PROGRESS
    // =========================================================

    const { data: roadmapTask } = await supabase
      .from("tasks")
      .select("*")
      .eq("id", dailyTask.roadmap_task_id)
      .single();

    const newProgress =
      (roadmapTask?.progress_minutes || 0) + dailyTask.session_minutes;

    const isCompleted = newProgress >= roadmapTask.estimated_minutes;

    await supabase
      .from("tasks")
      .update({
        progress_minutes: newProgress,

        completed: isCompleted,

        completed_at: isCompleted ? new Date() : null,
      })
      .eq("id", roadmapTask.id);

    // =========================================================
    // INSERT ACTIVITY LOG
    // =========================================================

    const todayStr = new Date().toISOString().split("T")[0];

    const { data: existingActivity } = await supabase
      .from("activity_logs")
      .select("id")
      .eq("user_id", userId)
      .gte("created_at", `${todayStr}T00:00:00`)
      .lt("created_at", `${todayStr}T23:59:59`)
      .maybeSingle();

    if (!existingActivity) {
      await supabase.from("activity_logs").insert({
        user_id: userId,
      });
    }

    // =========================================================
    // GENERATE NEXT DAILY TASK
    // =========================================================

    if (isCompleted) {
      await this.generateDailyTasks(userId);
    }

    return {
      success: true,
    };
  }
}

export const dailyTaskService = new DailyTaskService();
