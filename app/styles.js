import { StyleSheet } from "react-native";

const lightgreen = "#e3ffc8";
const medgreen = "rgb(118, 199, 138)";
const darkgreen = "rgb(73, 163, 128)";

module.exports = StyleSheet.create({
    mainScreenA: {
        backgroundColor: "rbg(245, 245, 245)",
        flex: 1,
        justifyContent: "center",
        paddingTop: 20,
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

    iconBox: {
        alignItems: "center",
    },

    icon: {
        fontSize: 25,
        padding: 25,
        paddingTop: 15,
        paddingBottom: 2,
        color: medgreen,
    },

    iconText: {
        fontSize: 15,
        color: medgreen,
        paddingBottom: 25,
    },

    sectionHeaderBox: {
        height: 50,
        backgroundColor: "white",
        paddingHorizontal: 20,
        alignItems: 'center',
        flexDirection: "row",
    },
});
