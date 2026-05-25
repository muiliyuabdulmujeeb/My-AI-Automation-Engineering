import { curriculum } from "../data/curriculum";
import { ProgressBar } from "../components/UI/ProgressBar";
import { StatusBadge } from "../components/UI/StatusBadge";
import { useProgress } from "../hooks/useProgress";
import { calculateOverallProgress, calculatePartProgress, getActivityStreak } from "../utils/progress";
import { Link } from "react-router-dom";

export function ProgressPage() {
  const { progress, resetProgress } = useProgress();
  const overall = calculateOverallProgress(progress);
  const streak = getActivityStreak(progress.activityDates);
  const startedParts = curriculum.filter((part) => calculatePartProgress(part, progress).status === "In Progress");
  const notStartedParts = curriculum.filter((part) => calculatePartProgress(part, progress).status === "Not Started");
  const currentPart = curriculum.find((part) => part.id === progress.currentPartId);
  const currentLesson = currentPart?.lessons.find((lesson) => lesson.id === progress.currentLessonId);

  return (
    <section className="page-stack">
      <div className="section-heading">
        <div>
          <span className="eyebrow">Learning analytics</span>
          <h2>Your progress</h2>
        </div>
        <button className="button button-danger" type="button" onClick={resetProgress}>
          Reset progress
        </button>
      </div>

      <ProgressBar value={overall.percentage} label="Overall completion" />

      <div className="stats-grid">
        <div className="stat-panel"><span>Lessons completed</span><strong>{progress.completedLessonIds.length}</strong></div>
        <div className="stat-panel"><span>Exercises completed</span><strong>{progress.completedExerciseIds.length}</strong></div>
        <div className="stat-panel"><span>Mini-projects completed</span><strong>{progress.completedMiniProjectIds.length}</strong></div>
        <div className="stat-panel"><span>Parts completed</span><strong>{progress.completedPartIds.length}</strong></div>
        <div className="stat-panel"><span>Current streak</span><strong>{streak} days</strong></div>
      </div>

      <div className="two-column">
        <div className="content-panel">
          <h3>Last opened lesson</h3>
          {currentPart && currentLesson ? (
            <>
              <p>
                Part {currentPart.partNumber}: {currentPart.title}
              </p>
              <Link className="text-link" to={`/parts/${currentPart.id}/lessons/${currentLesson.id}`}>
                Continue {currentLesson.title}
              </Link>
            </>
          ) : (
            <p className="muted">No lesson opened yet.</p>
          )}
        </div>
        <div className="content-panel">
          <h3>Activity</h3>
          <p>{progress.activityDates.length} active study days recorded on this device.</p>
          <p className="muted">Last visited: {progress.lastVisitedAt ? new Date(progress.lastVisitedAt).toLocaleString() : "Not available"}</p>
        </div>
      </div>

      <div className="two-column">
        <div className="content-panel">
          <h3>In-progress parts</h3>
          {startedParts.length ? startedParts.map((part) => <p key={part.id}>{part.partNumber}. {part.title}</p>) : <p className="muted">No parts in progress yet.</p>}
        </div>
        <div className="content-panel">
          <h3>Not started parts</h3>
          {notStartedParts.slice(0, 8).map((part) => <p key={part.id}>{part.partNumber}. {part.title}</p>)}
          {notStartedParts.length > 8 ? <p className="muted">And {notStartedParts.length - 8} more.</p> : null}
        </div>
      </div>

      <div className="content-panel">
        <h3>Part-by-part progress</h3>
        <div className="item-list">
          {curriculum.map((part) => {
            const partProgress = calculatePartProgress(part, progress);
            return (
              <div className="list-row" key={part.id}>
                <span>{part.partNumber}</span>
                <div>
                  <strong>{part.title}</strong>
                  <ProgressBar value={partProgress.percentage} />
                </div>
                <StatusBadge status={partProgress.status} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
