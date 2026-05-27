import ActivityCard from "./ActivityCard";
import ChangeCard from "./ChangeCard";
import InsightsCard from "./InsightsCard";

export default function RightRail() {
  return (
    <aside className="space-y-6">
      <InsightsCard />
      <ActivityCard />
      <ChangeCard />
    </aside>
  );
}
