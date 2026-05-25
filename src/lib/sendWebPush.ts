export async function sendWebPush(subscription: any, payload: any, vapidKeys: any) {
  const webpush = await import("web-push");

  webpush.setVapidDetails(
    "mailto:test@test.com",
    vapidKeys.publicKey,
    vapidKeys.privateKey
  );

  return webpush.sendNotification(subscription, JSON.stringify(payload));
}