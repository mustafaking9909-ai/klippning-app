import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API = "https://booking-backend-jcxi.onrender.com/bookings";

export default function Admin() {
  const router = useRouter();
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // 🔐 CHECK LOGIN
  useEffect(() => {
    const checkAuth = async () => {
      const isAdmin = await AsyncStorage.getItem("admin");

      if (isAdmin !== "true") {
        router.replace("/login");
      } else {
        loadBookings();
      }
    };

    checkAuth();
  }, []);

  // 📦 FETCH BOOKINGS
  const loadBookings = async () => {
    try {
      const res = await fetch(API);
      const data = await res.json();
      setBookings(data.reverse());
    } catch (err) {
      Alert.alert("Kunde inte hämta bokningar");
    } finally {
      setLoading(false);
    }
  };

  // 🗑 DELETE BOOKING
  const deleteBooking = async (id: number) => {
    try {
      await fetch(`${API}/${id}`, {
        method: "DELETE",
      });

      loadBookings();
    } catch (err) {
      Alert.alert("Kunde inte ta bort bokning");
    }
  };

  // 🚪 LOGOUT
  const logout = async () => {
    await AsyncStorage.removeItem("admin");
    router.replace("/login");
  };

  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ padding: 20, paddingTop: 60 }}
    >
      {/* HEADER */}
      <Text style={{ fontSize: 28, fontWeight: "bold", marginBottom: 10 }}>
        Admin Dashboard 💈
      </Text>

      {/* LOGOUT */}
      <TouchableOpacity
        onPress={logout}
        style={{
          backgroundColor: "red",
          padding: 12,
          borderRadius: 8,
          marginBottom: 20,
        }}
      >
        <Text style={{ color: "white", textAlign: "center" }}>
          Logout
        </Text>
      </TouchableOpacity>

      {/* LOADING */}
      {loading ? (
        <Text>Laddar bokningar...</Text>
      ) : bookings.length === 0 ? (
        <Text>Inga bokningar ännu</Text>
      ) : (
        bookings.map((b) => (
          <View
            key={b.id}
            style={{
              backgroundColor: "#eee",
              padding: 15,
              marginBottom: 10,
              borderRadius: 10,
            }}
          >
            <Text style={{ fontWeight: "bold", fontSize: 18 }}>
              {b.name}
            </Text>

            <Text>{b.email}</Text>
            <Text>{b.phone}</Text>
            <Text>Tid: {b.time}</Text>

            {/* DELETE */}
            <TouchableOpacity
              onPress={() => deleteBooking(b.id)}
              style={{
                marginTop: 10,
                backgroundColor: "black",
                padding: 10,
                borderRadius: 6,
              }}
            >
              <Text style={{ color: "white" }}>
                Ta bort bokning
              </Text>
            </TouchableOpacity>
          </View>
        ))
      )}
    </ScrollView>
  );
}