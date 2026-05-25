import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";

import { supabase } from "../lib/supabase";
import LuxuryCalendar from "../components/LuxuryCalendar";

const TIMES = [
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "17:00",
  "17:30",
  "18:00",
  "18:30",
  "19:00",
  "20:00",
  "20:30",
  "21:00",
  "21:30",
  "22:00",
];

export default function BookingScreen() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState("");

  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const loadBookings = async () => {
    const { data } = await supabase.from("bookings").select("*");
    if (data) setBookings(data);
  };

  useEffect(() => {
    loadBookings();
  }, []);

  const isTaken = (day: number | null, time: string) => {
    return bookings.some(
      (b) => b.day == day && b.time === time
    );
  };

  const handleBooking = async () => {
    if (!name || !phone || !selectedDay || !selectedTime) {
      Alert.alert("Fyll i alla fält");
      return;
    }

    setLoading(true);

    const { error } = await supabase.from("bookings").insert([
      {
        name,
        phone,
        day: String(selectedDay),
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

      {/* CALENDAR */}
      <LuxuryCalendar
        selectedDay={selectedDay}
        onSelectDay={setSelectedDay}
      />

      {/* TIMES */}
      <Text style={{ color: "white", marginLeft: 20 }}>
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
                    selectedTime === t && !taken
                      ? "black"
                      : "white",
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