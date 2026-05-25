import { Link } from "react-router-dom";
import { useMemo, useState } from "react";
import { portfolioProjects } from "../data/premiumContent";
import { useProgress } from "../hooks/useProgress";
import { StatusBadge } from "../components/UI/StatusBadge";
import type { ProjectDomain } from "../types/curriculum";

const domainOptions: Array<"All" | ProjectDomain> = [
  "All",
  "Fintech",
  "E-commerce",
  "Sales",
  "Operations",
  "CRM",
  "Support",
  "Productivity",
  "Data Intelligence",
];

export function ProjectsPage() {
  const { progress } = useProgress();
  const [domain, setDomain] = useState<"All" | ProjectDomain>("All");

  const filteredProjects = useMemo(
    () => portfolioProjects.filter((project) => domain === "All" || project.domain === domain),
    [domain],
  );

  return (
    <section className="page-stack">
      <div className="section-heading">
        <div>
          <span className="eyebrow">Portfolio hub</span>
          <h2>Premium portfolio projects</h2>
          <p className="muted">Serious business systems with architecture, schema, AI design, workflows, testing, deployment, rubrics, and demo guidance.</p>
        </div>
      </div>

      <div className="filter-panel">
        <label>
          <span>Domain</span>
          <select value={domain} onChange={(event) => setDomain(event.target.value as "All" | ProjectDomain)}>
            {domainOptions.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </label>
      </div>

      <div className="project-list">
        {filteredProjects.map((project) => {
          const complete = progress.completedPortfolioProjectIds.includes(project.id);
          return (
            <article className={`project-card ${complete ? "project-complete" : ""}`} key={project.id}>
              <div className="card-topline">
                <span className="eyebrow">{project.domain} · {project.difficulty}</span>
                <StatusBadge status={complete ? "Completed" : "Not Started"} />
              </div>
              <h3>{project.title}</h3>
              <p>{project.businessProblem}</p>
              <div className="pill-row">
                <span>{project.estimatedBuildTime}</span>
                <span>{project.coreFeatures.length} core features</span>
                <span>{project.deliverables.length} deliverables</span>
              </div>
              <p>{project.whatYouWillBuild}</p>
              <Link className="button button-primary" to={`/projects/${project.id}`}>
                Open Project Blueprint
              </Link>
            </article>
          );
        })}
      </div>
    </section>
  );
}
