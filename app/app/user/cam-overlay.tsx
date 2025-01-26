import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { View, Text, TouchableOpacity } from 'react-native';
import { Feather } from "@expo/vector-icons";
import { useRef, useState } from "react";

export default function CameraOverlay() {
    const s = require("../../styles.js");
    const [camera, setCamera] = useState(useRef(null));
    const [facing, setFacing] = useState<CameraType>('back');
    const [permission, requestPermission] = useCameraPermissions();
    const [camReady, setCamReady] = useState(false);
    const [torch, setTorch] = useState(false);

    const toggleCameraFacing = () => {
        setFacing(facing == "front" ? "back" : "front");
    }

    const takePhoto = () => {
        if(camReady) {
            //camera.takePictureAsync({ onPictureSaved : {}, base64: true, exif: false });
        }
    }

    if(!permission) {
        return <View/>;
    }

    if (!permission.granted) {
        return (
            <View style={s.mainScreenA}>
                <Text style={s.styleTextEmph}>We need your permission to show the camera:</Text>
                <TouchableOpacity style={s.hozButton} onPress={() => {requestPermission()}}><Text style={s.buttonText}>Grant Permission</Text></TouchableOpacity>
            </View>
        );
    }

    else {
        return (
            <View style={s.mainScreenA}>
                <CameraView
                    onCameraReady={() => {setCamReady(true)}}
                    enableTorch={torch}
                    style={{flex: 1, justifyContent: "flex-end", flexDirection: "column"}}
                    facing={facing}>
                    <View style={{justifyContent: "space-around", paddingBottom: 20, height: 100, backgroundColor: "transparent", flexDirection: "row", paddingHorizontal: 30}}>
                        <TouchableOpacity style={{backgroundColor: "rgb(118, 199, 138)", borderRadius: 100, width: 60, height: 60, alignItems: "center", justifyContent: "center"}} onPress={toggleCameraFacing}>
                            <Feather style={{...s.icon, padding: 0, paddingBottom: 14, color: "#e3ffc8"}} name="refresh-cw"/>
                        </TouchableOpacity>
                        <TouchableOpacity style={{backgroundColor: "rgb(118, 199, 138)", borderRadius: 100, width: 60, height: 60, alignItems: "center", justifyContent: "center"}} onPress={takePhoto}>
                            <Feather style={{...s.icon, padding: 0, paddingBottom: 14, color: "#e3ffc8"}} name="camera"/>
                        </TouchableOpacity>
                        <TouchableOpacity style={{backgroundColor: "rgb(118, 199, 138)", borderRadius: 100, width: 60, height: 60, alignItems: "center", justifyContent: "center"}} onPress={() => {setTorch(!torch)}}>
                            <Feather style={{...s.icon, padding: 0, paddingBottom: 14, color: "#e3ffc8"}} name="sun"/>
                        </TouchableOpacity>
                    </View>
                </CameraView>
            </View>
        );
    }
}
