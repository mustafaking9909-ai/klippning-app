export async function askNotificationPermission() {
  if (!("Notification" in window)) return;

  const permission = await Notification.requestPermission();

  return permission === "granted";
}