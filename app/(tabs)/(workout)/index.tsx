import {View, Text, Pressable} from 'react-native'
import React from 'react'
import {useRouter} from "expo-router";

const Index = () => {

    const router = useRouter()

    return (
        <View>
            <View className="flex-row gap-8 justify-center mt-8">
                <Pressable
                    onPress={() => (router.push('/newWorkout'))}
                    className="active:bg-gray-200 border w-36 h-12 items-center justify-center rounded-xl"
                >
                    <Text className="text-center">New Workout</Text>
                </Pressable>

                <Pressable
                    onPress={() => (router.push('/newRoutine'))}
                    className="active:bg-gray-200 border w-36 h-12 items-center justify-center rounded-xl"
                >
                    <Text className="text-center">New Routine</Text>
                </Pressable>
            </View>
        </View>
    )
}
export default Index
