import React, { useEffect, useState } from "react";
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
  "13:00","13:30","14:00","14:30","15:00","15:30",
  "16:00","17:00","17:30","18:00","18:30",
  "19:00","20:00","20:30","21:00","21:30","22:00"
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
    return bookings.some((b) => b.day == day && b.time === time);
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
    <ScrollView style={{ flex: 1, backgroundColor: "#070707" }}>

      {/* HEADER */}
      <View style={{ padding: 25, marginTop: 30 }}>
        <Text style={{ color: "gold", fontSize: 34, fontWeight: "900" }}>
          Boka tid 💈
        </Text>
        <Text style={{ color: "#999", marginTop: 5 }}>
          Välj datum & tid för din klippning
        </Text>
      </View>

      {/* CALENDAR CARD */}
      <View
        style={{
          marginHorizontal: 20,
          borderRadius: 20,
          backgroundColor: "#111",
          padding: 10,
          shadowColor: "#000",
          shadowOpacity: 0.4,
          shadowRadius: 10,
        }}
      >
        <LuxuryCalendar
          selectedDay={selectedDay}
          onSelectDay={setSelectedDay}
        />
      </View>

      {/* TIME TITLE */}
      <Text
        style={{
          color: "white",
          marginLeft: 20,
          marginTop: 20,
          fontSize: 16,
          fontWeight: "600",
        }}
      >
        Tillgängliga tider
      </Text>

      {/* TIMES */}
      <View style={{ flexDirection: "row", flexWrap: "wrap", padding: 15 }}>
        {TIMES.map((t) => {
          const taken = isTaken(selectedDay, t);

          return (
            <TouchableOpacity
              key={t}
              disabled={taken}
              onPress={() => setSelectedTime(t)}
              style={{
                backgroundColor: taken
                  ? "#2a0f0f"
                  : selectedTime === t
                  ? "gold"
                  : "#151515",
                paddingVertical: 12,
                paddingHorizontal: 14,
                borderRadius: 14,
                margin: 6,
                shadowColor: "#000",
                shadowOpacity: selectedTime === t ? 0.4 : 0,
                shadowRadius: 10,
              }}
            >
              <Text
                style={{
                  color:
                    selectedTime === t && !taken ? "black" : "#fff",
                  fontWeight: "600",
                }}
              >
                {t}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* FORM CARD */}
      <View
        style={{
          margin: 20,
          padding: 20,
          backgroundColor: "#111",
          borderRadius: 20,
        }}
      >
        <Text style={{ color: "white", marginBottom: 10 }}>
          Dina uppgifter
        </Text>

        <TextInput
          placeholder="Namn"
          placeholderTextColor="#777"
          value={name}
          onChangeText={setName}
          style={{
            backgroundColor: "#1A1A1A",
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
            backgroundColor: "#1A1A1A",
            color: "white",
            padding: 15,
            borderRadius: 12,
          }}
        />

        {/* LUXURY BUTTON */}
        <TouchableOpacity
          onPress={handleBooking}
          disabled={loading}
          style={{
            marginTop: 20,
            padding: 16,
            borderRadius: 16,
            backgroundColor: "gold",
            shadowColor: "gold",
            shadowOpacity: 0.5,
            shadowRadius: 15,
            alignItems: "center",
          }}
        >
          {loading ? (
            <ActivityIndicator color="black" />
          ) : (
            <Text
              style={{
                color: "black",
                fontWeight: "900",
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