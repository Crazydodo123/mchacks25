import { Text, View, TextInput, TouchableOpacity } from "react-native";
import { useState } from "react";
import { Link } from "expo-router";

export default function Index() {
  const s = require("../styles.js");
  const [username, setUsername] = useState({});
  const [password, setPassword] = useState({});

  return (
    <View style={s.mainScreenB}>

        <Text style={s.styleText}>Sign in now:</Text>
        
    </View>
  );
}
