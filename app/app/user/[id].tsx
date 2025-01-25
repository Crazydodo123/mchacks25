import { View, Text } from "react-native";
import { useEffect } from "react";
import { useNavigation, useRouter, useLocalSearchParams } from "expo-router";
import Header from "../../components/header";

export default function Details() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const s = require("../../styles.js");

    useEffect(() => {
		
	}, []);

    return (
        <View style={s.mainScreenA}>
            <Header page="home"/>
        </View>
    );
}
