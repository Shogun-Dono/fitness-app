import {View, Text} from 'react-native'
import React from 'react'
import {Tabs} from "expo-router";



const _Layout = () => {
    return (
        <Tabs>
            <Tabs.Screen name={"index"} options={{
                title: 'Dashboard',
                headerShown: true,
                headerTitleAlign: "center",

            }}/>

            <Tabs.Screen name={"meals"} options={{
                title: 'Meals',
                headerShown: false,

            }}/>

            <Tabs.Screen name={"profile"} options={{
                title: 'Profile',
                headerShown: false,

            }}/>

            <Tabs.Screen name={"sleep"} options={{
                title: 'Sleep',
                headerShown: false,

            }}/>

            <Tabs.Screen name={"workout"} options={{
                title: 'Workout',
                headerShown: false,

            }}/>
        </Tabs>
    )
}
export default _Layout
