export type Difficulty = "Beginner" | "Intermediate" | "Advanced" | "Project";
export type ItemDifficulty = "Easy" | "Medium" | "Hard";

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

export type Lesson = {
  id: string;
  title: string;
  summary: string;
  sections: LessonSection[];
  exerciseId?: string;
  miniProjectId?: string;
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
  completedPartIds: string[];
  notesByLessonId: Record<string, string>;
  activityDates: string[];
  lastVisitedAt: string;
};
