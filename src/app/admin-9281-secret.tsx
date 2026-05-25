import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { supabase } from "../lib/supabase";

const DAYS = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

export default function AdminScreen() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [selectedDay, setSelectedDay] = useState("monday");

  // 📦 LOAD BOOKINGS
  const load = async () => {
    const { data, error } = await supabase
      .from("bookings")
      .select("*");

    if (error) {
      console.log(error.message);
      return;
    }

    setBookings(data || []);
  };

  // 🔴 REALTIME
  useEffect(() => {
    load();

    const channel = supabase
      .channel("admin-bookings")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "bookings",
        },
        () => {
          load();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // ✂️ UPDATE STATUS
  const updateStatus = async (id: number, status: string) => {
    await supabase
      .from("bookings")
      .update({ status })
      .eq("id", id);

    load();
  };

  // 🗑 DELETE
  const deleteBooking = async (id: number) => {
    await supabase
      .from("bookings")
      .delete()
      .eq("id", id);

    load();
  };

  const filtered = bookings.filter(
    (b) => b.date === selectedDay
  );

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: "#0A0A0A",
        padding: 15,
      }}
    >
      {/* HEADER */}
      <Text
        style={{
          color: "gold",
          fontSize: 24,
          marginTop: 40,
          fontWeight: "bold",
        }}
      >
        Admin Dashboard 💈
      </Text>

      {/* STATS */}
      <Text
        style={{
          color: "white",
          marginTop: 15,
          fontSize: 16,
        }}
      >
        Totala bokningar: {bookings.length}
      </Text>

      {/* DAYS */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ marginTop: 20 }}
      >
        {DAYS.map((d) => (
          <TouchableOpacity
            key={d}
            onPress={() => setSelectedDay(d)}
            style={{
              backgroundColor:
                selectedDay === d ? "gold" : "#222",
              padding: 10,
              borderRadius: 10,
              marginRight: 10,
            }}
          >
            <Text>{d}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* BOOKINGS */}
      <Text
        style={{
          color: "white",
          marginTop: 25,
          fontSize: 18,
        }}
      >
        Bokningar ({selectedDay})
      </Text>

      {filtered.map((b) => (
        <View
          key={b.id}
          style={{
            backgroundColor: "#111",
            padding: 15,
            borderRadius: 12,
            marginTop: 12,
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: 16,
              fontWeight: "bold",
            }}
          >
            {b.name}
          </Text>

          <Text style={{ color: "#aaa", marginTop: 5 }}>
            📞 {b.phone}
          </Text>

          <Text style={{ color: "#aaa", marginTop: 5 }}>
            ⏰ {b.time}
          </Text>

          <Text
            style={{
              color: "gold",
              marginTop: 8,
              fontWeight: "bold",
            }}
          >
            {b.status}
          </Text>

          {/* ACTIONS */}
          <View
            style={{
              flexDirection: "row",
              marginTop: 15,
            }}
          >
            <TouchableOpacity
              onPress={() =>
                updateStatus(b.id, "completed")
              }
            >
              <Text
                style={{
                  color: "green",
                  marginRight: 20,
                }}
              >
                Klar
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                updateStatus(b.id, "cancelled")
              }
            >
              <Text
                style={{
                  color: "red",
                  marginRight: 20,
                }}
              >
                Avboka
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                deleteBooking(b.id)
              }
            >
              <Text style={{ color: "gray" }}>
                Ta bort
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}

      <View style={{ height: 100 }} />
    </ScrollView>
  );
}