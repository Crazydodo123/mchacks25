import { View, Text } from "react-native";
import { useEffect } from "react";
import { useNavigation, useRouter, useLocalSearchParams } from "expo-router";
import Footer from "../../components/footer";
import authServices from "../services/auth";

export default function Details() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const s = require("../../styles.js");

    useEffect(() => {
		const response = authServices.getUserInfo(id)
        
        console.log(response)
	}, []);

    return (
        <View style={s.mainScreenA}>
            <Footer page="home"/>
        </View>
    );
}
