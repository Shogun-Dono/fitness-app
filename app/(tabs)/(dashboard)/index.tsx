import {Pressable, ScrollView, Text, View, Animated} from "react-native";
import {useColorScheme} from "nativewind";
import {AntDesign, Ionicons} from "@expo/vector-icons";
import React, {JSX, useState, useRef} from "react";
import {useRouter} from "expo-router";
import {Calendar} from "react-native-calendars";

import {colors} from "@/assets/constants/colors";

interface indieBreakdownProps {
    icon: JSX.Element,
    score: number,
    page: string,
}

export default function Index() {
    const {colorScheme} = useColorScheme();
    const router = useRouter();
    const widgetWidth = "24";
    const [selectedDay, setSelectedDay] = useState('');

    const [calendarVisible, setCalendarVisible] = useState(false);
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [calendarHeight, setCalendarHeight] = useState(350); // Default height

    // Use Animated.Value for animations
    const calendarOpacity = useRef(new Animated.Value(0)).current;
    const calendarScale = useRef(new Animated.Value(0.8)).current;
    const scrollViewTranslateY = useRef(new Animated.Value(0)).current;
    const containerOpacity = useRef(new Animated.Value(0)).current; // New animated value for container

    // Function to calculate calendar height based on the month
    const calculateCalendarHeight = (date: Date) => {
        const year = date.getFullYear();
        const month = date.getMonth();

        // Get first day of month and how many days in month
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startingDayOfWeek = firstDay.getDay();

        // Calculate total cells needed (including previous month's trailing days)
        const totalCells = daysInMonth + startingDayOfWeek;
        const weeksNeeded = Math.ceil(totalCells / 7);

        // Base height + (number of weeks * row height) + header height + padding
        const baseHeight = 120; // Header and padding
        const rowHeight = 45; // Height per week row
        const calculatedHeight = baseHeight + (weeksNeeded * rowHeight);

        return Math.max(calculatedHeight, 280); // Minimum height
    };

    const showCalendar = () => {
        const initialHeight = calculateCalendarHeight(currentMonth);
        setCalendarHeight(initialHeight);
        setCalendarVisible(true);

        Animated.parallel([
            Animated.timing(containerOpacity, {
                toValue: 1,
                duration: 250,
                useNativeDriver: true,
            }),
            Animated.timing(calendarOpacity, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
            }),
            Animated.spring(calendarScale, {
                toValue: 1,
                useNativeDriver: true,
            }),
            Animated.timing(scrollViewTranslateY, {
                toValue: initialHeight,
                duration: 300,
                useNativeDriver: true,
            })
        ]).start();
    };

    const hideCalendar = () => {
        Animated.parallel([
            Animated.timing(containerOpacity, {
                toValue: 0,
                duration: 150, // Faster container fade
                useNativeDriver: true,
            }),
            Animated.timing(calendarOpacity, {
                toValue: 0,
                duration: 200, // Faster fade out
                useNativeDriver: true,
            }),
            Animated.spring(calendarScale, {
                toValue: 0.8,
                useNativeDriver: true,
            }),
            Animated.timing(scrollViewTranslateY, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            })
        ]).start(() => {
            setCalendarVisible(false);
        });
    };

    const handleMonthChange = (month: any) => {
        const newDate = new Date(month.year, month.month - 1);
        setCurrentMonth(newDate);
        const newHeight = calculateCalendarHeight(newDate);

        // Update calendar height with state (no animation conflicts)
        setCalendarHeight(newHeight);

        // Update scroll view position to match new height
        if (calendarVisible) {
            Animated.timing(scrollViewTranslateY, {
                toValue: newHeight,
                duration: 200,
                useNativeDriver: true,
            }).start();
        }
    };

    const indieBreakdown = ({icon, score, page}: indieBreakdownProps) => {
        return (
            <Pressable
                className={"flex-col border border-bg2 justify-center items-center rounded-xl min-w-20 dark:bg-bg2 active:bg-gray-200 dark:active:bg-bg_dark_active"}
                onPress={() => {
                    // @ts-ignore
                    router.push(`/${page}`);
                }}
            >
                {icon}
                <Text className={"dark:text-text-dark mt-1"}>{score}</Text>
            </Pressable>
        );
    };

    // Define calendar theme based on color scheme
    const calendarTheme = {
        backgroundColor: colorScheme === "dark" ? colors.bg2 : "white",
        calendarBackground: colorScheme === "dark" ? colors.bg2 : "white",
        textSectionTitleColor: colorScheme === "dark" ? "#f4f4f5" : "#18181b",
        dayTextColor: colorScheme === "dark" ? "#f4f4f5" : "#18181b",
        todayTextColor: colors.primary,
        selectedDayBackgroundColor: colors.primary,
        selectedDayTextColor: "#fff",
        monthTextColor: colorScheme === "dark" ? "#f4f4f5" : "#18181b",
        arrowColor: colors.primary,
        textDisabledColor: colorScheme === "dark" ? "#64748b" : "#94a3b8",
        agendaKnobColor: colorScheme === "dark" ? colors.bg2 : "#e5e7eb",
        textDayFontWeight: '500',
        textMonthFontWeight: '600',
        textDayHeaderFontWeight: '600',
        // Additional styling for better theme support
        'stylesheet.calendar.header': {
            week: {
                marginTop: 5,
                flexDirection: 'row',
                justifyContent: 'space-around',
                backgroundColor: colorScheme === "dark" ? colors.bg2 : "white",
            }
        },
        'stylesheet.calendar.main': {
            container: {
                backgroundColor: colorScheme === "dark" ? colors.bg2 : "white",
            }
        }
    };

    // @ts-ignore
    // @ts-ignore
    return (
        <View className={"flex-1 dark:bg-bg items-center justify-center"}>
            {calendarVisible && (
                <Animated.View
                    style={[
                        {
                            width: '100%',
                            position: 'absolute',
                            top: 0,
                            zIndex: 100,
                            height: calendarHeight,
                        },
                        {
                            opacity: containerOpacity, // Animate the container opacity
                        }
                    ]}
                >
                    <Animated.View
                        style={{
                            flex: 1,
                            backgroundColor: colorScheme === "dark" ? colors.bg2 : "white",
                            opacity: calendarOpacity,
                            transform: [{ scale: calendarScale }],
                        }}
                    >
                        <Calendar
                            key={colorScheme} // Force re-render when theme changes
                            className={"w-full h-full"}
                            removeClippedSubviews={true}
                            enableSwipeMonths={true}
                            onMonthChange={handleMonthChange}
                            current={currentMonth.toISOString().split('T')[0]}
                            headerStyle={{
                                backgroundColor: colorScheme === "dark" ? colors.bg2 : "white",
                            }}
                            theme={calendarTheme}
                            onDayPress={day => {
                                setSelectedDay(day.dateString);
                            }}
                            markedDates={{
                                [selectedDay]: {selected: true, disableTouchEvent: true, selectedColor: colors.primary}
                            }}
                        />
                    </Animated.View>
                </Animated.View>
            )}

            <Animated.View
                style={[
                    { flex: 1, width: '100%' },
                    { transform: [{ translateY: scrollViewTranslateY }] }
                ]}
            >
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    className={"dark:bg-bg px-8"}
                    contentContainerClassName={"flex flex-col gap-5"}
                >

                    <View
                        className={" mt-4 flex-row h-20 items-center justify-center"}

                    >
                        <Pressable className={""}>
                            <AntDesign className={"pr-3"} name="left" size={26} color= {colorScheme === "light" ? "black" : "white"} />
                        </Pressable>
                        <Pressable
                            className={"active:bg-gray-200 dark:active:bg-bg_dark_active dark:bg-bg2 border border-black h-20 w-[18rem] rounded-2xl items-center justify-center"}
                            onPress={() => {
                                if (calendarVisible) {
                                    hideCalendar();
                                } else {
                                    showCalendar();
                                }
                            }}
                        >
                            <Text className={"text-text-light dark:text-text-dark"}>{"Thursday 12th September"}</Text>
                        </Pressable>
                        <Pressable className={""}>
                            <AntDesign className={"pl-3"} name="right" size={26} color = {colorScheme === "light" ? "black" : "white"} />
                        </Pressable>
                    </View>

                    <View className={`mt-8 dark:bg-bg2 z-50 border border-black h-[7rem] w-[${widgetWidth}rem] rounded-2xl items-center justify-center`}>
                        <Text className={"text-xl text-text-light dark:text-text-dark"}>Today&#39;s Fitness Score</Text>
                        <Text className={"text-3xl mt-3 text-text-light dark:text-text-dark"}>{"80"}</Text>
                    </View>

                    <View className={`h-20 flex-row justify-center gap-8 border-bg2 rounded-xl`}>
                        {indieBreakdown({
                            icon: <Ionicons name="barbell" size={22} color={colorScheme === "light" ? "black" : "white"} />,
                            score: 80,
                            page: "(workout)"
                        })}
                        {indieBreakdown({
                            icon: <Ionicons name="fast-food" size={22} color={colorScheme === "light" ? "black" : "white"} />,
                            score: 80,
                            page: "meals"
                        })}
                        {indieBreakdown({
                            icon: <Ionicons name="bed" size={22} color={colorScheme === "light" ? "black" : "white"} />,
                            score: 80,
                            page: "sleep"
                        })}
                    </View>

                    <View className={`dark:bg-bg2 py-2 flex flex-col px-8 border border-bg2 rounded-xl w-[${widgetWidth}rem] items-center justify-center`}>
                        <Text className={"text-2xl text-text-light dark:text-text-dark"}>Breakdown:</Text>
                        <Text className={"py-4 text-text-light dark:text-text-dark text-center"}>
                            Workout: Lorem ipsum dolor sit amet, consectetur adipiscing ~ 80
                        </Text>
                        <Text className={"py-4 text-text-light dark:text-text-dark text-center"}>
                            Sleep: Lorem ipsum dolor sit amet, consectetur adipiscing ~ 60
                        </Text>
                        <Text className={"py-4 text-text-light dark:text-text-dark text-center"}>
                            Meals: Lorem ipsum dolor sit amet, consectetur adipiscing ~ 90
                        </Text>
                    </View>

                    <View className={`dark:bg-bg2 flex flex-col px-8 border border-bg2 rounded-xl w-[${widgetWidth}rem]`}>
                        <Text className={"mt-14 text-2xl text-text-light dark:text-text-dark"}>Fitness Score</Text>
                        <Text className={"mt-4 text-text-light dark:text-text-dark"}>
                            The Fitness Score is a unified measure of your daily wellness. It integrates three essential health pillars:
                            nutrition, activity, and sleep—into a single number, providing a clear snapshot of your overall fitness balance.
                        </Text>

                        <Text className={"mt-14 text-2xl text-text-light dark:text-text-dark"}>How the Score is Calculated</Text>
                        <View className="">
                            <Text className="mt-4 mb-3 text-text-light dark:text-text-dark">
                                • <Text className="font-semibold text-text-light dark:text-text-dark">Nutrition:</Text> Evaluates the balance and quality of your food intake against your body&#39;s daily needs. Factors such as nutrient diversity, portion balance, and hydration all contribute.
                            </Text>
                            <Text className="mb-3 text-text-light dark:text-text-dark">
                                • <Text className="font-semibold text-text-light dark:text-text-dark">Activity:</Text> Reflects your movement and exercise throughout the day, considering both intensity and consistency relative to your fitness level.
                            </Text>
                            <Text className={"text-text-light dark:text-text-dark"}>
                                • <Text className="font-semibold text-text-light dark:text-text-dark">Sleep:</Text> Measures duration, quality, regularity of rest to assess how effectively your body is recovering and preparing for the next day.
                            </Text>

                            <Text className={"mt-14 text-2xl text-text-light dark:text-text-dark"}>Why It Matters?</Text>
                            <Text className={"mt-4 text-text-light dark:text-text-dark"}>
                                A higher score indicates a well-balanced day across all three pillars, while a lower score highlights areas for improvement.
                                Tracking this number over time helps you understand patterns, set goals, and build sustainable habits for long-term health.
                            </Text>
                            <Text className={"mt-14 mb-8 text-text-light dark:text-text-dark"}>
                                Your Fitness Score is more than a number—it&#39;s a daily reflection of how your lifestyle choices support your overall well-being.
                            </Text>
                        </View>
                    </View>
                </ScrollView>
            </Animated.View>
        </View>
    );
}