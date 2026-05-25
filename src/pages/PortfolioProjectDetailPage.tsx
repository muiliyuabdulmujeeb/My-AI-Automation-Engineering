import { ArrowLeft } from "lucide-react";
import { Link, Navigate, useParams } from "react-router-dom";
import { portfolioProjects } from "../data/premiumContent";
import { useProgress } from "../hooks/useProgress";

const listSections = [
  ["Target users", "targetUsers"],
  ["User stories", "userStories"],
  ["Core features", "coreFeatures"],
  ["Stretch features", "stretchFeatures"],
  ["Tools and stack", "toolsAndStack"],
  ["AI components", "aiComponents"],
  ["Automation components", "automationComponents"],
  ["Dashboard requirements", "dashboardRequirements"],
  ["Error handling", "errorHandling"],
  ["Testing plan", "testingPlan"],
  ["Deployment plan", "deploymentPlan"],
  ["Security considerations", "securityConsiderations"],
  ["Success metrics", "successMetrics"],
  ["Deliverables", "deliverables"],
  ["README outline", "readmeOutline"],
  ["Case study outline", "caseStudyOutline"],
  ["Demo script", "demoScript"],
  ["Upgrade ideas", "upgradeIdeas"],
] as const;

export function PortfolioProjectDetailPage() {
  const { projectId } = useParams();
  const { progress, togglePortfolioProject } = useProgress();
  const project = portfolioProjects.find((item) => item.id === projectId);

  if (!project) {
    return <Navigate to="/projects" replace />;
  }

  const complete = progress.completedPortfolioProjectIds.includes(project.id);

  return (
    <section className="page-stack">
      <Link className="text-link" to="/projects">
        <ArrowLeft size={16} />
        Back to projects
      </Link>
      <div className="detail-header">
        <div>
          <span className="eyebrow">{project.domain} · {project.difficulty} · {project.estimatedBuildTime}</span>
          <h2>{project.title}</h2>
          <p>{project.businessProblem}</p>
        </div>
        <button className="button button-primary" type="button" onClick={() => togglePortfolioProject(project.id)}>
          {complete ? "Project Completed" : "Mark Project Complete"}
        </button>
      </div>

      <div className="content-panel">
        <h3>What you will build</h3>
        <p>{project.whatYouWillBuild}</p>
        <h3>Why it matters</h3>
        <p>{project.whyItMatters}</p>
      </div>

      <div className="two-column">
        <div className="content-panel">
          <h3>Architecture</h3>
          <p>{project.architecture}</p>
          <h3>Workflow diagram</h3>
          <p>{project.workflowDiagram}</p>
          <h3>Database schema</h3>
          <p>{project.databaseSchema}</p>
        </div>
        <div className="content-panel">
          <h3>API design</h3>
          <p>{project.apiDesign}</p>
          <h3>Prompt design</h3>
          <p>{project.promptDesign}</p>
        </div>
      </div>

      <div className="section-grid">
        {listSections.map(([title, key]) => (
          <div className="content-panel" key={title}>
            <h3>{title}</h3>
            <ul className="check-list">
              {project[key].map((item) => <li key={item}>{item}</li>)}
            </ul>
          </div>
        ))}
      </div>

      <div className="content-panel">
        <h3>Rubric</h3>
        <div className="rubric-grid">
          {project.gradingRubric.map((item) => (
            <div className="rubric-card" key={item.category}>
              <strong>{item.category}</strong>
              <p><b>Beginner:</b> {item.beginner}</p>
              <p><b>Good:</b> {item.good}</p>
              <p><b>Excellent:</b> {item.excellent}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="two-column">
        <div className="content-panel">
          <h3>Portfolio explanation</h3>
          <p>{project.portfolioExplanation}</p>
        </div>
        <div className="content-panel">
          <h3>Interview explanation</h3>
          <p>{project.interviewExplanation}</p>
        </div>
      </div>
    </section>
  );
}
