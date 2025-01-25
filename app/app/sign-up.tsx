import { Text, View, TextInput, TouchableOpacity } from "react-native";
import { useState } from "react";
import { Link } from "expo-router";
import AppTitle from "../components/title";

export default function Index() {
  const s = require("../styles.js");
  const [email, setEmail] = useState({});
  const [password, setPassword] = useState({});
  const [cpassword, setCPassword] = useState({});

  return (
    <View style={{...s.mainScreenB, paddingBottom: 150}}>
      <AppTitle/>
      <TextInput style={s.textInput} placeholderTextColor="lightgray" placeholder="email" onChangeText={newText => setEmail({...email, email: newText})}/>
      <TextInput style={s.textInput} placeholderTextColor="lightgray" textContentType="password" placeholder="password" secureTextEntry={true} onChangeText={newText => setPassword({...password, password: newText})}/>
      <TextInput style={s.textInput} placeholderTextColor="lightgray" textContentType="password" placeholder="confirm password" secureTextEntry={true} onChangeText={newText => setCPassword({...cpassword, cpassword: newText})}/>
      <TouchableOpacity style={s.hozButton}><Text style={s.buttonText}>Sign Up</Text></TouchableOpacity>
    </View>
  );
}
