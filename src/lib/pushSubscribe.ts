import { supabase } from "./supabase";

export async function subscribeUser(publicKey: string) {
  if (!("serviceWorker" in navigator)) return;

  const permission = await Notification.requestPermission();
  if (permission !== "granted") return;

  const reg = await navigator.serviceWorker.register("/sw.js");
  await navigator.serviceWorker.ready;

  const sub = await reg.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(publicKey),
  });

  await supabase.from("push_subscriptions").insert([
    {
      subscription: JSON.stringify(sub),
    },
  ]);

  return sub;
}

function urlBase64ToUint8Array(base64: string) {
  const padding = "=".repeat((4 - (base64.length % 4)) % 4);
  const base64Clean = (base64 + padding).replace(/-/g, "+").replace(/_/g, "/");

  const raw = atob(base64Clean);
  return new Uint8Array([...raw].map((c) => c.charCodeAt(0)));
}