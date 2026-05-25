import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";

import { supabase } from "../lib/supabase";

const DAYS = [
  { key: "monday", label: "Måndag" },
  { key: "tuesday", label: "Tisdag" },
  { key: "wednesday", label: "Onsdag" },
  { key: "thursday", label: "Torsdag" },
  { key: "friday", label: "Fredag" },
  { key: "saturday", label: "Lördag" },
  { key: "sunday", label: "Söndag" },
];

const TIMES = [
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
];

export default function BookingScreen() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const [selectedDay, setSelectedDay] = useState("monday");
  const [selectedTime, setSelectedTime] = useState("");

  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // 💈 LOAD BOOKINGS
  const loadBookings = async () => {
    const { data } = await supabase.from("bookings").select("*");
    if (data) setBookings(data);
  };

  useEffect(() => {
    loadBookings();
  }, []);

  // ❌ CHECK IF BOOKED
  const isTaken = (day: string, time: string) => {
    return bookings.some((b) => b.day === day && b.time === time);
  };

  // 💥 BOOK
  const handleBooking = async () => {
    if (!name || !phone || !selectedTime) {
      Alert.alert("Fyll i alla fält");
      return;
    }

    setLoading(true);

    const { error } = await supabase.from("bookings").insert([
      {
        name,
        phone,
        day: selectedDay,
        time: selectedTime,
        status: "confirmed",
        price: 150,
        created_at: new Date().toISOString(),
      },
    ]);

    if (error) {
      Alert.alert("Error", error.message);
      setLoading(false);
      return;
    }

    Alert.alert("💈 Bokad!");

    setName("");
    setPhone("");
    setSelectedTime("");

    loadBookings();
    setLoading(false);
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#0A0A0A" }}>
      
      {/* HEADER */}
      <Text
        style={{
          color: "gold",
          fontSize: 32,
          fontWeight: "800",
          marginTop: 50,
          marginLeft: 20,
        }}
      >
        Boka tid 💈
      </Text>

      {/* DAYS */}
      <Text style={{ color: "white", marginLeft: 20, marginTop: 20 }}>
        Välj dag
      </Text>

      <ScrollView horizontal style={{ paddingLeft: 20 }}>
        {DAYS.map((d) => (
          <TouchableOpacity
            key={d.key}
            onPress={() => setSelectedDay(d.key)}
            style={{
              backgroundColor:
                selectedDay === d.key ? "gold" : "#1A1A1A",
              padding: 12,
              borderRadius: 12,
              marginRight: 10,
              marginTop: 10,
            }}
          >
            <Text
              style={{
                color: selectedDay === d.key ? "black" : "white",
                fontWeight: "600",
              }}
            >
              {d.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* TIMES */}
      <Text style={{ color: "white", marginLeft: 20, marginTop: 25 }}>
        Välj tid
      </Text>

      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          paddingLeft: 20,
          marginTop: 10,
        }}
      >
        {TIMES.map((t) => {
          const taken = isTaken(selectedDay, t);

          return (
            <TouchableOpacity
              key={t}
              disabled={taken}
              onPress={() => setSelectedTime(t)}
              style={{
                backgroundColor: taken
                  ? "#3a1a1a"
                  : selectedTime === t
                  ? "gold"
                  : "#1A1A1A",
                padding: 12,
                borderRadius: 12,
                marginRight: 10,
                marginBottom: 10,
                opacity: taken ? 0.4 : 1,
              }}
            >
              <Text
                style={{
                  color:
                    selectedTime === t && !taken ? "black" : "white",
                }}
              >
                {t}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* INPUTS */}
      <View style={{ padding: 20 }}>
        <TextInput
          placeholder="Namn"
          placeholderTextColor="#777"
          value={name}
          onChangeText={setName}
          style={{
            backgroundColor: "#111",
            color: "white",
            padding: 15,
            borderRadius: 12,
            marginBottom: 10,
          }}
        />

        <TextInput
          placeholder="Telefon"
          placeholderTextColor="#777"
          value={phone}
          onChangeText={setPhone}
          style={{
            backgroundColor: "#111",
            color: "white",
            padding: 15,
            borderRadius: 12,
          }}
        />

        {/* BUTTON */}
        <TouchableOpacity
          onPress={handleBooking}
          disabled={loading}
          style={{
            backgroundColor: "gold",
            padding: 18,
            borderRadius: 14,
            marginTop: 20,
            alignItems: "center",
          }}
        >
          {loading ? (
            <ActivityIndicator color="black" />
          ) : (
            <Text
              style={{
                color: "black",
                fontWeight: "800",
                fontSize: 16,
              }}
            >
              Bekräfta bokning
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}