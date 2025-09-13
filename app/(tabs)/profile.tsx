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
        {text: "Account", icon: <Feather name="user" size={24} color="black" />,
            onPress: () => console.log("Account Pressed")},

        {text: "Theme: " + colorScheme, icon: <MaterialCommunityIcons name="theme-light-dark" size={24} color="black"/>,
            onPress: () => setColorScheme(colorScheme === "light" ? "dark" : "light")}
    ]

    return (
        <View>
            <FlatList
                className={"mt-2"}
                data={profileList}
                keyExtractor={(item) => item.text}
                renderItem={({item}) => (
                    <Pressable
                        onPress={item.onPress}
                        style={{ borderBottomWidth: 1, borderBottomColor: "black" }}
                        className={" flex-row items-center p-2"}>
                            {item.icon}
                            <Text className={"pl-2"}>{item.text}</Text>
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
