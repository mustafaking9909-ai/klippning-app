import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";

const API = "https://booking-backend-jcxi.onrender.com/bookings";
const ADMIN_PASSWORD = "1234"; // ändra senare

export default function Admin() {
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [bookings, setBookings] = useState<any[]>([]);

  const login = () => {
    if (password === ADMIN_PASSWORD) {
      setLoggedIn(true);
      loadBookings();
    } else {
      Alert.alert("Fel lösenord");
    }
  };

  const loadBookings = async () => {
    try {
      const res = await fetch(API);
      const data = await res.json();
      setBookings(data.reverse());
    } catch (err) {
      Alert.alert("Kunde inte hämta bokningar");
    }
  };

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

  // LOGIN SCREEN
  if (!loggedIn) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          padding: 20,
        }}
      >
        <Text style={{ fontSize: 26, marginBottom: 20 }}>
          Admin Login 🔐
        </Text>

        <TextInput
          placeholder="Lösenord"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          style={{
            borderWidth: 1,
            padding: 12,
            marginBottom: 20,
          }}
        />

        <TouchableOpacity
          onPress={login}
          style={{
            backgroundColor: "black",
            padding: 15,
            borderRadius: 8,
          }}
        >
          <Text style={{ color: "white", textAlign: "center" }}>
            Logga in
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  // ADMIN DASHBOARD
  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ padding: 20, paddingTop: 60 }}
    >
      <Text style={{ fontSize: 28, fontWeight: "bold", marginBottom: 20 }}>
        Admin Dashboard 💈
      </Text>

      {bookings.length === 0 ? (
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
            <Text>{b.time}</Text>

            <TouchableOpacity
              onPress={() => deleteBooking(b.id)}
              style={{
                marginTop: 10,
                backgroundColor: "black",
                padding: 10,
                borderRadius: 6,
              }}
            >
              <Text style={{ color: "white" }}>Ta bort</Text>
            </TouchableOpacity>
          </View>
        ))
      )}
    </ScrollView>
  );
}