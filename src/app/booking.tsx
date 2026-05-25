import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
} from "react-native";

import { supabase } from "../lib/supabase";
import { useLocalSearchParams } from "expo-router";

const DAYS = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

const TIMES = ["10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00"];

export default function BookingScreen() {
  const params = useLocalSearchParams();

  const [selectedDay, setSelectedDay] = useState("monday");
  const [selectedTime, setSelectedTime] = useState("");

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const [bookings, setBookings] = useState<any[]>([]);

  // 💈 DATA FROM HOME SCREEN
  const service = params?.service || "haircut";
  const beard = params?.beard === "1";
  const price = params?.price || "150";

  // 📦 LOAD BOOKINGS
  const loadBookings = async () => {
    const { data, error } = await supabase.from("bookings").select("*");

    if (error) {
      console.log("LOAD ERROR:", error);
      return;
    }

    setBookings(data || []);
  };

  useEffect(() => {
    loadBookings();
  }, []);

  // ❌ CHECK IF TIME IS TAKEN
  const isTaken = (day: string, time: string) => {
    return bookings.some((b) => b.day === day && b.time === time);
  };

  // 💥 BOOKING FUNCTION
  const handleBook = async () => {
    if (!name || !phone || !selectedTime) {
      Alert.alert("Fyll i alla fält");
      return;
    }

    if (isTaken(selectedDay, selectedTime)) {
      Alert.alert("Den tiden är redan bokad");
      return;
    }

    const insertData = {
      name,
      phone,
      day: selectedDay,
      time: selectedTime,
      service,
      beard,
      price: Number(price),
      status: "confirmed",
      created_at: new Date().toISOString(),
    };

    console.log("SENDING:", insertData);

    const { data, error } = await supabase
      .from("bookings")
      .insert([insertData])
      .select();

    console.log("SUPABASE RESPONSE:", { data, error });

    if (error) {
      Alert.alert("Error", error.message);
      return;
    }

    Alert.alert("💈 Bokning bekräftad!");

    setName("");
    setPhone("");
    setSelectedTime("");

    loadBookings();
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#0A0A0A", padding: 15 }}>
      
      {/* HEADER */}
      <Text style={{ color: "gold", fontSize: 24, marginTop: 40 }}>
        Boka tid 💈
      </Text>

      {/* SERVICE INFO */}
      <View style={{ marginTop: 10 }}>
        <Text style={{ color: "white" }}>Tjänst: {service}</Text>
        <Text style={{ color: "white" }}>
          Skägg: {beard ? "Ja (+50kr)" : "Nej"}
        </Text>
        <Text style={{ color: "gold" }}>Pris: {price} kr</Text>
      </View>

      {/* DAYS */}
      <ScrollView horizontal style={{ marginTop: 20 }}>
        {DAYS.map((day) => (
          <TouchableOpacity
            key={day}
            onPress={() => setSelectedDay(day)}
            style={{
              padding: 10,
              marginRight: 10,
              backgroundColor: selectedDay === day ? "gold" : "#222",
              borderRadius: 10,
            }}
          >
            <Text style={{ color: "white" }}>{day}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* TIMES */}
      <View style={{ flexDirection: "row", flexWrap: "wrap", marginTop: 20 }}>
        {TIMES.map((time) => {
          const taken = isTaken(selectedDay, time);

          return (
            <TouchableOpacity
              key={time}
              disabled={taken}
              onPress={() => setSelectedTime(time)}
              style={{
                padding: 12,
                margin: 5,
                borderRadius: 10,
                backgroundColor: taken
                  ? "#400"
                  : selectedTime === time
                  ? "gold"
                  : "#222",
              }}
            >
              <Text style={{ color: "white" }}>{time}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* INPUTS */}
      <TextInput
        placeholder="Namn"
        placeholderTextColor="#777"
        value={name}
        onChangeText={setName}
        style={{
          backgroundColor: "#111",
          color: "white",
          padding: 12,
          borderRadius: 10,
          marginTop: 25,
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
          padding: 12,
          borderRadius: 10,
          marginTop: 15,
        }}
      />

      {/* BOOK BUTTON */}
      <TouchableOpacity
        onPress={handleBook}
        style={{
          backgroundColor: "gold",
          padding: 15,
          borderRadius: 10,
          marginTop: 25,
        }}
      >
        <Text style={{ textAlign: "center", fontWeight: "bold" }}>
          Boka nu
        </Text>
      </TouchableOpacity>

      <View style={{ height: 100 }} />
    </ScrollView>
  );
}