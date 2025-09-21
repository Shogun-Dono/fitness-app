import {Pressable, ScrollView, Text, View, StatusBar} from "react-native";
import {useColorScheme} from "nativewind";
import {Ionicons} from "@expo/vector-icons";
import React, {JSX, memo, useMemo, useCallback, useState, useEffect} from "react";
import {useRouter} from "expo-router";
import {CalendarProvider, ExpandableCalendar} from "react-native-calendars";
import {colors} from "@/assets/constants/colors"

interface indieBreakdownProps{
    icon: JSX.Element,
    score: number
    page: string,
}

// Memoize the IndieBreakdown component to prevent unnecessary re-renders
const IndieBreakdown = memo(({icon, score, page}: indieBreakdownProps) => {
    const router = useRouter();

    const handlePress = useCallback(() => {
        // @ts-ignore
        router.push(`/${page}`);
    }, [page, router]);

    return(
        <Pressable
            className={"flex-col border border-bg2 justify-center items-center rounded-xl min-w-20 dark:bg-bg2 active:bg-gray-200 dark:active:bg-bg_dark_active"}
            onPress={handlePress}
        >
            {icon}
            <Text className={"dark:text-text-dark mt-1"}>{score}</Text>
        </Pressable>
    )
});

IndieBreakdown.displayName = 'IndieBreakdown';

// Memoize the widget components
const FitnessScoreWidget = memo(() => {
    const widgetWidth = "24";

    return (
        <View className={`mt-8 dark:bg-bg2 z-50 border border-black h-[7rem] w-[${widgetWidth}rem] rounded-2xl items-center justify-center`}>
            <Text className={"text-xl text-text-light dark:text-text-dark"}>Today&apos;s Fitness Score</Text>
            <Text className={"text-3xl mt-3 text-text-light dark:text-text-dark"}>{"80"}</Text>
        </View>
    );
});

FitnessScoreWidget.displayName = 'FitnessScoreWidget';

const BreakdownWidget = memo(() => {
    const {colorScheme} = useColorScheme();
    const widgetWidth = "24";

    const breakdownData = useMemo(() => [
        {
            icon: <Ionicons name="barbell" size={22} color={colorScheme === "light" ? "black" : "white"} />,
            score: 80,
            page: "(workout)"
        },
        {
            icon: <Ionicons name="fast-food" size={22} color={colorScheme === "light" ? "black" : "white"} />,
            score: 80,
            page: "meals"
        },
        {
            icon: <Ionicons name="bed" size={22} color={colorScheme === "light" ? "black" : "white"} />,
            score: 80,
            page: "sleep"
        }
    ], [colorScheme]);

    return (
        <>
            <View className={`h-20 flex-row justify-center gap-8 border-bg2 rounded-xl`}>
                {breakdownData.map((item, index) => (
                    <IndieBreakdown
                        key={index}
                        icon={item.icon}
                        score={item.score}
                        page={item.page}
                    />
                ))}
            </View>

            <View className={`dark:bg-bg2 py-2 flex flex-col px-8 border border-bg2 rounded-xl w-[${widgetWidth}rem] items-center justify-center`}>
                <Text className={"text-2xl text-text-light dark:text-text-dark"}>Breakdown:</Text>
                <Text className={"py-4 text-text-light dark:text-text-dark text-center"}>Workout: Lorem ipsum dolor sit amet, consectetur adipiscing ~ 80</Text>
                <Text className={"py-4 text-text-light dark:text-text-dark text-center"}>Sleep: Lorem ipsum dolor sit amet, consectetur adipiscing ~ 60</Text>
                <Text className={"py-4 text-text-light dark:text-text-dark text-center"}>Meals: Lorem ipsum dolor sit amet, consectetur adipiscing ~ 90</Text>
            </View>
        </>
    );
});

BreakdownWidget.displayName = 'BreakdownWidget';

