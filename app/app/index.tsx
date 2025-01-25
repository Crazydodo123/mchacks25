import { Text, View, TouchableOpacity, TextInput } from "react-native";
import { useState } from "react";
import { Link, router } from "expo-router";
import AppTitle from "../components/title";

export default function Index() {
  const s = require('../styles');
  const [username, setUsername] = useState({});
  const [password, setPassword] = useState({});

  const validateUser = () => {
    // check if user exists and if so, if they put the correct password
    // if so:
    router.navigate({pathname: "/user/[id]", params: {id: username.toString()}});
  };

  return (
    <View style={{...s.mainScreenB, paddingBottom: 150}}>
      <AppTitle/>
      <View>
          <TextInput style={s.textInput} placeholderTextColor="lightgray" textContentType="username" placeholder="email" onChangeText={newText => setUsername({...username, username: newText})}/>
          <TextInput style={s.textInput} placeholderTextColor="lightgray" textContentType="password" placeholder="password" secureTextEntry={true} onChangeText={newText => setUsername({...password, password: newText})}/>
          <Link href="/forgot-pass" asChild><TouchableOpacity><Text style={{...s.linkText, marginVertical: 5}}>Forgot password?</Text></TouchableOpacity></Link>
          <TouchableOpacity style={s.hozButton} onPress={() => {validateUser()}}><Text style={s.buttonText}>Log In</Text></TouchableOpacity>
      </View>

      <View style={{...s.hbox, margin: 5}}>
          <Text style={{...s.plainText, color: "rgb(73, 163, 128)"}}>No account?</Text>
          <Link href="/sign-up" asChild><TouchableOpacity><Text style={s.linkText}> Sign up now!</Text></TouchableOpacity></Link>
      </View>
    </View>
  );
}
