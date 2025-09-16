import {View, Text, ScrollView, TextInput, Animated} from 'react-native'
import React, {useState} from 'react'
import Feather from '@expo/vector-icons/Feather';
import {useColorScheme} from "nativewind";

const NewWorkout = () => {

    const [query, setQuery] = useState('')
    const {colorScheme} = useColorScheme()


    return (
        <View className={"dark:bg-bg h-full px-4"}>
            <ScrollView>
                <View className={"flex-row gap-1 items-center justify-center border rounded-xl mt-2 dark:bg-bg2"}>
                    <Feather className={"ml-2"} name="search" size={24} color={colorScheme === "light" ? "black" : "white"} />
                    <TextInput
                        className={"flex-grow dark:text-text-dark"}
                        placeholder="Search workout..."
                        placeholderTextColor={colorScheme === "light" ? "black" : "white"}
                        value={query}
                        onChangeText={setQuery}
                    />
                </View>
            </ScrollView>
        </View>
    )
}
export default NewWorkout