const InfoWidget = memo(() => {
    const widgetWidth = "24";

    return (
        <View className={`dark:bg-bg2 flex flex-col px-8 border border-bg2 rounded-xl w-[${widgetWidth}rem]`}>
            <Text className={"mt-14 text-2xl text-text-light dark:text-text-dark"}>Fitness Score</Text>
            <Text className={"mt-4 text-text-light dark:text-text-dark"}>The Fitness Score is a unified measure of your daily wellness. It integrates three essential health pillars: nutrition, activity, and sleep—into a single number, providing a clear snapshot of your overall fitness balance.</Text>

            <Text className={"mt-14 text-2xl text-text-light dark:text-text-dark"}>How the Score is Calculated</Text>
            <View className="">
                <Text className="mt-4 mb-3 text-text-light dark:text-text-dark">
                    • <Text className="font-semibold text-text-light dark:text-text-dark">Nutrition:</Text> Evaluates the balance and quality of your food intake against your body&apos;s daily needs. Factors such as nutrient diversity, portion balance, and hydration all contribute.
                </Text>
                <Text className="mb-3 text-text-light dark:text-text-dark">
                    • <Text className="font-semibold text-text-light dark:text-text-dark">Activity:</Text> Reflects your movement and exercise throughout the day, considering both intensity and consistency relative to your fitness level.
                </Text>
                <Text className={"text-text-light dark:text-text-dark"}>
                    • <Text className="font-semibold text-text-light dark:text-text-dark">Sleep:</Text> Measures duration, quality, and regularity of rest to assess how effectively your body is recovering and preparing for the next day.
                </Text>

                <Text className={"mt-14 text-2xl text-text-light dark:text-text-dark"}>Why It Matters?</Text>
                <Text className={"mt-4 text-text-light dark:text-text-dark"}>A higher score indicates a well-balanced day across all three pillars, while a lower score highlights areas for improvement. Tracking this number over time helps you understand patterns, set goals, and build sustainable habits for long-term health.</Text>
                <Text className={"mt-14 mb-8 text-text-light dark:text-text-dark"}>Your Fitness Score is more than a number—it&apos;s a daily reflection of how your lifestyle choices support your overall well-being.</Text>
            </View>
        </View>
    );
});

InfoWidget.displayName = 'InfoWidget';

export default function Index() {
    const {colorScheme} = useColorScheme();
    const [selected, setSelected] = useState(new Date().toISOString().split('T')[0]); // Initialize with today's date
    const [calendarKey, setCalendarKey] = useState(0); // Force re-render key

    // Force calendar re-render when color scheme changes
    useEffect(() => {
        setCalendarKey(prev => prev + 1);
    }, [colorScheme]);

    // Memoize the current date to prevent recalculation
    const currentDate = useMemo(() => new Date().toISOString().split('T')[0], []);

    // Memoize marked dates object
    const markedDates = useMemo(() => ({
        [selected]: {
            selected: true,
            disableTouchEvent: false, // Allow touch events
            selectedColor: colors.primary, // Use colors.primary for background
            selectedTextColor: '#fff' // White text
        }
    }), [selected]);

    // Memoize calendar theme to prevent recreation on each render
    const calendarTheme = useMemo(() => ({
        backgroundColor: colorScheme === "dark" ? colors.bg2 : "white",
        calendarBackground: colorScheme === "dark" ? colors.bg2 : "white",
        textSectionTitleColor: colorScheme === "dark" ? "#f4f4f5" : "#18181b",
        dayTextColor: colorScheme === "dark" ? "#f4f4f5" : "#18181b",
        todayTextColor: colors.primary,
        selectedDayBackgroundColor: colors.primary,
        selectedDayTextColor: "#fff",
        monthTextColor: colorScheme === "dark" ? "#f4f4f5" : "#18181b",
        arrowColor: colors.primary,
        textDisabledColor: colorScheme === "dark" ? "#666" : "#ccc",
        agendaKnobColor: colorScheme === "dark" ? colors.bg2 : "#f0f0f0",
        // Additional theme properties to ensure complete coverage
        textDayFontFamily: 'System',
        textMonthFontFamily: 'System',
        textDayHeaderFontFamily: 'System',
        textDayFontSize: 16,
        textMonthFontSize: 16,
        textDayHeaderFontSize: 13
    }), [colorScheme]);

    // Memoize header style
    const headerStyle = useMemo(() => ({
        backgroundColor: colorScheme === "dark" ? colors.bg2 : "white",
    }), [colorScheme]);

    return (
        <View className={"flex-1 dark:bg-bg items-center justify-center"}>
            <StatusBar
                barStyle={colorScheme === "dark" ? "light-content" : "dark-content"}
                backgroundColor={colorScheme === "dark" ? colors.bg : "white"}
            />
            <CalendarProvider date={currentDate}>
                <ExpandableCalendar
                    key={calendarKey} // Force re-render when theme changes
                    pastScrollRange={5}
                    futureScrollRange={5}
                    initialNumToRender={1}
                    windowSize={2}
                    maxToRenderPerBatch={5}
                    removeClippedSubviews={true}
                    enableSwipeMonths={false}
                    closeOnDayPress={true}
                    onDayPress={(day) => {
                        setSelected(day.dateString);
                        console.log(day);
                    }}
                    markedDates={markedDates}
                    headerStyle={headerStyle}
                    theme={calendarTheme}
                    // Additional performance optimizations
                    disableWeekScroll={false}
                    allowShadow={false}
                />

                <ScrollView
                    showsVerticalScrollIndicator={false}
                    className={"dark:bg-bg px-8"}
                    contentContainerClassName={"flex flex-col gap-5"}
                    // Performance optimizations for ScrollView
                    removeClippedSubviews={true}
                >
                    <FitnessScoreWidget />
                    <BreakdownWidget />
                    <InfoWidget />
                </ScrollView>
            </CalendarProvider>
        </View>
    );
}