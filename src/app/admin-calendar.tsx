import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Alert } from "react-native";
import { useRouter } from "expo-router";
import { isLoggedIn } from "../utils/auth";

const API = "https://booking-backend-jcxi.onrender.com/bookings";

const days = ["Sön", "Mån", "Tis", "Ons", "Tors", "Fre", "Lör"];

export default function AdminCalendar() {
  const router = useRouter();
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // 🔐 AUTH CHECK (SKYDDAD SIDA)
  useEffect(() => {
    const checkAuth = async () => {
      const ok = await isLoggedIn();

      if (!ok) {
        router.replace("/login");
      } else {
        loadBookings();
      }
    };

    checkAuth();
  }, []);

  // 📦 LOAD BOOKINGS
  const loadBookings = async () => {
    try {
      const res = await fetch(API);
      const data = await res.json();
      setBookings(data);
    } catch {
      Alert.alert("Kunde inte ladda bokningar");
    } finally {
      setLoading(false);
    }
  };

  // 🗑 DELETE BOOKING
  const deleteBooking = async (id: number) => {
    try {
      await fetch(`${API}/${id}`, { method: "DELETE" });
      loadBookings();
    } catch {
      Alert.alert("Kunde inte ta bort bokning");
    }
  };

  // 🔄 MOVE BOOKING (ENKEL VERSION AV DRAG & DROP)
  const moveBooking = async (booking: any, newDay: string) => {
    try {
      await fetch(`${API}/${booking.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ day: newDay }),
      });

      loadBookings();
    } catch {
      Alert.alert("Kunde inte flytta bokning");
    }
  };

  const groupByDay = (day: string) => {
    return bookings.filter((b) => b.day === day);
  };

  return (
    <ScrollView style={{ flex: 1, padding: 20, paddingTop: 60 }}>

      <Text style={{ fontSize: 28, fontWeight: "bold", marginBottom: 20 }}>
        Admin Kalender 💈📅
      </Text>

      {loading ? (
        <Text>Laddar...</Text>
      ) : (
        days.map((day) => (
          <View
            key={day}
            style={{
              marginBottom: 20,
              padding: 15,
              backgroundColor: "#eee",
              borderRadius: 10,
            }}
          >
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
              {day}
            </Text>

            {groupByDay(day).length === 0 ? (
              <Text>Inga bokningar</Text>
            ) : (
              groupByDay(day).map((b) => (
                <View
                  key={b.id}
                  style={{
                    backgroundColor: "white",
                    padding: 10,
                    marginTop: 10,
                    borderRadius: 8,
                  }}
                >
                  <Text style={{ fontWeight: "bold" }}>
                    {b.name}
                  </Text>

                  <Text>{b.time}</Text>
                  <Text style={{ color: "gray" }}>{b.email}</Text>

                  {/* ACTION BUTTONS */}
                  <View style={{ flexDirection: "row", marginTop: 10 }}>

                    {/* DELETE */}
                    <TouchableOpacity
                      onPress={() => deleteBooking(b.id)}
                      style={{
                        backgroundColor: "red",
                        padding: 8,
                        marginRight: 10,
                        borderRadius: 6,
                      }}
                    >
                      <Text style={{ color: "white" }}>
                        Ta bort
                      </Text>
                    </TouchableOpacity>

                    {/* MOVE (ersätter drag & drop i denna version) */}
                    <TouchableOpacity
                      onPress={() => {
                        const nextDay =
                          days[(days.indexOf(day) + 1) % days.length];

                        moveBooking(b, nextDay);
                      }}
                      style={{
                        backgroundColor: "black",
                        padding: 8,
                        borderRadius: 6,
                      }}
                    >
                      <Text style={{ color: "white" }}>
                        Flytta →
                      </Text>
                    </TouchableOpacity>

                  </View>
                </View>
              ))
            )}
          </View>
        ))
      )}

    </ScrollView>
  );
}