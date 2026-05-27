import type { LucideIcon } from "lucide-react";
import { CheckSquare, Flame, Target, TrendingUp } from "lucide-react";

export type Member = {
  name: string;
  score: string;
  image: string;
  badge?: boolean;
};

export type StatCardData = {
  title: string;
  value: string;
  sub: string;
  icon: LucideIcon;
};

export const members: Member[] = [
  {
    name: "You",
    score: "87%",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400",
    badge: true,
  },
  {
    name: "Rohit S.",
    score: "84%",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400",
  },
  {
    name: "Ananya P.",
    score: "82%",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400",
  },
  {
    name: "Vikram M.",
    score: "78%",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400",
  },
  {
    name: "Sneha K.",
    score: "76%",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=400",
  },
];

export const activities = [
  "Rohit S. uploaded a proof",
  "Ananya P. completed a task",
  "Vikram M. reached a 15 day streak",
  "Sneha K. joined the circle",
];

export const statCards: StatCardData[] = [
  { title: "Average Progress", value: "72%", sub: "+8% this week", icon: Target },
  { title: "Avg Consistency", value: "82%", sub: "+6% this week", icon: Flame },
  { title: "Tasks Completed", value: "128", sub: "+18 this week", icon: CheckSquare },
  {
    title: "Current Streak",
    value: "14 Days",
    sub: "Best: 21 Days",
    icon: TrendingUp,
  },
];

export const insightBars = [30, 50, 45, 75, 55, 90, 120];
