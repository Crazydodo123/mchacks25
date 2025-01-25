import { View, Text } from "react-native";
import { useNavigation, useRouter, useLocalSearchParams } from "expo-router";

export default function Details() {
    const { id } = useLocalSearchParams<{ id: string }>();

    return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>{id}</Text>
        </View>
    );
}
