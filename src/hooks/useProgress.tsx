import { createContext, useCallback, useContext, useMemo } from "react";
import type { PropsWithChildren } from "react";
import { useLocalStorage } from "./useLocalStorage";
import type { LearningProgress } from "../types/curriculum";
import {
  defaultProgress,
  deriveCompletedPartIds,
  toggleId,
  withActivity,
} from "../utils/progress";

type ProgressContextValue = {
  progress: LearningProgress;
  setCurrentLesson: (partId: string, lessonId: string) => void;
  toggleLesson: (lessonId: string) => void;
  toggleExercise: (exerciseId: string) => void;
  toggleMiniProject: (projectId: string) => void;
  toggleLab: (labId: string) => void;
  completeQuiz: (quizId: string, score: number) => void;
  toggleSkillCheck: (skillCheckId: string) => void;
  togglePortfolioProject: (projectId: string) => void;
  setActiveLearningPath: (pathId: string | null) => void;
  saveNote: (lessonId: string, note: string) => void;
  resetProgress: () => void;
};

const ProgressContext = createContext<ProgressContextValue | null>(null);

function syncCompletedParts(progress: LearningProgress): LearningProgress {
  return {
    ...progress,
    completedPartIds: deriveCompletedPartIds(progress),
  };
}

export function ProgressProvider({ children }: PropsWithChildren) {
  const [progress, setProgress] = useLocalStorage<LearningProgress>("ai-automation-progress", defaultProgress);

  const ensureProgressShape = useCallback((current: LearningProgress): LearningProgress => ({
    ...defaultProgress,
    ...current,
    notesByLessonId: current.notesByLessonId ?? {},
    quizScores: current.quizScores ?? {},
    activityDates: current.activityDates ?? [],
    completedLessonIds: current.completedLessonIds ?? [],
    completedExerciseIds: current.completedExerciseIds ?? [],
    completedMiniProjectIds: current.completedMiniProjectIds ?? [],
    completedLabIds: current.completedLabIds ?? [],
    completedQuizIds: current.completedQuizIds ?? [],
    completedSkillCheckIds: current.completedSkillCheckIds ?? [],
    completedPortfolioProjectIds: current.completedPortfolioProjectIds ?? [],
    completedPartIds: current.completedPartIds ?? [],
  }), []);

  const setCurrentLesson = useCallback(
    (partId: string, lessonId: string) => {
      setProgress((current) => {
        const shaped = ensureProgressShape(current);
        if (shaped.currentPartId === partId && shaped.currentLessonId === lessonId) {
          return shaped;
        }

        return withActivity({
          ...shaped,
          currentPartId: partId,
          currentLessonId: lessonId,
        });
      });
    },
    [ensureProgressShape, setProgress],
  );

  const toggleLesson = useCallback(
    (lessonId: string) => {
      setProgress((current) => {
        const shaped = ensureProgressShape(current);
        return syncCompletedParts(
          withActivity({
            ...shaped,
            completedLessonIds: toggleId(shaped.completedLessonIds, lessonId),
          }),
        );
      });
    },
    [ensureProgressShape, setProgress],
  );

  const toggleExercise = useCallback(
    (exerciseId: string) => {
      setProgress((current) => {
        const shaped = ensureProgressShape(current);
        return syncCompletedParts(
          withActivity({
            ...shaped,
            completedExerciseIds: toggleId(shaped.completedExerciseIds, exerciseId),
          }),
        );
      });
    },
    [ensureProgressShape, setProgress],
  );

  const toggleMiniProject = useCallback(
    (projectId: string) => {
      setProgress((current) => {
        const shaped = ensureProgressShape(current);
        return syncCompletedParts(
          withActivity({
            ...shaped,
            completedMiniProjectIds: toggleId(shaped.completedMiniProjectIds, projectId),
          }),
        );
      });
    },
    [ensureProgressShape, setProgress],
  );

  const toggleLab = useCallback(
    (labId: string) => {
      setProgress((current) => {
        const shaped = ensureProgressShape(current);
        return withActivity({
          ...shaped,
          completedLabIds: toggleId(shaped.completedLabIds, labId),
        });
      });
    },
    [ensureProgressShape, setProgress],
  );

  const completeQuiz = useCallback(
    (quizId: string, score: number) => {
      setProgress((current) => {
        const shaped = ensureProgressShape(current);
        return withActivity({
          ...shaped,
          completedQuizIds: shaped.completedQuizIds.includes(quizId)
            ? shaped.completedQuizIds
            : [...shaped.completedQuizIds, quizId],
          quizScores: {
            ...shaped.quizScores,
            [quizId]: score,
          },
        });
      });
    },
    [ensureProgressShape, setProgress],
  );

  const toggleSkillCheck = useCallback(
    (skillCheckId: string) => {
      setProgress((current) => {
        const shaped = ensureProgressShape(current);
        return withActivity({
          ...shaped,
          completedSkillCheckIds: toggleId(shaped.completedSkillCheckIds, skillCheckId),
        });
      });
    },
    [ensureProgressShape, setProgress],
  );

  const togglePortfolioProject = useCallback(
    (projectId: string) => {
      setProgress((current) => {
        const shaped = ensureProgressShape(current);
        return withActivity({
          ...shaped,
          completedPortfolioProjectIds: toggleId(shaped.completedPortfolioProjectIds, projectId),
        });
      });
    },
    [ensureProgressShape, setProgress],
  );

  const setActiveLearningPath = useCallback(
    (pathId: string | null) => {
      setProgress((current) => withActivity({ ...ensureProgressShape(current), activeLearningPathId: pathId }));
    },
    [ensureProgressShape, setProgress],
  );

  const saveNote = useCallback(
    (lessonId: string, note: string) => {
      setProgress((current) => {
        const shaped = ensureProgressShape(current);
        return (
          withActivity({
            ...shaped,
            notesByLessonId: {
              ...shaped.notesByLessonId,
              [lessonId]: note,
            },
          })
        );
      });
    },
    [ensureProgressShape, setProgress],
  );

  const resetProgress = useCallback(() => {
    setProgress({
      ...defaultProgress,
      lastVisitedAt: new Date().toISOString(),
    });
  }, [setProgress]);

  const shapedProgress = useMemo(() => ensureProgressShape(progress), [ensureProgressShape, progress]);

  const value = useMemo<ProgressContextValue>(
    () => ({
      progress: shapedProgress,
      setCurrentLesson,
      toggleLesson,
      toggleExercise,
      toggleMiniProject,
      toggleLab,
      completeQuiz,
      toggleSkillCheck,
      togglePortfolioProject,
      setActiveLearningPath,
      saveNote,
      resetProgress,
    }),
    [
      completeQuiz,
      shapedProgress,
      resetProgress,
      saveNote,
      setActiveLearningPath,
      setCurrentLesson,
      toggleExercise,
      toggleLab,
      toggleLesson,
      toggleMiniProject,
      togglePortfolioProject,
      toggleSkillCheck,
    ],
  );

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
}

export function useProgress() {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error("useProgress must be used inside ProgressProvider");
  }
  return context;
}
