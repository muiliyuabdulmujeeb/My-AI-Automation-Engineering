import { curriculum } from "../data/curriculum";
import { useProgress } from "../hooks/useProgress";

export function ProjectsPage() {
  const { progress, toggleMiniProject } = useProgress();
  const projectPart = curriculum.find((part) => part.partNumber === 26);
  const projects = projectPart?.miniProjects ?? [];

  return (
    <section className="page-stack">
      <div className="section-heading">
        <div>
          <span className="eyebrow">Portfolio Readiness</span>
          <h2>Full real-world projects</h2>
        </div>
      </div>
      {projects.length === 0 ? (
        <div className="empty-state">Project content will appear after the curriculum data phase.</div>
      ) : (
        <div className="project-list">
          {projects.map((project) => (
            <article className={`project-card ${progress.completedMiniProjectIds.includes(project.id) ? "project-complete" : ""}`} key={project.id}>
              <div>
                <span className="eyebrow">{project.businessProblem ?? "Business system"}</span>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
              </div>
              <div>
                <h4>Required skills</h4>
                <div className="pill-row">
                  {(project.requiredSkills ?? []).map((skill) => (
                    <span key={skill}>{skill}</span>
                  ))}
                </div>
              </div>
              <div>
                <h4>Deliverables</h4>
                <ul className="check-list">
                  {project.deliverables.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <button className="button button-secondary" type="button" onClick={() => toggleMiniProject(project.id)}>
                {progress.completedMiniProjectIds.includes(project.id) ? "Project Completed" : "Mark Project Complete"}
              </button>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
