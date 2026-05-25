export type Difficulty = "Beginner" | "Intermediate" | "Advanced" | "Project";
export type ItemDifficulty = "Easy" | "Medium" | "Hard";
export type LabDifficulty = "Beginner" | "Intermediate" | "Advanced";
export type SkillLevel = "Beginner" | "Intermediate" | "Advanced";
export type ProjectDomain =
  | "Fintech"
  | "E-commerce"
  | "Sales"
  | "Operations"
  | "CRM"
  | "Support"
  | "Productivity"
  | "Data Intelligence";
export type ProjectDifficulty = "Intermediate" | "Advanced" | "Capstone";

export type LessonSection = {
  heading: string;
  content: string;
  analogy?: string;
  businessUseCase?: string;
  code?: string;
  workflowExample?: string;
  beginnerMistakes?: string[];
  debuggingTips?: string[];
  mentalModel?: string;
};

export type CodeExample = {
  title: string;
  language: string;
  code: string;
  explanation: string;
};

export type Lesson = {
  id: string;
  title: string;
  summary: string;
  sections: LessonSection[];
  exerciseId?: string;
  miniProjectId?: string;
  learningObjectives?: string[];
  portfolioConnection?: string;
  interviewExplanation?: string;
};

export type Exercise = {
  id: string;
  title: string;
  description: string;
  difficulty: ItemDifficulty;
};

export type MiniProject = {
  id: string;
  title: string;
  description: string;
  deliverables: string[];
  requiredSkills?: string[];
  businessProblem?: string;
};

export type LabStep = {
  title: string;
  explanation: string;
  instructions: string[];
  code?: string;
  expectedResult?: string;
};

export type Lab = {
  id: string;
  partId: string;
  title: string;
  difficulty: LabDifficulty;
  estimatedTime: string;
  goal: string;
  businessScenario: string;
  prerequisites: string[];
  toolsUsed: string[];
  steps: LabStep[];
  codeSamples?: CodeExample[];
  expectedOutput: string[];
  debuggingChecks: string[];
  completionCriteria: string[];
  extensionTasks: string[];
  portfolioValue: string;
};

export type QuizQuestionType = "multiple_choice" | "true_false" | "scenario" | "debugging" | "architecture";

export type QuizQuestion = {
  id: string;
  question: string;
  type: QuizQuestionType;
  options?: string[];
  correctAnswer?: string | string[];
  explanation: string;
};

export type Quiz = {
  id: string;
  partId: string;
  title: string;
  questions: QuizQuestion[];
};

export type RubricItem = {
  category: string;
  beginner: string;
  good: string;
  excellent: string;
};

export type SkillCheck = {
  id: string;
  title: string;
  level: SkillLevel;
  scenario: string;
  task: string;
  requirements: string[];
  constraints: string[];
  expectedSolutionOutline: string[];
  gradingRubric: RubricItem[];
};

export type PortfolioProject = {
  id: string;
  title: string;
  domain: ProjectDomain;
  difficulty: ProjectDifficulty;
  estimatedBuildTime: string;
  businessProblem: string;
  whyItMatters: string;
  targetUsers: string[];
  realWorldUseCase: string;
  whatYouWillBuild: string;
  userStories: string[];
  coreFeatures: string[];
  stretchFeatures: string[];
  toolsAndStack: string[];
  architecture: string;
  workflowDiagram: string;
  databaseSchema: string;
  apiDesign: string;
  promptDesign: string;
  aiComponents: string[];
  automationComponents: string[];
  dashboardRequirements: string[];
  errorHandling: string[];
  testingPlan: string[];
  deploymentPlan: string[];
  securityConsiderations: string[];
  successMetrics: string[];
  deliverables: string[];
  readmeOutline: string[];
  caseStudyOutline: string[];
  demoScript: string[];
  portfolioExplanation: string;
  interviewExplanation: string;
  upgradeIdeas: string[];
  gradingRubric: RubricItem[];
};

export type LearningPath = {
  id: string;
  title: string;
  goal: string;
  partIds: string[];
  projectIds: string[];
};

export type CurriculumPart = {
  id: string;
  partNumber: number;
  title: string;
  description: string;
  difficulty: Difficulty;
  estimatedTime: string;
  outcomes: string[];
  whatYouWillBuild: string[];
  skills: string[];
  realBusinessUseCase: string;
  commonBeginnerTrap: string;
  lessons: Lesson[];
  exercises: Exercise[];
  miniProjects: MiniProject[];
};

export type LearningProgress = {
  currentPartId: string | null;
  currentLessonId: string | null;
  completedLessonIds: string[];
  completedExerciseIds: string[];
  completedMiniProjectIds: string[];
  completedLabIds: string[];
  completedQuizIds: string[];
  quizScores: Record<string, number>;
  completedSkillCheckIds: string[];
  completedPortfolioProjectIds: string[];
  completedPartIds: string[];
  activeLearningPathId: string | null;
  notesByLessonId: Record<string, string>;
  activityDates: string[];
  lastVisitedAt: string;
};
