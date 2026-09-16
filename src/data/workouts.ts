export type Workout = {
  id: string;
  type: string;
  date: string;
  duration: number;
  comment: string;
};

export const workouts: Workout[] = [
  { id: "8", type: "Full Body", date: "2026-09-15", duration: 55, comment: "Strong session. Added weight to squats and finished with a short core circuit." },
  { id: "7", type: "Cardio", date: "2026-09-12", duration: 35, comment: "Steady treadmill intervals." },
  { id: "6", type: "Upper Body", date: "2026-09-09", duration: 48, comment: "Focused on controlled reps and shoulder stability." },
  { id: "5", type: "Lower Body", date: "2026-09-05", duration: 52, comment: "Squats, lunges, and hamstring work." },
  { id: "4", type: "Full Body", date: "2026-09-01", duration: 60, comment: "A balanced start to the month." },
];

export function formatWorkoutDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(`${date}T12:00:00`));
}
