import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { supabase } from "../lib/supabase";

export default function AdminScreen() {
  const [bookings, setBookings] = useState<any[]>([]);

  const loadBookings = async () => {
    const { data } = await supabase
      .from("bookings")
      .select("*")
      .order("created_at", { ascending: false });

    if (data) setBookings(data);
  };

  useEffect(() => {
    loadBookings();
  }, []);

  const deleteBooking = async (id: number) => {
    await supabase.from("bookings").delete().eq("id", id);
    loadBookings();
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#0A0A0A" }}>
      
      {/* HEADER */}
      <View style={{ padding: 25, marginTop: 40 }}>
        <Text style={{ color: "gold", fontSize: 28, fontWeight: "900" }}>
          Admin 💈
        </Text>
        <Text style={{ color: "#888", marginTop: 5 }}>
          Alla bokningar i realtid
        </Text>
      </View>

      {/* BOOKINGS */}
      {bookings.map((b) => (
        <View
          key={b.id}
          style={{
            marginHorizontal: 20,
            marginBottom: 15,
            padding: 15,
            backgroundColor: "#111",
            borderRadius: 15,
            borderWidth: 1,
            borderColor: "#222",
          }}
        >
          {/* NAME */}
          <Text style={{ color: "white", fontWeight: "800", fontSize: 16 }}>
            {b.name}
          </Text>

          {/* PHONE */}
          <Text style={{ color: "#aaa", marginTop: 3 }}>
            📞 {b.phone}
          </Text>

          {/* TIME + DAY */}
          <Text style={{ color: "#aaa", marginTop: 3 }}>
            📅 Dag: {b.day} | ⏰ {b.time}
          </Text>

          {/* SERVICE (NYTT) */}
          <Text style={{ color: "gold", marginTop: 3, fontWeight: "700" }}>
            💈 {b.service ? b.service : "Ingen tjänst vald"}
          </Text>

          {/* PRICE */}
          <Text style={{ color: "#0f0", marginTop: 3 }}>
            💰 {b.price} kr
          </Text>

          {/* STATUS */}
          <Text style={{ color: "#777", marginTop: 3 }}>
            Status: {b.status}
          </Text>

          {/* DELETE */}
          <TouchableOpacity
            onPress={() => deleteBooking(b.id)}
            style={{
              marginTop: 10,
              backgroundColor: "#2a0f0f",
              padding: 10,
              borderRadius: 10,
              alignItems: "center",
            }}
          >
            <Text style={{ color: "white", fontWeight: "700" }}>
              Ta bort
            </Text>
          </TouchableOpacity>
        </View>
      ))}

    </ScrollView>
  );
}