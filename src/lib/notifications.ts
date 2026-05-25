import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

export async function registerForPush() {
  const { status } = await Notifications.requestPermissionsAsync();

  if (status !== "granted") {
    alert("Push notifications avstängda");
    return;
  }

  const token = (await Notifications.getExpoPushTokenAsync()).data;
  console.log("Push token:", token);

  return token;
}