import React from 'react';
import { View, Text } from 'react-native';

const AppTitle = () => {
    const s = require("../styles.js");
    return (
        <View style={{...s.hbox, margin: 30}}>
            <Text style={{...s.title, color:"rgb(73, 163, 128)"}}>u</Text>
            <Text style={{...s.title, color:"rgb(118, 199, 138)"}}>o</Text>
            <Text style={{...s.title, color:"rgb(73, 163, 128)"}}>me</Text>
        </View>
    );
};

export default AppTitle;
