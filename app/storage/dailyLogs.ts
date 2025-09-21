import AsyncStorage from "@react-native-async-storage/async-storage";

// ----------------- Types -----------------

export type SetEntry = {
    setNumber: number;
    reps: number;
    weight: number;
    caloriesBurned: number;
};

export type Exercise =
    | {
    type: "weight-reps";
    exercise: string;
    muscleGroup: string; // e.g. "Chest", "Back", "Legs"
    sets: SetEntry[];
    totalCaloriesBurned: number;
}
    | {
    type: "timed";
    exercise: string;
    muscleGroup: string;
    durationSec: number;
    caloriesBurned: number;
};

export type Workout = {
    name: string;
    exercises: Exercise[];
    totalCaloriesBurned: number;
};

export type Meal = {
    meal: string;
    foods: string[];
    calories: number;
};

export type Sleep = {
    hours: number;
    quality: string;
    bedtime: string;
    wakeTime: string;
};

export type DayData = {
    workouts: Workout[];
    meals: Meal[];
    sleep?: Sleep;
};

// ----------------- Storage Helpers -----------------

const STORAGE_KEY_PREFIX = "day_";

const getStorageKey = (date: string) => `${STORAGE_KEY_PREFIX}${date}`;

export async function getDayData(date: string): Promise<DayData> {
    const key = getStorageKey(date);
    const json = await AsyncStorage.getItem(key);
    if (json) {
        return JSON.parse(json);
    }
    return { workouts: [], meals: [] };
}

async function saveDayData(date: string, data: DayData) {
    const key = getStorageKey(date);
    await AsyncStorage.setItem(key, JSON.stringify(data));
}

// ----------------- Workout Functions -----------------

export async function addWorkoutToDay(date: string, workoutName: string) {
    const data = await getDayData(date);
    data.workouts.push({ name: workoutName, exercises: [], totalCaloriesBurned: 0 });
    await saveDayData(date, data);
}

export async function addExerciseToWorkout(
    date: string,
    workoutName: string,
    exercise: Exercise
) {
    const data = await getDayData(date);
    const workout = data.workouts.find((w) => w.name === workoutName);
    if (workout) {
        workout.exercises.push(exercise);
        workout.totalCaloriesBurned += exercise.type === "timed"
            ? exercise.caloriesBurned
            : exercise.totalCaloriesBurned;
        await saveDayData(date, data);
    }
}

export async function addSetToExercise(
    date: string,
    workoutName: string,
    exerciseName: string,
    set: SetEntry
) {
    const data = await getDayData(date);
    const workout = data.workouts.find((w) => w.name === workoutName);
    if (workout) {
        const exercise = workout.exercises.find(
            (e) => e.exercise === exerciseName && e.type === "weight-reps"
        );
        if (exercise && exercise.type === "weight-reps") {
            exercise.sets.push(set);
            exercise.totalCaloriesBurned += set.caloriesBurned;
            workout.totalCaloriesBurned += set.caloriesBurned;
            await saveDayData(date, data);
        }
    }
}

export async function updateSetInExercise(
    date: string,
    workoutName: string,
    exerciseName: string,
    setNumber: number,
    updatedSet: Partial<SetEntry>
) {
    const data = await getDayData(date);
    const workout = data.workouts.find((w) => w.name === workoutName);
    if (workout) {
        const exercise = workout.exercises.find(
            (e) => e.exercise === exerciseName && e.type === "weight-reps"
        );
        if (exercise && exercise.type === "weight-reps") {
            const set = exercise.sets.find((s) => s.setNumber === setNumber);
            if (set) {
                Object.assign(set, updatedSet);
                // TODO: If caloriesBurned changes, also adjust totals
            }
            await saveDayData(date, data);
        }
    }
}

// ----------------- Meals & Sleep -----------------

export async function addMealToDay(date: string, meal: Meal) {
    const data = await getDayData(date);
    data.meals.push(meal);
    await saveDayData(date, data);
}

export async function setSleepForDay(date: string, sleep: Sleep) {
    const data = await getDayData(date);
    data.sleep = sleep;
    await saveDayData(date, data);
}

