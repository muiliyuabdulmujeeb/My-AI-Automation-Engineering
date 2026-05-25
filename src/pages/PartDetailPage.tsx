import { ArrowLeft, Play } from "lucide-react";
import { Link, Navigate, useParams } from "react-router-dom";
import { curriculum } from "../data/curriculum";
import { labs, quizzes } from "../data/premiumContent";
import { useProgress } from "../hooks/useProgress";
import { calculatePartProgress } from "../utils/progress";
import { ProgressBar } from "../components/UI/ProgressBar";
import { StatusBadge } from "../components/UI/StatusBadge";

export function PartDetailPage() {
  const { partId } = useParams();
  const { progress, toggleExercise, toggleMiniProject } = useProgress();
  const part = curriculum.find((item) => item.id === partId);

  if (!part) {
    return <Navigate to="/" replace />;
  }

  const partProgress = calculatePartProgress(part, progress);
  const nextLesson = part.lessons.find((lesson) => !progress.completedLessonIds.includes(lesson.id)) ?? part.lessons[0];
  const partLabs = labs.filter((lab) => lab.partId === part.id);
  const partQuizzes = quizzes.filter((quiz) => quiz.partId === part.id);

  return (
    <section className="page-stack">
      <Link className="text-link" to="/">
        <ArrowLeft size={16} />
        Back to dashboard
      </Link>

      <div className="detail-header">
        <div>
          <span className="eyebrow">Part {part.partNumber}</span>
          <h2>{part.title}</h2>
          <p>{part.description}</p>
          <div className="pill-row">
            <span>{part.difficulty}</span>
            <span>{part.estimatedTime}</span>
            <StatusBadge status={partProgress.status} />
          </div>
        </div>
        {nextLesson ? (
          <Link className="button button-primary" to={`/parts/${part.id}/lessons/${nextLesson.id}`}>
            <Play size={16} />
            Start / Continue
          </Link>
        ) : null}
      </div>

      <ProgressBar value={partProgress.percentage} label="Part progress" />

      {partProgress.percentage === 100 ? (
        <div className="celebration-panel">
          <strong>Part completed</strong>
          <p>You have completed every lesson, exercise, and mini-project in this stage.</p>
        </div>
      ) : null}

      <div className="two-column">
        <div className="content-panel">
          <h3>Skills you are gaining</h3>
          <ul className="check-list">
            {part.skills.map((skill) => (
              <li key={skill}>{skill}</li>
            ))}
          </ul>
        </div>
        <div className="content-panel">
          <h3>What you will build</h3>
          <ul className="check-list">
            {part.whatYouWillBuild.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="two-column">
        <div className="content-panel">
          <span className="eyebrow">Real business use case</span>
          <p>{part.realBusinessUseCase}</p>
        </div>
        <div className="content-panel">
          <span className="eyebrow">Common beginner trap</span>
          <p>{part.commonBeginnerTrap}</p>
        </div>
      </div>

      <div className="two-column">
        <div className="content-panel">
          <h3>Hands-on labs</h3>
          {partLabs.length ? (
            partLabs.map((lab) => (
              <Link className="list-row" key={lab.id} to={`/labs/${lab.id}`}>
                <span>Lab</span>
                <div>
                  <strong>{lab.title}</strong>
                  <p>{lab.goal}</p>
                </div>
                <StatusBadge status={progress.completedLabIds.includes(lab.id) ? "Completed" : "Not Started"} />
              </Link>
            ))
          ) : (
            <p className="muted">No premium lab is attached to this part yet.</p>
          )}
        </div>
        <div className="content-panel">
          <h3>Quiz checkpoints</h3>
          {partQuizzes.length ? (
            partQuizzes.map((quiz) => (
              <Link className="list-row" key={quiz.id} to={`/quizzes/${quiz.id}`}>
                <span>Quiz</span>
                <div>
                  <strong>{quiz.title}</strong>
                  <p>{quiz.questions.length} scenario questions</p>
                </div>
                <StatusBadge status={progress.completedQuizIds.includes(quiz.id) ? "Completed" : "Not Started"} />
              </Link>
            ))
          ) : (
            <p className="muted">No quiz checkpoint is attached to this part yet.</p>
          )}
        </div>
      </div>

      <div className="content-panel">
        <h3>Lessons</h3>
        <div className="item-list">
          {part.lessons.map((lesson, index) => (
            <Link key={lesson.id} className="list-row" to={`/parts/${part.id}/lessons/${lesson.id}`}>
              <span>{index + 1}</span>
              <div>
                <strong>{lesson.title}</strong>
                <p>{lesson.summary}</p>
              </div>
              <StatusBadge status={progress.completedLessonIds.includes(lesson.id) ? "Completed" : "Not Started"} />
            </Link>
          ))}
        </div>
      </div>

      <div className="two-column">
        <div className="content-panel">
          <h3>Exercises</h3>
          {part.exercises.map((exercise) => (
            <div className="task-box" key={exercise.id}>
              <div>
                <strong>{exercise.title}</strong>
                <p>{exercise.description}</p>
                <span className="tag">{exercise.difficulty}</span>
              </div>
              <button className="button button-secondary" type="button" onClick={() => toggleExercise(exercise.id)}>
                {progress.completedExerciseIds.includes(exercise.id) ? "Completed" : "Mark Complete"}
              </button>
            </div>
          ))}
        </div>
        <div className="content-panel">
          <h3>Mini-projects</h3>
          {part.miniProjects.map((project) => (
            <div className="task-box" key={project.id}>
              <div>
                <strong>{project.title}</strong>
                <p>{project.description}</p>
              </div>
              <button className="button button-secondary" type="button" onClick={() => toggleMiniProject(project.id)}>
                {progress.completedMiniProjectIds.includes(project.id) ? "Completed" : "Mark Complete"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
