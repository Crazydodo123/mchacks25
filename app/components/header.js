import { React, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Feather } from "@expo/vector-icons"; 

const Header = (props) => {
    const s = require("../styles.js");

    const icons = [['home', '[id]'], ['users', 'friends'], ['plus', 'track-debt'], ['trending-up', 'stats'], ['gear', 'settings']];

    return (
        <View style={{...s.hbox, backgroundColor: "white", width: "100%", justifyContent: "space-evenly"}}>
            <TouchableOpacity style={props.page == "home" ? {backgroundColor: "rgb(73, 163, 128)"} : {backgroundColor: "white"}}><Feather style={s.icon} name="home"/></TouchableOpacity>
            
            <Feather style={s.icon} name="users"/>
            <Feather style={s.icon} name="trending-up"/>
        </View>
    );
};

export default Header;
