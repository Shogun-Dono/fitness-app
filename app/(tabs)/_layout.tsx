import React from 'react'
import {Tabs} from "expo-router";
import resolveConfig from 'tailwindcss/resolveConfig';
import tailwindConfig from '../../tailwind.config.js';
import { Ionicons } from '@expo/vector-icons';

const fullConfig = resolveConfig(tailwindConfig);



const _Layout = () => {
    // @ts-ignore
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: fullConfig.theme.colors.primary,
                tabBarInactiveTintColor: 'grey',
                tabBarStyle: {
                    backgroundColor: fullConfig.theme.colors.bg2,
                    height: 80,
                    paddingBottom: 5,
                    paddingTop: 5,
                },
                headerShown: true,
                headerTitleAlign: 'center',
                headerTintColor: fullConfig.theme.colors.bg2,
                headerStatusBarHeight: 10,
            }}
        >
            <Tabs.Screen name={"index"} options={{
                title: 'Dashboard',
                tabBarIcon: ({focused, color, size }) => (
                    <Ionicons name="home" size={size} color={color} />
                ),

            }}/>

            <Tabs.Screen
                name="workout"
                options={{
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
