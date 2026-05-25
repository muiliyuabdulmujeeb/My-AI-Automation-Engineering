import { Link } from "react-router-dom";
import { curriculum } from "../data/curriculum";
import { labs } from "../data/premiumContent";
import { useProgress } from "../hooks/useProgress";
import { StatusBadge } from "../components/UI/StatusBadge";

export function LabsPage() {
  const { progress } = useProgress();

  return (
    <section className="page-stack">
      <div className="section-heading">
        <div>
          <span className="eyebrow">Hands-on practice</span>
          <h2>Labs</h2>
          <p className="muted">Build practical pieces of AI automation systems with clear steps, expected outputs, and debugging checks.</p>
        </div>
      </div>
      <div className="card-grid">
        {labs.map((lab) => {
          const part = curriculum.find((item) => item.id === lab.partId);
          const complete = progress.completedLabIds.includes(lab.id);
          return (
            <Link className={`curriculum-card ${complete ? "project-complete" : ""}`} key={lab.id} to={`/labs/${lab.id}`}>
              <div className="card-topline">
                <span>{part ? `Part ${part.partNumber}` : lab.partId}</span>
                <StatusBadge status={complete ? "Completed" : "Not Started"} />
              </div>
              <h3>{lab.title}</h3>
              <p>{lab.goal}</p>
              <div className="card-meta">
                <span>{lab.difficulty}</span>
                <span>{lab.estimatedTime}</span>
                <span>{lab.toolsUsed.slice(0, 2).join(", ")}</span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
