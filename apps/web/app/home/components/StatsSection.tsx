import StatCard from "./StatCard";
import { statCards } from "../data";

export default function StatsSection() {
  return (
    <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
      {statCards.map((card) => (
        <StatCard key={card.title} {...card} />
      ))}
    </section>
  );
}
