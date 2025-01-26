import { React, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { router } from "expo-router";
import { Feather } from "@expo/vector-icons"; 

const Header = (props) => {
    const s = require("../styles.js");

    const icons = [["home", "[id]"], ["users", "friends"], ["plus", "track-debt"], ["trending-up", "stats"], ["settings", "settings"]];

    return (
        <View style={{...s.hbox, backgroundColor: "white", width: "100%", justifyContent: "space-evenly"}}>
            <FlatList contentContainerStyle={{justifyContent: "space-evenly"}} scrollEnabled={false} data={icons} horizontal={true}
                renderItem={({item}) => {
                    return (
                        <TouchableOpacity
                            style={props.page == item[0] ? {backgroundColor: "rgb(73, 163, 128)"} : {backgroundColor: "white"}}
                            onPress={() => {router.replace({pathname: "/users/"+item[1]})}}
                            >
                            <Feather style={s.icon} name={item[0]}/>
                        </TouchableOpacity>
                    )
                }}
            />
        </View>
    );
};

export default Header;
