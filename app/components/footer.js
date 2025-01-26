import { React, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { router } from "expo-router";
import { Feather } from "@expo/vector-icons"; 

const Footer = (props) => {
    const s = require("../styles.js");

    // [feather icon name, page extension (for navigation), page name (for display)]
    const icons = [["home", "home", "home"], ["users", "friends", "friends"], ["plus", "add-debt", "track"], ["trending-up", "stats", "statistics"], ["settings", "settings", "settings"]];

    console.log("props", props)

    return (
        <View style={{...s.hbox, backgroundColor: "white", width: "100%", justifyContent: "space-evenly"}}>
            <FlatList contentContainerStyle={{flexGrow: 1, flex: 1, justifyContent: "center"}} scrollEnabled={false} data={icons} horizontal={true}
                renderItem={({item}) => {
                    return (
                        <TouchableOpacity
                            style={props.page == item[1] ? {...s.iconBox, backgroundColor: "rgb(73, 163, 128)"} : s.iconBox}
                            onPress={() => {router.replace({pathname: "/user/"+item[1], params: { id: props.id, email: props.email }})}}
                            >
                            <Feather style={props.page == item[1] ? {...s.icon, color: "#e3ffc8"} : s.icon} name={item[0]}/>
                            <Text style={props.page == item[1] ? {...s.iconText, color: "#e3ffc8"} : s.iconText}>{item[2]}</Text>
                        </TouchableOpacity>
                    )
                }}
            />
        </View>
    );
};

export default Footer;
