import { View, Text, TouchableOpacity, TextInput, FlatList } from 'react-native';
import { router, useLocalSearchParams } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { useState, useContext} from "react";
import SettingsList from "../context/setting-list.js";

export default function DebtOverlay() {
    const { email } = useLocalSearchParams();
    const settings = useContext(SettingsList);
    const s = require("../../styles.js");
    const [ page, setPage ] = useState(0);

    const [ tempName, setTempName ] = useState("");
    const [ names, setNames ] = useState([!settings.name || settings.name == "" ? email : settings.name]);

    const [ tempItemName, setTempItemName ] = useState("");
    const [ tempItemPrice, setTempItemPrice ] = useState("");
    const [ useLump, setUseLump ] = useState(true);
    const [ costs, setCosts ] = useState([]);

    const [ split, setSplit ] = useState({});

    // split values taken as strings
    const logNewDebt = () => {
        // verify that it adds up to the sum
        console.log(split)
        router.back()
        // add debt
    }

    const splitEvenly = () => {
        // do the math and reassign split
    }
    
    return (
        page == 0 ?
        <View style={s.mainScreenB}>
            <Text style={s.styleTextEmph}>Have a new debt to log?</Text>
            <Text style={{...s.plainText, color: "rgb(118, 199, 138)", paddingTop: 10}}>Fill out the information below</Text>
            <Text style={{...s.plainText, color: "rgb(118, 199, 138)"}}>to submit a debt request.</Text>
            <View style={{backgroundColor: "rgb(118, 199, 138)", height: 1, width: "60%", margin: 10}}></View>
            <Text style={s.styleTextEmph}>People Involved</Text>
            <View style={{width: "70%", height: 120, backgroundColor: "white", margin: 10, borderWidth: 1, borderColor: "rgb(118, 199, 138)"}}>
                <FlatList
                    contentContainerStyle={{padding: 10}}
                    data={names}
                    renderItem={({item, index}) =>
                        <View style={{...s.hbox, justifyContent: "space-between", alignItems: "center"}}>
                            <Text>{item}</Text>
                            {index > 0 ? <TouchableOpacity onPress={() => {var newNames = names; newNames.splice(index, 1); setNames(newNames);}}><Feather name="x"/></TouchableOpacity> : <></>}
                        </View>
                    }
                />
            </View>
            
            <TextInput style={s.textInput} placeholder="name" placeholderTextColor={"lightgray"} value={tempName} onChangeText={(newText) => {setTempName(newText)}}></TextInput>
            <TouchableOpacity style={s.hozButton} onPress={() => {setNames([...names, tempName]); setTempName("")}}><Text style={s.buttonText}>Add Person</Text></TouchableOpacity>
            <TouchableOpacity style={s.hozButton} onPress={() => {setPage(page+1); let tempSplit = {}; console.log(names); for(let i = 0; i < names.length; i++) {tempSplit[names[i]] = 0}; setSplit(tempSplit)}}><Text style={s.buttonText}>Next</Text></TouchableOpacity>
        </View> :
        page == 1 ?
        <View style={s.mainScreenB}>
            <Text style={s.styleTextEmph}>How much is the debt?</Text>
            <Text style={{...s.plainText, color: "rgb(118, 199, 138)", paddingTop: 10}}>You can either provide a lump sum or add a</Text>
            <Text style={{...s.plainText, color: "rgb(118, 199, 138)"}}>list of items, which can be split among you.</Text>
            <View style={s.hbox}>
                <TouchableOpacity onPress={() => {setUseLump(true)}} style={{flexDirection: "row", alignItems: "center"}}>
                    <Feather style={{...s.plainText, color: "rgb(118, 199, 138)"}} name={useLump ? "check-circle" : "circle"}/>
                    <Text style={{...s.plainText, color: "rgb(118, 199, 138)", padding: 8}}>Lump Sum</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {setUseLump(false)}} style={{flexDirection: "row", alignItems: "center"}}>
                    <Feather style={{...s.plainText, color: "rgb(118, 199, 138)"}} name={useLump ? "circle" : "check-circle"}/>
                    <Text style={{...s.plainText, color: "rgb(118, 199, 138)", padding: 8}}>Item List</Text>
                </TouchableOpacity>
            </View>
            <View style={{backgroundColor: "rgb(118, 199, 138)", height: 1, width: "60%", margin: 10}}></View>
            <Text style={s.styleTextEmph}>{useLump ? "Lump Sum" : "Items Purchased"}</Text>
            {useLump ?
            <View>
                <TextInput style={s.textInput} inputMode={"decimal"} placeholder="sum" placeholderTextColor={"lightGray"}></TextInput>
            </View> :
            <View style={{width: "100%", alignItems: "center"}}>
                <View style={{width: "70%", height: 120, backgroundColor: "white", margin: 10, borderWidth: 1, borderColor: "rgb(118, 199, 138)"}}>
                    <FlatList
                        contentContainerStyle={{padding: 10}}
                        data={costs}
                        renderItem={({item, index}) =>
                            <View style={{...s.hbox, justifyContent: "space-between", alignItems: "center"}}>
                                <Text>{item}</Text>
                                <TouchableOpacity onPress={() => {var newNames = names; newNames.splice(index, 1); setNames(newNames);}}><Feather name="x"/></TouchableOpacity>
                            </View>
                        }
                    />
                </View>
                <TextInput style={s.textInput} placeholder="name" placeholderTextColor={"lightgray"} value={tempItemName} onChangeText={(newText) => {setTempItemName(newText)}}></TextInput>
                <TextInput style={s.textInput} placeholder="price" placeholderTextColor={"lightgray"} inputMode={"decimal"} value={tempItemPrice} onChangeText={(newText) => {setTempItemPrice(newText)}}></TextInput>
                <TouchableOpacity style={s.hozButton} onPress={() => {setNames([...names, tempName]); setTempName("")}}><Text style={s.buttonText}>Add Item</Text></TouchableOpacity>
            </View>}
            <View style={{backgroundColor: "rgb(118, 199, 138)", height: 1, width: "60%", margin: 10}}></View>
            <TouchableOpacity style={s.hozButton} onPress={() => {setPage(page+1); console.log(split)}}><Text style={s.buttonText}>Next</Text></TouchableOpacity>
            <TouchableOpacity style={s.hozButton} onPress={() => {setPage(page-1)}}><Text style={s.buttonText}>Back</Text></TouchableOpacity>
        </View> :
        page == 2 ?
        <View style={s.mainScreenB}>
            <Text style={s.styleTextEmph}>How is it split?</Text>
            <Text style={{...s.plainText, color: "rgb(118, 199, 138)", paddingTop: 10}}>Did everyone share evenly?</Text>
            <Text style={{...s.plainText, color: "rgb(118, 199, 138)"}}>Put the split below.</Text>
            <View style={s.hbox}>
                <TouchableOpacity style={s.hozButton} onPress={() => {splitEvenly()}}><Text style={s.buttonText}>Split Evenly</Text></TouchableOpacity>
            </View>
            <View style={{backgroundColor: "rgb(118, 199, 138)", height: 1, width: "60%", margin: 10}}></View>
            <Text style={s.styleTextEmph}>Cost Split</Text>
            <View style={{width: "70%", height: 240, margin: 10, borderBottomWidth: 1, borderTopWidth: 1, borderColor: "rgb(118, 199, 138)"}}>
                <FlatList
                    contentContainerStyle={{padding: 10}}
                    data={Object.keys(split)}
                    renderItem={({item, index}) =>
                        <View style={{...s.hbox, justifyContent: "space-between", alignItems: "center"}}>
                            <Text>{item}</Text>
                            <TextInput style={s.textInput} inputMode={"decimal"} value={split[item]} onChangeText={(newText) => {setSplit({...split, [item]: newText})}}></TextInput>
                        </View>
                    }
                />
            </View>
            <TouchableOpacity style={s.hozButton} onPress={() => {logNewDebt()}}><Text style={s.buttonText}>Next</Text></TouchableOpacity>
            <TouchableOpacity style={s.hozButton} onPress={() => {setPage(page-1)}}><Text style={s.buttonText}>Back</Text></TouchableOpacity>
        </View> :
        <View/> 
    );
}
