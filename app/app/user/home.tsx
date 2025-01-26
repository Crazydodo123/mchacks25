import { View, Text } from "react-native";
import { useEffect, useState , useContext} from "react";
import { useLocalSearchParams } from "expo-router";
import Footer from "../../components/footer";
import authServices from "../services/auth";
import SettingsList from "../context/setting-list.js";

export default function Home() {
    const { settings } = useContext(SettingsList);
    const [ data, setData ] = useState({username: null, email: null});
    const { id, email } = useLocalSearchParams<{ id: string, email: string }>();
    const s = require("../../styles.js");

    useEffect(() => {
        const init = async () => {
            const response = await authServices.getUserInfo(id)
            console.log(response)

            setData({...data, username: response.username ?? response.email});
        }
        init()
	}, []);

    return (
        <View style={s.mainScreenA}>
            <View style={{flexGrow: 1, padding: 40}}>
                <Text style={{...s.styleTextEmph, fontSize: 30,}}>Hey, {settings.name == "" ? email : settings.name}</Text>
                <Text style={s.plainText}>Welcome back!</Text>
                <Text>Outstanding Debt</Text>
                <Text>200,000,000</Text>
            </View>
            <Footer page="home" id={id} email={email}/>
        </View>
    );
}
