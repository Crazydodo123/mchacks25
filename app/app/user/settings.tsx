import React, { useEffect, useState, useContext } from "react";
import { useLocalSearchParams, router } from "expo-router";
import { Text, View, SectionList, TouchableOpacity, TextInput } from "react-native";
import { Feather } from "@expo/vector-icons";
import SettingList from "../context/setting-list.js";
import Footer from "../../components/footer";

export default function SettingsScreen() {
    const { id, email } = useLocalSearchParams<{ id: string, email: string }>();
    const s = require("../../styles.js");
	const { settings, changeSetting, setSettings } = useContext(SettingList);
	
	const [ tempSettings, setTempSettings ] = useState(settings);
    const [ tempChange, setTempChange ] = useState<boolean>(false);
	const [ showDetail, setShowDetail ] = useState<string>("");
    
    const settingDisplay = [
		{title: 'profile', data:
			[{setting: "name", title: 'display name', type: 'text-input', detail: "This is the name other people will see when they view your profile. (defaults to email if blank)"},
			{title: "password", type: "to-page", toPage: "settings-password-overlay"},
			]},
		{title: 'friends', data:
			[{title: 'friends', type: 'to-page', toPage: "friends"},
			]},
        {title: 'appearance', data:
            [{setting: 'darkMode', title: 'dark mode', type: 'checkbox'},
            ]},
		{title: 'notifications', data:
			[{setting: "notifs", title: 'push notifications', type: 'checkbox', detail: 'Deselect to receive no notifications at all.'},
			{setting: "debtNotifs", title: "debt requested", type: 'checkbox', detail: 'Enables notifications when another user submits a debt request to you. (they paid for youd)'},
			{setting: "payNotifs", title: 'debt repaid', type: 'checkbox', detail: 'Enables notifications when another user submits a debt payment to you. (you paid for them)'},
    ]}];

    const updateVariable = (varname: string, newval: any) => {
        if(settings[varname] == newval) {
            setTempChange(false);
        }
        else {
            setTempChange(true);
            setTempSettings({...tempSettings, [varname]: newval})
        }
    }

	return (
        <View style={{...s.mainScreenA, paddingTop: 0}}>
            <SectionList
                bounces={false}
                showsVerticalScrollIndicator={false}
                decelerationRate={0.97}
                indicatorStyle="white"
                stickySectionHeadersEnabled={false}
                sections={settingDisplay}
                data={settingDisplay}
                extraData={tempSettings}
                renderItem={({ item }) => {
                    return (
                        <View>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', height: 35, paddingHorizontal: 15,}}>
                                <View style={{flex: 1, flexDirection: "row", alignItems: 'center'}}><Text style={{fontSize: 16, color: "#rgb(100, 100, 100)",}}>{item.title} </Text>
                                    {item.detail ? <TouchableOpacity onPress={() => {setShowDetail(showDetail == item.title ? "" : item.title)}}><Feather style={{fontSize: 16, color: '#rgb(100, 100, 100)', padding: 7}} name='help-circle'/></TouchableOpacity> : <></>}
                                    {item.type == 'to-page' ? <TouchableOpacity onPress={() => {router.navigate({pathname: `./${item.toPage}`, params: {screen: item.toPage, id: id, email: email}})}}><Feather style={{fontSize: 16, color: '#rgb(100, 100, 100)', padding: 7,}} name='arrow-right'/></TouchableOpacity> : <></>}
                                    {item.type == 'checkbox' ? <TouchableOpacity activeOpacity={0.6} onPressOut={() => updateVariable(item.setting ?? item.title, !tempSettings[item.setting ?? item.title])}><Feather style={{fontSize: 16, color: '#rgb(100, 100, 100)', padding: 7,}} name={tempSettings[item.setting ?? item.title] == false ? "square" : "check-square"}/></TouchableOpacity> : <></>}
                                </View>
                                
                                {item.type == 'num-input' ? <View style={{flex: 0.6}}><TextInput value={`${tempSettings[item.setting ?? item.title]}`} onChangeText={(text) => {updateVariable(item.setting ?? item.title, text)}} maxLength={6} keyboardAppearance={tempSettings.darkMode ? "dark" : "light"} inputMode='decimal' style={{backgroundColor: 'white', width: 60, height: 25, borderWidth: 1.5, borderColor: "rgb(100, 100, 100)", padding: 3,}}></TextInput></View> : <></>}
                                {item.type == 'text-input' ? <View style={{flex: 0.6}}><TextInput value={`${tempSettings[item.setting ?? item.title]}`} onChangeText={(text) => {updateVariable(item.setting ?? item.title, text)}} keyboardAppearance={tempSettings.darkMode ? "dark" : "light"} style={{backgroundColor: 'white', width: 120, height: 25, borderWidth: 1.5, borderColor: "rgb(100, 100, 100)", padding: 3,}}></TextInput></View> : <></>}
                                
                            </View>
                            {showDetail == item.title ? <Text style={{fontSize: 15, backgroundColor: "rgb(245, 245, 245)", padding: 9, margin: 8, marginHorizontal: 16, borderRadius: 5}}>{item.detail}</Text> : <></>}
                        </View>
                    );
                }}
                renderSectionHeader={({section: {title}}) => (
                    <View style={{height: 60}}>
                        <View style={s.sectionHeaderBox}>
                            <Text style={s.styleText}>{title}</Text>
                        </View>
                    </View>
                )}
                renderSectionFooter={() => (<View style={{height: 15,}}/>)}
                contentContainerStyle={{flexGrow: 1, backgroundColor: "white"}}
                ListHeaderComponent={
                    <View style={{backgroundColor: "rbg(245, 245, 245)", paddingTop: 40}}>
                        <View style={s.sectionHeaderBox}>
                            <Text style={s.styleText}>settings</Text>
                        </View>
                        <View style={{alignItems: "center", backgroundColor: "rbg(245, 245, 245)"}}>
                            <View style={{justifyContent: "center", alignItems: "center", width: 80, height: 80, backgroundColor: "lightseagreen", borderRadius: 100}}>
                                <Feather name="user" style={{opacity: 0.5, color: "white", fontSize: 40}}/>
                            </View>
                            <Text style={{...s.plainText, padding: 15, color: "rgb(100, 100, 100)"}}>{email}</Text>
                            <TouchableOpacity style={s.hozButton} onPress={() => {}}><Text style={s.buttonText}>Logout</Text></TouchableOpacity>
                            <TouchableOpacity disabled={!tempChange} onPress={() => {setSettings(tempSettings); setTempChange(false)}} style={tempChange ? s.hozButton : {...s.hozButton, opacity: 0.4}}><Text style={s.buttonText}>Save Changes</Text></TouchableOpacity>
                        </View>
                    </View>
                }
            />
            <Footer page="settings" id={id} email={email}/>
        </View>
	);
};
