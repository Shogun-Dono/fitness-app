import {View, Text, TextInput, FlatList, Pressable} from "react-native";
import React, {useEffect, useState} from "react";
import Feather from "@expo/vector-icons/Feather";
import { useColorScheme } from "nativewind";

// Import your JSON file
import exercisesData from "../../../assets/data/workout_data.json";
const typedExercises: ExerciseItem[] = exercisesData as ExerciseItem[];


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


    function handleAddExercise() {

    }

    return (
        <View className="dark:bg-bg h-full px-4">
            <View className="flex-row gap-1 items-center justify-center border rounded-xl mt-2 dark:bg-bg2">
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

            <FlatList
                data={exerciseList}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item}) => (
                    <View className={"border-bg2 rounded-xl active:bg-gray-200 dark:active:bg-bg_dark_active"}>
                        <Text>Exercise: {item.Exercise}</Text>

                    </View>
                )}
            />

            {query!=="" && <FlatList
                data={filteredExercises}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <Pressable
                        className="p-4 border-b dark:border-bg2 active:bg-gray-200 dark:active:bg-bg_dark_active"
                        onPress={() => {
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


        </View>
    );
}

// @ts-ignore
export default NewWorkout;
