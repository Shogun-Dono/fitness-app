import {View, Text, Pressable, Animated} from 'react-native'
import React, {JSX} from 'react'
import {useRouter} from "expo-router";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FlatList = Animated.FlatList;


interface routineProps {
    name: string,
    date: string,
    exercises?: JSX.Element
}

export default function Index() {

    const router = useRouter()

    let routineArr = [
        {name: "Upper Body", date: "15/09/2025"},
        {name: "Lower Body", date: "15/09/2025"},
        {name: "Chest", date: "15/09/2025"},
    ]

    return (
        <View className={"dark:bg-bg h-full"}>
            <View className="flex-row gap-8 justify-center mt-8">
                <Pressable
                    onPress={() => (router.push('/newWorkout'))}
                    className="active:bg-gray-200 dark:bg-bg2 border w-36 h-12 items-center justify-center rounded-xl"
                >
                    <Text className="text-center dark:text-text-dark">New Workout</Text>
                </Pressable>

                <Pressable
                    onPress={() => (router.push('/newRoutine'))}
                    className="active:bg-gray-200 dark:bg-bg2 border w-36 h-12 items-center justify-center rounded-xl"
                >
                    <Text className="text-center dark:text-text-dark">New Routine</Text>
                </Pressable>
            </View>

            <View className={"px-8 mt-20"}>
                <Text className={"ml-2 mb-2 text-xl dark:text-text-dark"}>Your Routines {<MaterialCommunityIcons name="dumbbell" size={18} color="black" />}</Text>

                <FlatList
                    data={routineArr}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({item}) => (
                    <View className={"flex-row mt-4 dark:bg-bg2 border border-bg2 rounded-xl w-[23rem] h-24 items-center"}>
                        <View className={"flex flex-col items-start justify-center flex-grow"}>
                            <Text className={" dark:text-text-dark min-w-32 text-center"}>{item.name}</Text>
                        </View>

                        <View className={"flex-shrink mr-7 text-center dark:text-text-dark"}>
                            <Text className={"dark:text-text-dark"}>Last done:</Text>
                            <Text className={"dark:text-text-dark"}>{item.date}</Text>
                        </View>
                    </View>
                )}/>
            </View>
        </View>
    )
}