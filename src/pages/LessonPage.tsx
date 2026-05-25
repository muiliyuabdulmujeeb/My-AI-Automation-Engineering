import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link, Navigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { curriculum } from "../data/curriculum";
import { CodeBlock } from "../components/UI/CodeBlock";
import { useProgress } from "../hooks/useProgress";
import { getAdjacentLessons } from "../utils/progress";

export function LessonPage() {
  const { partId, lessonId } = useParams();
  const { progress, setCurrentLesson, toggleLesson, toggleExercise, toggleMiniProject, saveNote } = useProgress();
  const part = curriculum.find((item) => item.id === partId);
  const lesson = part?.lessons.find((item) => item.id === lessonId);

  useEffect(() => {
    if (partId && lessonId) {
      setCurrentLesson(partId, lessonId);
    }
  }, [lessonId, partId, setCurrentLesson]);

  if (!part || !lesson || !partId || !lessonId) {
    return <Navigate to="/" replace />;
  }

  const adjacent = getAdjacentLessons(partId, lessonId);
  const exercise = part.exercises.find((item) => item.id === lesson.exerciseId) ?? part.exercises[0];
  const project = part.miniProjects.find((item) => item.id === lesson.miniProjectId) ?? part.miniProjects[0];
  const isLessonComplete = progress.completedLessonIds.includes(lesson.id);

  return (
    <article className="page-stack lesson-page">
      <Link className="text-link" to={`/parts/${part.id}`}>
        <ArrowLeft size={16} />
        Back to part
      </Link>

      <header className="lesson-header">
        <span className="eyebrow">Part {part.partNumber}</span>
        <h2>{lesson.title}</h2>
        <p>{lesson.summary}</p>
        <button className="button button-primary" type="button" onClick={() => toggleLesson(lesson.id)}>
          {isLessonComplete ? "Lesson Completed" : "Mark Lesson Complete"}
        </button>
      </header>

      {lesson.sections.map((section) => (
        <section className="lesson-section" key={section.heading}>
          <h3>{section.heading}</h3>
          <p>{section.content}</p>
          {section.analogy ? <aside className="info-box"><strong>Daily-life analogy</strong><p>{section.analogy}</p></aside> : null}
          {section.businessUseCase ? <aside className="info-box accent"><strong>Business automation use case</strong><p>{section.businessUseCase}</p></aside> : null}
          {section.workflowExample ? <aside className="workflow-box"><strong>Workflow example</strong><p>{section.workflowExample}</p></aside> : null}
          {section.code ? <CodeBlock code={section.code} /> : null}
          {section.beginnerMistakes?.length ? (
            <div className="lesson-list-box">
              <strong>Beginner mistakes to avoid</strong>
              <ul>
                {section.beginnerMistakes.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ) : null}
          {section.debuggingTips?.length ? (
            <div className="lesson-list-box">
              <strong>Debugging tips</strong>
              <ul>
                {section.debuggingTips.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ) : null}
          {section.mentalModel ? <aside className="info-box"><strong>Mental model</strong><p>{section.mentalModel}</p></aside> : null}
        </section>
      ))}

      <div className="two-column">
        {exercise ? (
          <div className="content-panel">
            <span className="eyebrow">Try this now</span>
            <h3>{exercise.title}</h3>
            <p>{exercise.description}</p>
            <button className="button button-secondary" type="button" onClick={() => toggleExercise(exercise.id)}>
              {progress.completedExerciseIds.includes(exercise.id) ? "Exercise Completed" : "Mark Exercise Complete"}
            </button>
          </div>
        ) : null}
        {project ? (
          <div className="content-panel">
            <span className="eyebrow">Mini-project</span>
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <ul className="check-list">
              {project.deliverables.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <button className="button button-secondary" type="button" onClick={() => toggleMiniProject(project.id)}>
              {progress.completedMiniProjectIds.includes(project.id) ? "Mini-Project Completed" : "Mark Mini-Project Complete"}
            </button>
          </div>
        ) : null}
      </div>

      <div className="content-panel">
        <h3>Lesson notes</h3>
        <textarea
          className="notes-input"
          value={progress.notesByLessonId[lesson.id] ?? ""}
          onChange={(event) => saveNote(lesson.id, event.target.value)}
          placeholder="Capture implementation details, reminders, or questions for this lesson."
        />
      </div>

      <nav className="lesson-nav" aria-label="Lesson navigation">
        {adjacent.previous ? (
          <Link className="button button-secondary" to={`/parts/${adjacent.previous.partId}/lessons/${adjacent.previous.lessonId}`}>
            <ArrowLeft size={16} />
            Previous
          </Link>
        ) : <span />}
        {adjacent.next ? (
          <Link className="button button-primary" to={`/parts/${adjacent.next.partId}/lessons/${adjacent.next.lessonId}`}>
            Next
            <ArrowRight size={16} />
          </Link>
        ) : null}
      </nav>
    </article>
  );
}
