import { Stack } from "expo-router";
import { SettingList } from "./context/setting-list";

export default function RootLayout() {
  return (
    <SettingList>
      <Stack screenOptions={{headerShown: false, animation: "none"}}>
        <Stack.Screen name="user/cam-overlay" options={{presentation: "modal", animation: "default"}}/>
      </Stack>
    </SettingList>
    );
}
