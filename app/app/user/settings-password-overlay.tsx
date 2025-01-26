import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { useState } from 'react';
import { Feather } from "@expo/vector-icons";
import AppTitle from "../../components/title";

export default function PasswordOverlay() {
    const s = require("../../styles.js");
    const [ogPass, setOGPass] = useState("");
    const [newPass, setNewPass] = useState("");
    const [cPass, setCPass] = useState("");

    const updatePassword = () => {
        // backend
    }

    return (
        <View style={{...s.mainScreenB, paddingBottom: 150}}>
            <Text style={{...s.styleTextEmph, paddingBottom: 20}}>Reset Password</Text>
            <TextInput style={s.textInput} placeholderTextColor="lightgray" textContentType="password" placeholder="old password" secureTextEntry={true} onChangeText={newText => setOGPass(newText)}/>
            <TextInput style={s.textInput} placeholderTextColor="lightgray" textContentType="password" placeholder="new password" secureTextEntry={true} onChangeText={newText => setNewPass(newText)}/>
            <TextInput style={s.textInput} placeholderTextColor="lightgray" textContentType="password" placeholder="confirm password" secureTextEntry={true} onChangeText={newText => setCPass(newText)}/>
            <TouchableOpacity style={s.hozButton} onPress={updatePassword}><Text style={s.buttonText}>Update</Text></TouchableOpacity>
        </View>
    );
}
