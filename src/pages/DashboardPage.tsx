import { Link } from "react-router-dom";
import { useMemo, useState } from "react";
import { curriculum } from "../data/curriculum";
import { useProgress } from "../hooks/useProgress";
import { calculateOverallProgress, calculatePartProgress, getActivityStreak, getContinueTarget } from "../utils/progress";
import { ProgressBar } from "../components/UI/ProgressBar";
import { StatusBadge } from "../components/UI/StatusBadge";
import type { Difficulty } from "../types/curriculum";

const statusOptions = ["All", "Not Started", "In Progress", "Completed"] as const;
const difficultyOptions: Array<"All" | Difficulty> = ["All", "Beginner", "Intermediate", "Advanced", "Project"];

export function DashboardPage() {
  const { progress } = useProgress();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<(typeof statusOptions)[number]>("All");
  const [difficultyFilter, setDifficultyFilter] = useState<(typeof difficultyOptions)[number]>("All");
  const overall = calculateOverallProgress(progress);
  const continueTarget = getContinueTarget(progress);
  const streak = getActivityStreak(progress.activityDates);

  const filteredCurriculum = useMemo(() => {
    const query = search.trim().toLowerCase();

    return curriculum.filter((part) => {
      const partProgress = calculatePartProgress(part, progress);
      const searchable = [
        part.title,
        part.description,
        part.difficulty,
        ...part.skills,
        ...part.lessons.map((lesson) => `${lesson.title} ${lesson.summary}`),
      ]
        .join(" ")
        .toLowerCase();

      const matchesSearch = query.length === 0 || searchable.includes(query);
      const matchesStatus = statusFilter === "All" || partProgress.status === statusFilter;
      const matchesDifficulty = difficultyFilter === "All" || part.difficulty === difficultyFilter;

      return matchesSearch && matchesStatus && matchesDifficulty;
    });
  }, [difficultyFilter, progress, search, statusFilter]);

  return (
    <section className="page-stack">
      <div className="hero-band">
        <div>
          <span className="eyebrow">Full Stack + AI Integrations</span>
          <h2>Build practical AI automation systems, one stage at a time.</h2>
          <p>
            Track lessons, exercises, mini-projects, notes, and portfolio readiness across the full 27-part AI Automation Engineer roadmap.
          </p>
        </div>
        <div className="hero-actions">
          {continueTarget ? (
            <Link className="button button-primary" to={`/parts/${continueTarget.partId}/lessons/${continueTarget.lessonId}`}>
              Continue Learning
            </Link>
          ) : null}
          <Link className="button button-secondary" to="/progress">
            View Progress
          </Link>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-panel">
          <span>Overall progress</span>
          <strong>{overall.percentage}%</strong>
        </div>
        <div className="stat-panel">
          <span>Completed parts</span>
          <strong>{progress.completedPartIds.length}</strong>
        </div>
        <div className="stat-panel">
          <span>Remaining parts</span>
          <strong>{Math.max(0, curriculum.length - progress.completedPartIds.length)}</strong>
        </div>
        <div className="stat-panel">
          <span>Learning activity</span>
          <strong>{streak} day streak</strong>
        </div>
      </div>

      <ProgressBar value={overall.percentage} label="Roadmap completion" />

      <div className="section-heading">
        <div>
          <span className="eyebrow">Curriculum Dashboard</span>
          <h3>All roadmap parts</h3>
        </div>
      </div>

      <div className="filter-panel">
        <label>
          <span>Search lessons</span>
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search APIs, CRM, agents, deployment..."
          />
        </label>
        <label>
          <span>Status</span>
          <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value as typeof statusFilter)}>
            {statusOptions.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </label>
        <label>
          <span>Difficulty</span>
          <select value={difficultyFilter} onChange={(event) => setDifficultyFilter(event.target.value as typeof difficultyFilter)}>
            {difficultyOptions.map((difficulty) => (
              <option key={difficulty} value={difficulty}>
                {difficulty}
              </option>
            ))}
          </select>
        </label>
      </div>

      {curriculum.length === 0 ? (
        <div className="empty-state">Curriculum content will appear here after Phase 3.</div>
      ) : filteredCurriculum.length === 0 ? (
        <div className="empty-state">No roadmap parts match the current filters.</div>
      ) : (
        <div className="card-grid">
          {filteredCurriculum.map((part) => {
            const partProgress = calculatePartProgress(part, progress);
            const isCurrent = progress.currentPartId === part.id;
            return (
              <Link className={`curriculum-card ${isCurrent ? "current-card" : ""}`} key={part.id} to={`/parts/${part.id}`}>
                <div className="card-topline">
                  <span>{isCurrent ? "Current stage" : `Part ${part.partNumber}`}</span>
                  <StatusBadge status={partProgress.status} />
                </div>
                <h4>{part.title}</h4>
                <p>{part.description}</p>
                <div className="card-meta">
                  <span>{part.difficulty}</span>
                  <span>{part.estimatedTime}</span>
                  <span>{part.lessons.length} lessons</span>
                  <span>{part.exercises.length} exercises</span>
                  <span>{part.miniProjects.length} projects</span>
                </div>
                <ProgressBar value={partProgress.percentage} label="Part progress" />
              </Link>
            );
          })}
        </div>
      )}
    </section>
  );
}
