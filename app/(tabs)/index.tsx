import {ScrollView, Text, View} from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';
import {useColorScheme} from "nativewind";


export default function Index() {
    const {colorScheme} = useColorScheme();

  return (
    <ScrollView className={"dark:bg-bg"}>
        <View className={"dark:bg-bg flex flex-col gap-5 items-center justify-center"}>
            <View className={" mt-4 flex-row h-20 items-center justify-center"}>
                <AntDesign className={"pr-3"} name="left" size={26} color= {colorScheme === "light" ? "black" : "white"} />
                <View className={"dark:bg-bg2 border border-black h-20 w-[18rem] rounded-2xl items-center justify-center"}>
                    <Text className={"text-text-light dark:text-text-dark"}>{"Thursday 12th September"}</Text>
                </View>
                <AntDesign className={"pl-3"} name="right" size={26} color = {colorScheme === "light" ? "black" : "white"} />
            </View>


            <View className={"dark:bg-bg2 z-50 border border-black h-[9rem] w-[27rem] rounded-2xl items-center justify-center"} >
                <Text className={"text-xl text-text-light dark:text-text-dark"}>Your Fitness Score</Text>
                <Text className={"text-3xl mt-3 text-text-light dark:text-text-dark"}>{"80"}</Text>
            </View>

            <View className={"dark:bg-bg2 py-2 flex flex-col px-8 border border-bg2 rounded-xl w-[27rem] items-center justify-center"}>
                <Text className={"text-2xl text-text-light dark:text-text-dark"}>Breakdown:</Text>
                <Text className={"py-4 text-text-light dark:text-text-dark text-center"}>Workout: Lorem ipsum dolor sit amet, consectetur adipiscing ~ 80</Text>
                <Text className={"py-4 text-text-light dark:text-text-dark text-center"}>Sleep: Lorem ipsum dolor sit amet, consectetur adipiscing ~ 60</Text>
                <Text className={"py-4 text-text-light dark:text-text-dark text-center"}>Meals: Lorem ipsum dolor sit amet, consectetur adipiscing ~ 90</Text>
            </View>

            <View className={"dark:bg-bg2 flex flex-col px-8 border border-bg2 rounded-xl w-[27rem]"}>
                <Text className={"mt-14 text-2xl text-text-light dark:text-text-dark"}>Fitness Score</Text>
                <Text className={"mt-4 text-text-light dark:text-text-dark"}>The Fitness Score is a unified measure of your daily wellness. It integrates three essential health pillars: nutrition, activity, and sleep—into a single number, providing a clear snapshot of your overall fitness balance.</Text>
                <Text className={"mt-14 text-2xl text-text-light dark:text-text-dark"}>How the Score is Calculated</Text>
                <View className="">
                    <Text className="mt-4 mb-3 text-text-light dark:text-text-dark">
                        • <Text className="font-semibold text-text-light dark:text-text-dark">Nutrition:</Text> Evaluates the balance
                        and quality of your food intake against your body’s daily needs. Factors
                        such as nutrient diversity, portion balance, and hydration all contribute.
                    </Text>

                    <Text className="mb-3 text-text-light dark:text-text-dark">
                        • <Text className="font-semibold text-text-light dark:text-text-dark">Activity:</Text> Reflects your movement
                        and exercise throughout the day, considering both intensity and consistency
                        relative to your fitness level.
                    </Text>

                    <Text className={"text-text-light dark:text-text-dark"}>
                        • <Text className="font-semibold text-text-light dark:text-text-dark">Sleep:</Text> Measures duration, quality,
                        and regularity of rest to assess how effectively your body is recovering
                        and preparing for the next day.
                    </Text>

                    <Text className={"mt-14 text-2xl text-text-light dark:text-text-dark"}>Why It Matters?</Text>
                    <Text className={"mt-4 text-text-light dark:text-text-dark"}>A higher score indicates a well-balanced day across all three pillars, while a lower score highlights areas for improvement. Tracking this number over time helps you understand patterns, set goals, and build sustainable habits for long-term health.</Text>
                    <Text className={"mt-14 mb-8 text-text-light dark:text-text-dark"}>Your Fitness Score is more than a number—it’s a daily reflection of how your lifestyle choices support your overall well-being.</Text>
                </View>
            </View>
        </View>

    </ScrollView>
  );
}
