import { Link } from "react-router-dom";
import { curriculum } from "../data/curriculum";
import { useProgress } from "../hooks/useProgress";

export function NotesPage() {
  const { progress } = useProgress();
  const lessonsWithNotes = curriculum.flatMap((part) =>
    part.lessons
      .filter((lesson) => (progress.notesByLessonId[lesson.id] ?? "").trim().length > 0)
      .map((lesson) => ({ part, lesson, note: progress.notesByLessonId[lesson.id] })),
  );

  return (
    <section className="page-stack">
      <div className="section-heading">
        <div>
          <span className="eyebrow">Study notes</span>
          <h2>Your lesson notes</h2>
        </div>
      </div>
      {lessonsWithNotes.length === 0 ? (
        <div className="empty-state">Notes you write inside lessons will appear here, grouped by roadmap part.</div>
      ) : (
        <div className="notes-list">
          {lessonsWithNotes.map(({ part, lesson, note }) => (
            <article className="content-panel" key={lesson.id}>
              <span className="eyebrow">Part {part.partNumber}: {part.title}</span>
              <h3>{lesson.title}</h3>
              <p>{note}</p>
              <Link className="text-link" to={`/parts/${part.id}/lessons/${lesson.id}`}>Open lesson</Link>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
