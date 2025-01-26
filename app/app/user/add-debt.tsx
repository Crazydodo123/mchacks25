import { View, Text, TouchableOpacity } from "react-native";
import { useEffect } from "react";
import { useLocalSearchParams, router } from "expo-router";
import Footer from "../../components/footer";
import authServices from "../services/auth";

export default function AddDebt() {
    const { id } = useLocalSearchParams<{ id: string, email: string }>();
    const s = require("../../styles.js");

    return (
        <View style={s.mainScreenA}>
            <View style={{flexGrow: 1, alignItems: "center", justifyContent: "center"}}>
                <TouchableOpacity style={s.hozButton} onPress={() => {router.navigate({pathname: "/user/cam-overlay"})}}><Text style={s.buttonText}>Scan Receipt</Text></TouchableOpacity>
                <TouchableOpacity style={s.hozButton} onPress={() => {}}><Text style={s.buttonText}>Enter Manually</Text></TouchableOpacity>
            </View>
            <Footer page="add-debt" id={id}/>
        </View>
    );
}
