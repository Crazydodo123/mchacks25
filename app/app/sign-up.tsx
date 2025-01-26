import { Text, View, TextInput, TouchableOpacity } from "react-native";
import { useState } from "react";
import { Link, router } from "expo-router";
import AppTitle from "../components/title";

import authServices from "./services/auth"

export default function Index() {
  const s = require("../styles.js");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");

  const register = async () => {
    if (password !== cpassword) {
      alert("passwords do not match!")
      return
    }
    
    await authServices.register({ email, password })
    const response = await authServices.login({ email, password })

    console.log(response)
    router.replace({pathname: "/user/home", params: { id: response.id, email: email }})
  }

  return (
    <View style={{...s.mainScreenB, paddingBottom: 150}}>
      <AppTitle/>
      <TextInput style={s.textInput} placeholderTextColor="lightgray" placeholder="email" onChangeText={newText => setEmail(newText)}/>
      <TextInput style={s.textInput} placeholderTextColor="lightgray" textContentType="password" placeholder="password" secureTextEntry={true} onChangeText={newText => setPassword(newText)}/>
      <TextInput style={s.textInput} placeholderTextColor="lightgray" textContentType="password" placeholder="confirm password" secureTextEntry={true} onChangeText={newText => setCPassword(newText)}/>
      <TouchableOpacity style={s.hozButton} onPress={register}><Text style={s.buttonText}>Sign Up</Text></TouchableOpacity>
    </View>
  );
}
