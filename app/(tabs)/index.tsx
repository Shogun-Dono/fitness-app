import {SafeAreaView, ScrollView, Text, View} from "react-native";
import {Link} from "expo-router"

export default function Index() {
  return (
    <View className={""}>
        <ScrollView>
            <View className={"justify-center items-center"}>
                <Text className={"text-2xl mt-14 "}>Hello Name</Text>
                    <View className={"mt-8 border border-black h-56 w-80 rounded-2xl items-center"} >
                        <Text className={"text-xl mt-14"}>Your Fitness Score</Text>
                        <Text className={"text-3xl mt-8"}>{"SCR"}</Text>
                    </View>
            </View>

            <View className={"px-8"}>
                <Text className={"mt-14 text-2xl text-center"}>Fitness Score</Text>
                <Text className={"mt-4 text-center "}>The Fitness Score is a unified measure of your daily wellness. It integrates three essential health pillars: nutrition, activity, and sleep—into a single number, providing a clear snapshot of your overall fitness balance.</Text>
            </View>

        </ScrollView>
    </View>
  );
}
