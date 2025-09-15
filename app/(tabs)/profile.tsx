import {View, Text, Animated, Pressable} from 'react-native'
import React, {JSX} from 'react'
import FlatList = Animated.FlatList;
import {Ionicons} from "@expo/vector-icons";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import {useColorScheme} from "nativewind";


interface listBlockProps {
    text: string,
    icon: JSX.Element,
    onPress: () => void,
}


const Profile = ({text, icon, onPress}: listBlockProps) => {

    const {colorScheme, setColorScheme} = useColorScheme()

    const profileList =[
        {text: "Account", icon: <Feather name="user" size={24} color={colorScheme === "light" ? "black" : "white"} />,
            onPress: () => console.log("Account Pressed")},
        
        {text: "Settings", icon: <Feather name="settings" size={24} color={colorScheme === "light" ? "black" : "white"} />,
            onPress: () => console.log("Settings Pressed")},

        {text: "Theme: " + colorScheme, icon: <Ionicons name={colorScheme === "light" ? "sunny": "moon-sharp"} size={24} color={colorScheme === "light" ? "black" : "white"}/>,
            onPress: () => setColorScheme(colorScheme === "light" ? "dark" : "light")}
    ]

    return (
        <View className={"dark:bg-bg h-full px-2"}>
            <FlatList
                className={"dark:bg-bg"}
                data={profileList}
                keyExtractor={(item) => item.text}
                renderItem={({item}) => (
                        <Pressable
                            onPress={item.onPress}
                            className={"mt-1 dark:bg-bg2 flex-row items-center p-2 border border-bg2 rounded-xl h-14"}>
                            {item.icon}
                            <Text className={"dark:text-white pl-2"}>{item.text}</Text>
                        </Pressable>

                )}
                // ItemSeparatorComponent={() => (
                //     <View style={{ height: 1, backgroundColor: "black"}}></View>
                // )}
            />
        </View>
    )
}
export default Profile
