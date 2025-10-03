import {View, Text, TextInput, FlatList, Pressable, Button} from "react-native";
import React, {useEffect, useState} from "react";
import Feather from "@expo/vector-icons/Feather";
import { useColorScheme } from "nativewind";

// Import your JSON file
import exercisesData from "../../../assets/data/workout_data.json";
import {SetEntry} from "@/app/storage/dailyLogs";
const typedExercises: ExerciseItem[] = exercisesData as ExerciseItem[];
import {Workout} from "@/app/storage/dailyLogs";
import {Input} from "postcss";
import {colors} from "@/assets/constants/colors";
import {Buffer} from "node:buffer";


type ExerciseItem = {
    type?: string;
    Exercise: string;
    "Difficulty Level": string;
    "Target Muscle Group": string;
    "Prime Mover Muscle": string;
    "Secondary Muscle": string;
    "Tertiary Muscle": string;
    "Primary Equipment": string;
    Posture: string;
    "Single or Double Arm": string;
    "Continuous or Alternating": string;
    Grip: string;
    sets?: SetEntry[];
    durationSec?: number;
    caloriesBurned?: number;
};

function NewWorkout() {
    const [query, setQuery] = useState("");
    const [filteredExercises, setFilteredExercises] = useState<ExerciseItem[]>([]);
    const [exerciseList, setExerciseList] = useState<ExerciseItem[]>([]);
    const { colorScheme } = useColorScheme();


    useEffect(() => {
        if (query === "") {
            setFilteredExercises([]);
        } else {
            const results = exercisesData.filter((item) =>
                item.Exercise.toLowerCase().includes(query.toLowerCase())
            );
            setFilteredExercises(results);
        }
    }, [query]);


    function addSet(item: SetEntry) {

    }

    return (
        <View className="dark:bg-bg h-full px-4">
            <View className="flex-row gap-1 items-center justify-center border rounded-xl mt-2 mb-6 dark:bg-bg2">
                <Feather
                    className="ml-2"
                    name="search"
                    size={24}
                    color={colorScheme === "light" ? "black" : "white"}
                />
                <TextInput
                    className="flex-grow dark:text-text-dark"
                    placeholder="Search exercises..."
                    placeholderTextColor={colorScheme === "light" ? "black" : "white"}
                    value={query}
                    onChangeText={setQuery}
                />
            </View>

            {query!=="" && <FlatList
                data={filteredExercises}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <Pressable
                        className="p-4 border-bg2 dark:border-bg2 active:bg-gray-200 dark:active:bg-bg_dark_active"
                        onPress={() => {
                            item.sets = [{
                                setNumber: 1,
                                reps: 0,
                                weight: 0,
                                caloriesBurned: 0
                                }]
                            setExerciseList(prev => {
                                const updated = [...prev, item];
                                console.log("Updated exerciseList:", updated);
                                return updated;
                            });

                            setQuery("");
                            setFilteredExercises([]);
                        }}
                    >
                        <Text className="dark:text-text-dark text-lg">{item.Exercise}</Text>
                        <Text className="dark:text-text-dark text-sm">{item["Target Muscle Group"]}</Text>
                    </Pressable>
                )}
            />}

            <FlatList
                data={exerciseList}
                keyExtractor={(item, index) => index.toString()}
                className={""}
                renderItem={({item}) => (
                    <View className={"border-2 border-bg2 dark:bg-bg2 rounded-xl p-3 mb-6"}>
                        <Text className={"dark:text-text-dark text-xl my-3"}>{item.Exercise}</Text>

                        <FlatList
                            style={{ flexGrow: 0 }}
                            data={item.sets ?? []}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item }) => (
                                <View className={"border border-bg dark:bg-bg rounded-xl flex-row gap-4 p-2 mt-4"}>
                                    <View className={"flex-row items-center justify-center p-2"}>
                                        <Text className={"dark:text-text-dark text-lg mr-1"}>Set {item.setNumber}</Text>
                                    </View>

                                    <View className={"flex-row items-center justify-center py-2 px-4"}>
                                        <Text className={"dark:text-text-dark text-lg mr-1"}>Weight </Text>
                                        <TextInput
                                            onChangeText={()=>{

                                            }}
                                            className={"dark:text-text-dark border border-bg2 dark:border-bg2 dark:bg-bg2 w-12 h-12 text-center rounded-xl justify-center"}
                                        >
                                            {item.weight}
                                        </TextInput>
                                        <Text className={"dark:text-text-dark text-lg ml-2"}>lbs</Text>

                                    </View>

                                    <View className={"flex-row items-center justify-center p-2"}>
                                        <Text className={"dark:text-text-dark text-lg mr-1"}>Reps </Text>
                                        <TextInput className={"dark:text-text-dark border border-bg2 dark:border-bg2 dark:bg-bg2 w-12 h-12 text-center rounded-xl justify-center"}>{item.reps}</TextInput>
                                    </View>

                                </View>
                            )}
                        />

                        <Pressable
                            onPress={() => {
                                setExerciseList(prev =>
                                    prev.map(exercise => {
                                        if (exercise.Exercise === item.Exercise) {
                                            const newSetNumber = (exercise.sets?.length ?? 0) + 1;
                                            const newSet: SetEntry = {
                                                setNumber: newSetNumber,
                                                reps: 0,
                                                weight: 0,
                                                caloriesBurned: 0
                                            };
                                            return {
                                                ...exercise,
                                                sets: [...(exercise.sets ?? []), newSet]
                                            };
                                        }
                                        return exercise;
                                    })
                                );
                            }}
                            className={
                                "mt-4 p-2 w-full h-10 mb-4 dark:bg-bg items-center justify-center rounded-xl border border-bg2 dark:border-bg2 active:bg-gray-200 dark:active:bg-bg_dark_active dark:text-text-dark"
                            }
                        >
                            <Text className={"dark:text-text-dark text-center"}>Add Set</Text>
                        </Pressable>

                    </View>
                )}
            />

            <Pressable className={"w-full mb-4 dark:bg-bg2 h-10 items-center justify-center rounded-xl border border-bg2 dark:border-bg2 active:bg-gray-200 dark:active:bg-bg_dark_active"}>
                <Text className={"dark:text-text-dark text-center"}>Save Workout</Text>
            </Pressable>


        </View>
    );
}

// @ts-ignore
export default NewWorkout;
