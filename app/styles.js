import { StyleSheet } from "react-native";

const lightgreen = "#e3ffc8";
const medgreen = "rgb(118, 199, 138)";
const darkgreen = "rgb(73, 163, 128)";

module.exports = StyleSheet.create({
    mainScreenA: {
        backgroundColor: "rbh(245, 245, 245)",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },

    mainScreenB: {
        backgroundColor: lightgreen,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },

    hbox: {
        flexDirection: "row",
    },

    vbox: {
        flexDirection: "column",
    },

    title: {
        fontSize: 60,
        fontFamily: "Verdana",
        fontWeight: "600",
    },
    
    button: {
        backgroundColor: medgreen,
        padding: 10,
        borderRadius: 3,
        margin: 5,
    },

    buttonText: {
        color: lightgreen,
        fontWeight: "600",
        fontFamily: "Verdana"
    },

    styleText: {
        color:medgreen,
        fontWeight:600,
        fontSize:20,
        textAlign:"center",
    },

    styleTextEmph: {
        color:darkgreen,
        fontWeight:800,
        fontSize:20,
    },

    plainText: {
        fontSize: 15,
        fontWeight: 500,
        textAlign: "right",
    },

    linkText: {
        color: "rgb(25, 181, 181)",
        fontSize: 15,
        fontWeight: 700,
        textAlign: "right",
    },

    textInput: {
        backgroundColor: "white",
        padding: 5,
        width: 200,
        borderWidth: 1,
        borderColor: "lightgray",
        marginVertical: 4,
    },

    hozButton: {
        backgroundColor:medgreen,
        padding: 5,
        width: 200,
        borderRadius: 10,
        marginVertical: 8,
        alignItems: "center",
    },

    icon: {
        fontSize: 20,
        strokeWidth: 10,
        padding: 15,
        color: medgreen,
    },
});
