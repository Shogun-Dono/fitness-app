import React from 'react'
import {Stack} from "expo-router";
import {colorScheme, useColorScheme} from "nativewind";
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "@/tailwind.config";
import {GestureHandlerRootView} from "react-native-gesture-handler";

import {colors} from "@/assets/constants/colors"

const _Layout = () => {

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const {colorScheme} = useColorScheme();

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <Stack screenOptions={{
                headerShown: true,
                headerTitleAlign: "center",
                headerStyle: {
                    backgroundColor: colorScheme === "dark" ? colors.bg2 : "white",
                },
                headerTintColor: colorScheme === "dark" ? "white" : "black",
            }}>
                <Stack.Screen name="index" options={{
                    title: "Dashboard",
                }} />
                <Stack.Screen name="calendarScreen" options={{
                    title: "Calendar",
                }} />
            </Stack>
        </GestureHandlerRootView>

    )
}


export default _Layout
