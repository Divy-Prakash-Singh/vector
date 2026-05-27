import { supabase } from "../lib/supabase.js";

export class RoadmapRepository {
  static async createRoadmap(data: any) {
    const { data: roadmap, error } = await supabase
      .from("roadmaps")
      .insert(data)
      .select()
      .single();

    if (error) throw error;

    return roadmap;
  }

  static async createPhase(data: any) {
    const { data: phase, error } = await supabase
      .from("roadmap_phases")
      .insert(data)
      .select()
      .single();

    if (error) throw error;

    return phase;
  }

  static async createTask(data: any) {
    const { error } = await supabase.from("tasks").insert(data);

    if (error) throw error;
  }
}
