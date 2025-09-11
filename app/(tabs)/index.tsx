import {ScrollView, Text, View} from "react-native";
import {Link} from "expo-router"


export default function Index() {
  return (
    <View className={"flex-1"}>
        <ScrollView>
            <View className={"justify-center items-center"}>
                <Text className={"text-2xl mt-14 "}>Hello Name</Text>
                    <View className={"mt-8 border border-black h-56 w-80 rounded-2xl items-center"} >
                        <Text className={"text-xl mt-14"}>Your Fitness Score</Text>
                        <Text className={"text-3xl mt-8"}>{"SCR"}</Text>
                    </View>
            </View>

            <View className={"px-8"}>
                <Text className={"mt-14 text-2xl"}>Fitness Score</Text>
                <Text className={"mt-4  "}>The Fitness Score is a unified measure of your daily wellness. It integrates three essential health pillars: nutrition, activity, and sleep—into a single number, providing a clear snapshot of your overall fitness balance.</Text>
                <Text className={"mt-14 text-2xl"}>How the Score is Calculated</Text>
                <View className="">
                    <Text className="mt-4 mb-3">
                        • <Text className="font-semibold">Nutrition:</Text> Evaluates the balance
                        and quality of your food intake against your body’s daily needs. Factors
                        such as nutrient diversity, portion balance, and hydration all contribute.
                    </Text>

                    <Text className="mb-3">
                        • <Text className="font-semibold">Activity:</Text> Reflects your movement
                        and exercise throughout the day, considering both intensity and consistency
                        relative to your fitness level.
                    </Text>

                    <Text>
                        • <Text className="font-semibold">Sleep:</Text> Measures duration, quality,
                        and regularity of rest to assess how effectively your body is recovering
                        and preparing for the next day.
                    </Text>

                    <Text className={"mt-14 text-2xl"}>Why It Matters?</Text>
                    <Text className={"mt-4  "}>A higher score indicates a well-balanced day across all three pillars, while a lower score highlights areas for improvement. Tracking this number over time helps you understand patterns, set goals, and build sustainable habits for long-term health.</Text>
                    <Text className={"mt-14 mb-8"}>Your Fitness Score is more than a number—it’s a daily reflection of how your lifestyle choices support your overall well-being.</Text>
                </View>
            </View>

        </ScrollView>
    </View>
  );
}
