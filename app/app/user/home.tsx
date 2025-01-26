import { View, Text } from "react-native";
import { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import Footer from "../../components/footer";
import authServices from "../services/auth";

export default function Home() {
    const [ data, setData ] = useState({username: null, email: null});
    const { id } = useLocalSearchParams<{ id: string }>();
    const s = require("../../styles.js");

    useEffect(() => {
        const init = async () => {
            const response = await authServices.getUserInfo(id)
            console.log(response)

            data.username = response.username ?? response.email;
            console.log(response.username ? "true" : "false");
        }
        init()
	}, []);

    return (
        <View style={s.mainScreenA}>
            <View style={{flexGrow: 1, padding: 40}}>
                <Text style={{...s.styleTextEmph, fontSize: 30,}}>Hey, {data.username}</Text>
                <Text style={s.plainText}>Welcome back!</Text>
                <Text>Outstanding Debt</Text>
                <Text>200,000,000</Text>
            </View>
            <Footer page="home" id={id}/>
        </View>
    );
}
