import React from 'react'
import {Tabs} from "expo-router";
import resolveConfig from 'tailwindcss/resolveConfig';
import tailwindConfig from '../../tailwind.config.js';
import { Ionicons } from '@expo/vector-icons';
import {useColorScheme} from "nativewind";

import {colors} from "@/assets/constants/colors"



const _Layout = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const {colorScheme} = useColorScheme();

    // @ts-ignore
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: colors.primary,
                tabBarInactiveTintColor: "grey",
                tabBarStyle: {
                    backgroundColor: colorScheme === "dark" ? colors.bg2 : "white",
                    height: 80,
                    paddingBottom: 5,
                    paddingTop: 5,
                },
                headerShown: true,
                headerTitleAlign: "center",
                headerStyle: {
                    backgroundColor: colorScheme === "dark" ? colors.bg2 : "white",
                },
                headerTintColor: colorScheme === "dark" ? "white" : "black",
                // headerStatusBarHeight: 10,
            }}
        >
            <Tabs.Screen name={"(dashboard)"} options={{
                title: 'Dashboard',
                headerShown: false,
                tabBarIcon: ({color, size }) => (
                    <Ionicons name="home" size={size} color={color} />
                ),

            }}/>

            <Tabs.Screen
                name="(workout)"
                options={{
                    headerShown: false,
                    title: 'Workout',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="barbell" size={size} color={color} />
                    ),
                }}
            />

            <Tabs.Screen
                name="meals"
                options={{
                    title: 'Meals',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="fast-food" size={size} color={color} />
                    ),
                }}
            />

            <Tabs.Screen
                name="sleep"
                options={{
                    title: 'Sleep',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="bed" size={size} color={color} />
                    ),
                }}
            />

            <Tabs.Screen
                name="profile"
                options={{
                    title: 'Profile',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="person" size={size} color={color} />
                    ),
                }}
            />
        </Tabs>
    )
}
export default _Layout
