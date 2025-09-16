import { Stack } from "expo-router";
import {useColorScheme} from "nativewind";
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "@/tailwind.config";
import {Text, TextInput, View} from "react-native";
import {useState} from "react";

const fullConfig = resolveConfig(tailwindConfig);


export default function _Layout() {
    const {colorScheme} = useColorScheme();


    return (
        <Stack
            screenOptions={{
                headerTitleAlign: "center",
                headerStyle: {
                    backgroundColor: colorScheme === "dark" ? fullConfig.theme.colors.bg2 : "white",
                },
                headerTintColor: colorScheme === "dark" ? "white" : "black",
            }}
        >
            {/* This is the main Index tab screen with buttons */}
            <Stack.Screen
                name="index"
                options={{
                    headerShown: true,
                    title: 'Workout', }}
            />

            {/* Screens for newWorkout and newRoutine */}
            <Stack.Screen
                name="newWorkout"
                options={{
                    title: "New Workout",
                    headerShown: true,
                }}
            />
            <Stack.Screen
                name="newRoutine"
                options={{ title: 'New Routine' }}
            />
        </Stack>
    );
}