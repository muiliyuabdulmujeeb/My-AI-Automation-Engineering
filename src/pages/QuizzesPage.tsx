import { Link } from "react-router-dom";
import { curriculum } from "../data/curriculum";
import { quizzes } from "../data/premiumContent";
import { useProgress } from "../hooks/useProgress";
import { StatusBadge } from "../components/UI/StatusBadge";

export function QuizzesPage() {
  const { progress } = useProgress();

  return (
    <section className="page-stack">
      <div className="section-heading">
        <div>
          <span className="eyebrow">Checkpoints</span>
          <h2>Quizzes</h2>
          <p className="muted">Scenario-based questions that test whether you can make good automation decisions.</p>
        </div>
      </div>
      <div className="card-grid">
        {quizzes.map((quiz) => {
          const part = curriculum.find((item) => item.id === quiz.partId);
          const complete = progress.completedQuizIds.includes(quiz.id);
          return (
            <Link className={`curriculum-card ${complete ? "project-complete" : ""}`} key={quiz.id} to={`/quizzes/${quiz.id}`}>
              <div className="card-topline">
                <span>{part ? `Part ${part.partNumber}` : quiz.partId}</span>
                <StatusBadge status={complete ? "Completed" : "Not Started"} />
              </div>
              <h3>{quiz.title}</h3>
              <p>{quiz.questions.length} practical questions with explanations.</p>
              {complete ? <p>Best score: {progress.quizScores[quiz.id] ?? 0}%</p> : null}
            </Link>
          );
        })}
      </div>
    </section>
  );
}
