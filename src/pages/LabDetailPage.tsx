import { ArrowLeft } from "lucide-react";
import { Link, Navigate, useParams } from "react-router-dom";
import { CodeBlock } from "../components/UI/CodeBlock";
import { labs } from "../data/premiumContent";
import { useProgress } from "../hooks/useProgress";

export function LabDetailPage() {
  const { labId } = useParams();
  const { progress, toggleLab } = useProgress();
  const lab = labs.find((item) => item.id === labId);

  if (!lab) {
    return <Navigate to="/labs" replace />;
  }

  const complete = progress.completedLabIds.includes(lab.id);

  return (
    <section className="page-stack">
      <Link className="text-link" to="/labs">
        <ArrowLeft size={16} />
        Back to labs
      </Link>
      <div className="detail-header">
        <div>
          <span className="eyebrow">{lab.difficulty} lab · {lab.estimatedTime}</span>
          <h2>{lab.title}</h2>
          <p>{lab.businessScenario}</p>
        </div>
        <button className="button button-primary" type="button" onClick={() => toggleLab(lab.id)}>
          {complete ? "Lab Completed" : "Mark Lab Complete"}
        </button>
      </div>

      <div className="content-panel">
        <h3>Goal</h3>
        <p>{lab.goal}</p>
        <h3>Prerequisites</h3>
        <ul className="check-list">{lab.prerequisites.map((item) => <li key={item}>{item}</li>)}</ul>
        <h3>Tools used</h3>
        <div className="pill-row">{lab.toolsUsed.map((tool) => <span key={tool}>{tool}</span>)}</div>
      </div>

      {lab.steps.map((step, index) => (
        <article className="lesson-section" key={step.title}>
          <span className="eyebrow">Step {index + 1}</span>
          <h3>{step.title}</h3>
          <p>{step.explanation}</p>
          <ul className="check-list">{step.instructions.map((item) => <li key={item}>{item}</li>)}</ul>
          {step.code ? <CodeBlock code={step.code} /> : null}
          {step.expectedResult ? <aside className="info-box accent"><strong>Expected result</strong><p>{step.expectedResult}</p></aside> : null}
        </article>
      ))}

      <div className="two-column">
        <div className="content-panel">
          <h3>Expected output</h3>
          <ul className="check-list">{lab.expectedOutput.map((item) => <li key={item}>{item}</li>)}</ul>
        </div>
        <div className="content-panel">
          <h3>Debugging checks</h3>
          <ul className="check-list">{lab.debuggingChecks.map((item) => <li key={item}>{item}</li>)}</ul>
        </div>
      </div>

      <div className="two-column">
        <div className="content-panel">
          <h3>Completion criteria</h3>
          <ul className="check-list">{lab.completionCriteria.map((item) => <li key={item}>{item}</li>)}</ul>
        </div>
        <div className="content-panel">
          <h3>Portfolio value</h3>
          <p>{lab.portfolioValue}</p>
        </div>
      </div>
    </section>
  );
}
