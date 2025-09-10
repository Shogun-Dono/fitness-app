import {ScrollView, Text, View} from "react-native";
import {Link} from "expo-router"

export default function Index() {
  return (
    <View className={"flex-1 justify-center items-center"}>
        <ScrollView>
            <Text className={"text-2xl"}>Hello Name</Text>
        </ScrollView>
    </View>
  );
}
