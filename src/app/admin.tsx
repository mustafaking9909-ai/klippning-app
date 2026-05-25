import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, Alert } from "react-native";
import { supabase } from "../lib/supabase";

export default function AdminScreen() {
  const [bookings, setBookings] = useState<any[]>([]);

  // 📦 LOAD BOOKINGS
  const loadBookings = async () => {
    const { data, error } = await supabase
      .from("bookings")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) setBookings(data || []);
  };

  // 🔔 SEND WEB PUSH (NETLIFY FUNCTION)
  const sendPush = async (subscription: any, name: string, time: string) => {
    try {
      await fetch("/.netlify/functions/send-push", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subscription,
          title: "💈 Ny bokning!",
          body: `${name} bokade ${time}`,
        }),
      });
    } catch (err) {
      console.log("PUSH ERROR:", err);
    }
  };

  useEffect(() => {
    loadBookings();

    const channel = supabase
      .channel("bookings-realtime")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "bookings" },
        async (payload) => {
          const newBooking = payload.new;

          // 💈 update UI direkt
          setBookings((prev) => [newBooking, ...prev]);

          // 📲 admin alert
          Alert.alert(
            "Ny bokning 💈",
            `${newBooking.name} - ${newBooking.day} ${newBooking.time}`
          );

          // 🔥 SEND PUSH TO CUSTOMER
          if (newBooking.push_subscription) {
            await sendPush(
              newBooking.push_subscription,
              newBooking.name,
              newBooking.time
            );
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#0A0A0A", padding: 15 }}>
      <Text style={{ color: "gold", fontSize: 26, marginTop: 40 }}>
        Admin 💈
      </Text>

      {bookings.map((b, i) => (
        <View
          key={i}
          style={{
            backgroundColor: "#111",
            padding: 15,
            marginTop: 10,
            borderRadius: 10,
          }}
        >
          <Text style={{ color: "white", fontSize: 16 }}>{b.name}</Text>
          <Text style={{ color: "#999" }}>
            {b.day} - {b.time}
          </Text>
        </View>
      ))}
    </ScrollView>
  );
}