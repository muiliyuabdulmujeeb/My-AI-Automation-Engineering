import { skillChecks } from "../data/premiumContent";
import { useProgress } from "../hooks/useProgress";
import { StatusBadge } from "../components/UI/StatusBadge";

export function SkillChecksPage() {
  const { progress, toggleSkillCheck } = useProgress();

  return (
    <section className="page-stack">
      <div className="section-heading">
        <div>
          <span className="eyebrow">Scenario tests</span>
          <h2>Skill checks</h2>
          <p className="muted">Use these to practice architecture, debugging, and client-style explanation before portfolio builds.</p>
        </div>
      </div>

      {skillChecks.map((check) => {
        const complete = progress.completedSkillCheckIds.includes(check.id);
        return (
          <article className={`project-card ${complete ? "project-complete" : ""}`} key={check.id}>
            <div className="card-topline">
              <span className="eyebrow">{check.level}</span>
              <StatusBadge status={complete ? "Completed" : "Not Started"} />
            </div>
            <h3>{check.title}</h3>
            <p>{check.scenario}</p>
            <div className="two-column">
              <div>
                <h4>Task</h4>
                <p>{check.task}</p>
                <h4>Requirements</h4>
                <ul className="check-list">{check.requirements.map((item) => <li key={item}>{item}</li>)}</ul>
              </div>
              <div>
                <h4>Expected solution outline</h4>
                <ul className="check-list">{check.expectedSolutionOutline.map((item) => <li key={item}>{item}</li>)}</ul>
              </div>
            </div>
            <div>
              <h4>Rubric</h4>
              <div className="rubric-grid">
                {check.gradingRubric.map((item) => (
                  <div className="rubric-card" key={item.category}>
                    <strong>{item.category}</strong>
                    <p><b>Good:</b> {item.good}</p>
                    <p><b>Excellent:</b> {item.excellent}</p>
                  </div>
                ))}
              </div>
            </div>
            <button className="button button-secondary" type="button" onClick={() => toggleSkillCheck(check.id)}>
              {complete ? "Skill Check Completed" : "Mark Skill Check Complete"}
            </button>
          </article>
        );
      })}
    </section>
  );
}
