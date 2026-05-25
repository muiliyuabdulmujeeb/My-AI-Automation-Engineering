import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { quizzes } from "../data/premiumContent";
import { useProgress } from "../hooks/useProgress";

export function QuizDetailPage() {
  const { quizId } = useParams();
  const { progress, completeQuiz } = useProgress();
  const quiz = quizzes.find((item) => item.id === quizId);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  if (!quiz) {
    return <Navigate to="/quizzes" replace />;
  }

  const correctCount = quiz.questions.filter((question) => answers[question.id] === question.correctAnswer).length;
  const score = Math.round((correctCount / quiz.questions.length) * 100);

  const submitQuiz = () => {
    setSubmitted(true);
    completeQuiz(quiz.id, score);
  };

  return (
    <section className="page-stack">
      <Link className="text-link" to="/quizzes">
        <ArrowLeft size={16} />
        Back to quizzes
      </Link>
      <div className="detail-header">
        <div>
          <span className="eyebrow">Quiz</span>
          <h2>{quiz.title}</h2>
          <p>Answer like you are designing or debugging a real business automation system.</p>
        </div>
        {progress.completedQuizIds.includes(quiz.id) ? <div className="stat-panel"><span>Saved score</span><strong>{progress.quizScores[quiz.id]}%</strong></div> : null}
      </div>

      {quiz.questions.map((question, index) => (
        <article className="content-panel" key={question.id}>
          <span className="eyebrow">{question.type.replace("_", " ")} · Question {index + 1}</span>
          <h3>{question.question}</h3>
          <div className="option-list">
            {(question.options ?? ["True", "False"]).map((option) => (
              <label className="option-row" key={option}>
                <input
                  type="radio"
                  name={question.id}
                  value={option}
                  checked={answers[question.id] === option}
                  onChange={() => setAnswers((current) => ({ ...current, [question.id]: option }))}
                />
                <span>{option}</span>
              </label>
            ))}
          </div>
          {submitted ? (
            <aside className={answers[question.id] === question.correctAnswer ? "info-box accent" : "workflow-box"}>
              <strong>{answers[question.id] === question.correctAnswer ? "Correct" : "Review this"}</strong>
              <p>{question.explanation}</p>
            </aside>
          ) : null}
        </article>
      ))}

      <button className="button button-primary" type="button" onClick={submitQuiz}>
        Submit Quiz
      </button>
    </section>
  );
}
