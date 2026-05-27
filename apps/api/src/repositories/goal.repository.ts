import { supabase }
from "../lib/supabase.js";

export class GoalRepository {
  static async createGoal(data: any) {
    const { data: goal, error } =
      await supabase
        .from("user_goals")
        .insert(data)
        .select()
        .single();

    if (error) throw error;

    return goal;
  }
}