import { StyleSheet } from "react-native";

module.exports = StyleSheet.create({
    mainScreen: {
        backgroundColor: "#e3ffc8",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
    },

    hbox: {
        flexDirection: "row",
    },

    vbox: {
        flexDirection: "column",
    },
    
    button: {
        backgroundColor: "rgb(118, 199, 138)",
        padding: 10,
        borderRadius: 3,
        margin: 5,
    },

    buttonText: {
        color: "#e3ffc8",
        fontWeight: "600",
        fontFamily: "Verdana"
    },

    styleText: {
        color:"rgb(118, 199, 138)",
        fontWeight:600,
        fontSize:20,
        textAlign:"center",
    },

    styleTextEmph: {
        color:"rgb(73, 163, 128)",
        fontWeight:800,
        fontSize:20,
    },

    textinput: {
        backgroundColor: "white",
        padding: 5,
        width: 100,
        borderWidth: 1,
        borderColor: "lightgray",
        color: "lightgray",
    },
});
