import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { Link } from "expo-router";

export default function Index() {
  const s = require('../styles');

  return (
    <View style={s.mainScreen}>
      <View style={{...s.hbox, margin: 40}}>
        <Text style={{...styles.title, color:"rgb(73, 163, 128)"}}>U</Text>
        <Text style={{...styles.title, color:"rgb(118, 199, 138)"}}>o</Text>
        <Text style={{...styles.title, color:"rgb(73, 163, 128)"}}>ME</Text>
      </View>
      <View style={{...s.hbox, marginBottom: 200}}>
        <Link style={s.button} href="./sign-in" asChild><TouchableOpacity><Text style={s.buttonText}>Login</Text></TouchableOpacity></Link>
        <Link style={s.button} href="./sign-in" asChild><TouchableOpacity><Text style={s.buttonText}>Sign Up</Text></TouchableOpacity></Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    fontFamily: "Verdana",
    fontWeight: "600",
  },
}); 
