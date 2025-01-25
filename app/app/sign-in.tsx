import { Text, View, TextInput } from "react-native";
import { useState } from "react";
import { Link } from "expo-router";

export default function Index() {
  const s = require("../styles.js");
  const [username, setUsername] = useState({});

  return (
    <View style={s.mainScreen}>
        <View>
            <Text style={s.styleText}>No account? No worries!</Text>
            <View style={s.hbox}>
                <Text style={s.styleText}>Get started today for </Text>
                <Text style={s.styleTextEmph}> free!</Text>
            </View>
        </View>
        <View>
            <TextInput style={s.textinput} textContentType="username" placeholder="username" onChangeText={newText => setUsername({...username, username: newText})}/>
        </View>
    </View>
  );
}
