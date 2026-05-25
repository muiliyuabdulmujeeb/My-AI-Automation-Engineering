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

  const setCurrentLesson = useCallback(
    (partId: string, lessonId: string) => {
      setProgress((current) => {
        if (current.currentPartId === partId && current.currentLessonId === lessonId) {
          return current;
        }

        return withActivity({
          ...current,
          currentPartId: partId,
          currentLessonId: lessonId,
        });
      });
    },
    [setProgress],
  );

  const toggleLesson = useCallback(
    (lessonId: string) => {
      setProgress((current) =>
        syncCompletedParts(
          withActivity({
            ...current,
            completedLessonIds: toggleId(current.completedLessonIds, lessonId),
          }),
        ),
      );
    },
    [setProgress],
  );

  const toggleExercise = useCallback(
    (exerciseId: string) => {
      setProgress((current) =>
        syncCompletedParts(
          withActivity({
            ...current,
            completedExerciseIds: toggleId(current.completedExerciseIds, exerciseId),
          }),
        ),
      );
    },
    [setProgress],
  );

  const toggleMiniProject = useCallback(
    (projectId: string) => {
      setProgress((current) =>
        syncCompletedParts(
          withActivity({
            ...current,
            completedMiniProjectIds: toggleId(current.completedMiniProjectIds, projectId),
          }),
        ),
      );
    },
    [setProgress],
  );

  const saveNote = useCallback(
    (lessonId: string, note: string) => {
      setProgress((current) =>
        withActivity({
          ...current,
          notesByLessonId: {
            ...current.notesByLessonId,
            [lessonId]: note,
          },
        }),
      );
    },
    [setProgress],
  );

  const resetProgress = useCallback(() => {
    setProgress({
      ...defaultProgress,
      lastVisitedAt: new Date().toISOString(),
    });
  }, [setProgress]);

  const value = useMemo<ProgressContextValue>(
    () => ({
      progress,
      setCurrentLesson,
      toggleLesson,
      toggleExercise,
      toggleMiniProject,
      saveNote,
      resetProgress,
    }),
    [progress, resetProgress, saveNote, setCurrentLesson, toggleExercise, toggleLesson, toggleMiniProject],
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
