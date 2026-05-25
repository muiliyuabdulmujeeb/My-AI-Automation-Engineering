import { Link } from "react-router-dom";
import { curriculum } from "../data/curriculum";
import { learningPaths } from "../data/premiumContent";
import { useProgress } from "../hooks/useProgress";
import { ProgressBar } from "../components/UI/ProgressBar";

export function LearningPathsPage() {
  const { progress, setActiveLearningPath } = useProgress();

  return (
    <section className="page-stack">
      <div className="section-heading">
        <div>
          <span className="eyebrow">Guided learning</span>
          <h2>Learning paths</h2>
          <p className="muted">Use paths when you want a focused route through the bootcamp instead of browsing all parts.</p>
        </div>
      </div>

      <div className="card-grid">
        {learningPaths.map((path) => {
          const completedParts = path.partIds.filter((id) => progress.completedPartIds.includes(id)).length;
          const percentage = Math.round((completedParts / path.partIds.length) * 100);
          return (
            <article className={`curriculum-card ${progress.activeLearningPathId === path.id ? "current-card" : ""}`} key={path.id}>
              <div>
                <span className="eyebrow">{progress.activeLearningPathId === path.id ? "Active path" : "Learning path"}</span>
                <h3>{path.title}</h3>
                <p>{path.goal}</p>
              </div>
              <ProgressBar value={percentage} label="Path progress" />
              <div>
                <h4>Parts included</h4>
                <ul className="check-list">
                  {path.partIds.map((partId) => {
                    const part = curriculum.find((item) => item.id === partId);
                    return part ? (
                      <li key={partId}>
                        <Link className="text-link" to={`/parts/${part.id}`}>
                          Part {part.partNumber}: {part.title}
                        </Link>
                      </li>
                    ) : null;
                  })}
                </ul>
              </div>
              <button className="button button-secondary" type="button" onClick={() => setActiveLearningPath(path.id)}>
                {progress.activeLearningPathId === path.id ? "Current Path" : "Set Active Path"}
              </button>
            </article>
          );
        })}
      </div>
    </section>
  );
}
