import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Alert } from "react-native";

const API = "https://booking-backend-jcxi.onrender.com/bookings";

export default function Admin() {
  const [bookings, setBookings] = useState([]);

  const fetchBookings = async () => {
    try {
      const res = await fetch(API);
      const data = await res.json();
      setBookings(data.reverse());
    } catch (err) {
      Alert.alert("Fel vid hämtning");
    }
  };

  const deleteBooking = async (id: number) => {
    try {
      await fetch(`${API}/${id}`, { method: "DELETE" });
      fetchBookings();
    } catch (err) {
      Alert.alert("Kunde inte ta bort");
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <ScrollView style={{ flex: 1, padding: 20, paddingTop: 60 }}>
      
      <Text style={{ fontSize: 28, fontWeight: "bold", marginBottom: 20 }}>
        Admin Dashboard 💈
      </Text>

      {bookings.length === 0 ? (
        <Text>Inga bokningar</Text>
      ) : (
        bookings.map((b: any) => (
          <View
            key={b.id}
            style={{
              padding: 15,
              backgroundColor: "#eee",
              marginBottom: 10,
              borderRadius: 10,
            }}
          >
            <Text style={{ fontWeight: "bold" }}>{b.name}</Text>
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