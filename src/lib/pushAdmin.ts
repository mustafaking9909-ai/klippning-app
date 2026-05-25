import * as Notifications from "expo-notifications";

/**
 * 💈 SEND PUSH NOTIFICATION TO CUSTOMER
 * (Expo Push API)
 */
export async function sendPushNotification(
  token: string,
  title: string,
  body: string
) {
  try {
    const message = {
      to: token,
      sound: "default",
      title,
      body,
      data: { type: "booking" },
    };

    const response = await fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Accept-Encoding": "gzip, deflate",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    });

    const result = await response.json();

    console.log("PUSH SENT:", result);

    return result;
  } catch (error) {
    console.log("PUSH ERROR:", error);
  }
}