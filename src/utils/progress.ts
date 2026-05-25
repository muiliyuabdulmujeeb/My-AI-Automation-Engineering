import { curriculum } from "../data/curriculum";
import type { CurriculumPart, LearningProgress } from "../types/curriculum";

export const defaultProgress: LearningProgress = {
  currentPartId: null,
  currentLessonId: null,
  completedLessonIds: [],
  completedExerciseIds: [],
  completedMiniProjectIds: [],
  completedPartIds: [],
  notesByLessonId: {},
  activityDates: [],
  lastVisitedAt: new Date().toISOString(),
};

const unique = (values: string[]) => Array.from(new Set(values));

export function calculatePartProgress(part: CurriculumPart, progress: LearningProgress) {
  const totalItems = part.lessons.length + part.exercises.length + part.miniProjects.length;
  const completedItems =
    part.lessons.filter((lesson) => progress.completedLessonIds.includes(lesson.id)).length +
    part.exercises.filter((exercise) => progress.completedExerciseIds.includes(exercise.id)).length +
    part.miniProjects.filter((project) => progress.completedMiniProjectIds.includes(project.id)).length;

  const percentage = totalItems === 0 ? 0 : Math.round((completedItems / totalItems) * 100);
  const status = percentage === 100 ? "Completed" : percentage > 0 ? "In Progress" : "Not Started";

  return { completedItems, totalItems, percentage, status };
}

export function calculateOverallProgress(progress: LearningProgress) {
  const totals = curriculum.reduce(
    (acc, part) => {
      acc.lessons += part.lessons.length;
      acc.exercises += part.exercises.length;
      acc.projects += part.miniProjects.length;
      return acc;
    },
    { lessons: 0, exercises: 0, projects: 0 },
  );

  const totalItems = totals.lessons + totals.exercises + totals.projects;
  const completedItems =
    progress.completedLessonIds.length +
    progress.completedExerciseIds.length +
    progress.completedMiniProjectIds.length;

  return {
    ...totals,
    totalItems,
    completedItems,
    percentage: totalItems === 0 ? 0 : Math.round((completedItems / totalItems) * 100),
  };
}

export function deriveCompletedPartIds(progress: LearningProgress) {
  return curriculum
    .filter((part) => calculatePartProgress(part, progress).percentage === 100)
    .map((part) => part.id);
}

export function toggleId(ids: string[], id: string) {
  return ids.includes(id) ? ids.filter((value) => value !== id) : unique([...ids, id]);
}

export function getTodayKey() {
  return new Date().toISOString().slice(0, 10);
}

export function getActivityStreak(activityDates: string[]) {
  const dates = new Set(activityDates);
  let streak = 0;
  const cursor = new Date();

  while (dates.has(cursor.toISOString().slice(0, 10))) {
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }

  return streak;
}

export function withActivity(progress: LearningProgress) {
  return {
    ...progress,
    activityDates: unique([...progress.activityDates, getTodayKey()]).slice(-60),
    lastVisitedAt: new Date().toISOString(),
  };
}

export function getContinueTarget(progress: LearningProgress) {
  if (progress.currentPartId && progress.currentLessonId) {
    return { partId: progress.currentPartId, lessonId: progress.currentLessonId };
  }

  const firstPart = curriculum[0];
  const firstLesson = firstPart?.lessons[0];
  return firstPart && firstLesson ? { partId: firstPart.id, lessonId: firstLesson.id } : null;
}

export function getAdjacentLessons(partId: string, lessonId: string) {
  const allLessons = curriculum.flatMap((part) =>
    part.lessons.map((lesson) => ({ partId: part.id, lessonId: lesson.id, label: lesson.title })),
  );
  const index = allLessons.findIndex((lesson) => lesson.partId === partId && lesson.lessonId === lessonId);

  return {
    previous: index > 0 ? allLessons[index - 1] : null,
    next: index >= 0 && index < allLessons.length - 1 ? allLessons[index + 1] : null,
  };
}
