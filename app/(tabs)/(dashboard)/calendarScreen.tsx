import {View, Text} from 'react-native'
import React, {useState} from 'react'
import {useColorScheme} from "nativewind";
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "@/tailwind.config";


import {colors} from "@/assets/constants/colors"

const CalendarScreen = () => {

    const [selected, setSelected] = useState('');
    const {colorScheme} = useColorScheme();

    return (
        <View className={"dark:bg-bg h-full items-center justify-center"}>
            <Calendar
                style={{
                    minHeight: "70%",
                    minWidth: "95%",
                    borderRadius: "3%"
                }}
                className={""}
                enableSwipeMonths={true}
                headerStyle={{}}
                theme={{
                    backgroundColor: "white",
                    calendarBackground: colorScheme === "dark" ? colors.bg2 : "white",
                    textSectionTitleColor: colorScheme === "dark" ? "white" : "black",
                    selectedDayBackgroundColor: '#00adf5',
                    selectedDayTextColor: '#ffffff',
                    todayTextColor: '#00adf5',
                    dayTextColor: colorScheme === "dark" ? "white" : "black",
                    textDisabledColor: '#dd99ee'
                }}
                markedDates={{
                    [selected]: {selected: true, disableTouchEvent: true, selectedColor: colors.primary}
                }}
                onDayPress={day => {
                    setSelected(day.dateString);
                }}
            />
        </View>
    )
}
export default CalendarScreen
