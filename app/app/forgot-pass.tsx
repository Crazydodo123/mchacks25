import { Text, View, TextInput, TouchableOpacity } from "react-native";
import { useState } from "react";
import { router } from "expo-router";

export default function Index() {
  const s = require("../styles.js");
  const [email, setEmail] = useState("");

  const confirmEmail = () => {
    // send email and stuff
  }

  return (
    <View style={s.mainScreenB}>
        <Text style={s.styleTextEmph}>Forgot password?</Text>
        <Text style={{...s.plainText, color: "rgb(118, 199, 138)", paddingTop: 10}}>Insert the email you signed up</Text>
        <Text style={{...s.plainText, color: "rgb(118, 199, 138)", paddingBottom: 10}}>with to receive a confirmation.</Text>
        <TextInput style={s.textInput} placeholder="email" placeholderTextColor={"lightgray"}></TextInput>
        <TouchableOpacity style={s.hozButton} onPress={() => {confirmEmail()}}><Text style={s.buttonText}>Send Email</Text></TouchableOpacity>
        <TouchableOpacity style={s.hozButton} onPress={() => {router.back()}}><Text style={s.buttonText}>Cancel</Text></TouchableOpacity>
    </View>
  );
}
