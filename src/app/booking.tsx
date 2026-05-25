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

import { useLocalSearchParams } from "expo-router";
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

const TIMES = ["10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00"];

export default function BookingScreen() {
  const params = useLocalSearchParams();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedDay, setSelectedDay] = useState("monday");
  const [selectedTime, setSelectedTime] = useState("");
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const service = String(params?.service || "Herrklippning");
  const beard = params?.beard === "1";
  const price = Number(params?.price || 150);

  const loadBookings = async () => {
    const { data } = await supabase.from("bookings").select("*");
    if (data) setBookings(data);
  };

  useEffect(() => {
    loadBookings();
  }, []);

  const isTaken = (day: string, time: string) =>
    bookings.some((b) => b.day === day && b.time === time);

  // 💥 DEBUG + FIXED BOOKING
  const handleBooking = async () => {
    try {
      console.log("🔥 BOOK CLICKED");

      if (!name || !phone || !selectedTime) {
        console.log("❌ MISSING FIELDS", {
          name,
          phone,
          selectedTime,
        });

        Alert.alert("Fyll i alla fält");
        return;
      }

      console.log("🚀 BEFORE INSERT");

      setLoading(true);

      const bookingData = {
        name,
        phone,
        day: selectedDay,
        time: selectedTime,
        service,
        beard,
        price,
        status: "confirmed",
        created_at: new Date().toISOString(),
      };

      console.log("📦 DATA:", bookingData);

      const { data, error } = await supabase
        .from("bookings")
        .insert([bookingData])
        .select();

      console.log("📡 SUPABASE RESPONSE:", { data, error });

      if (error) {
        Alert.alert("ERROR", JSON.stringify(error));
        setLoading(false);
        return;
      }

      console.log("✅ SUCCESS");

      Alert.alert("💈 Bokning klar!");

      setName("");
      setPhone("");
      setSelectedTime("");

      loadBookings();
      setLoading(false);
    } catch (err) {
      console.log("💥 CRASH:", err);
      Alert.alert("CRASH", JSON.stringify(err));
      setLoading(false);
    }
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#0A0A0A", padding: 20 }}>
      <Text style={{ color: "gold", fontSize: 28, marginTop: 40 }}>
        Boka tid 💈
      </Text>

      <Text style={{ color: "white", marginTop: 20 }}>Namn</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        style={{ backgroundColor: "#111", color: "white", padding: 12 }}
      />

      <Text style={{ color: "white", marginTop: 10 }}>Telefon</Text>
      <TextInput
        value={phone}
        onChangeText={setPhone}
        style={{ backgroundColor: "#111", color: "white", padding: 12 }}
      />

      <Text style={{ color: "white", marginTop: 20 }}>Välj tid</Text>

      <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
        {TIMES.map((t) => (
          <TouchableOpacity
            key={t}
            onPress={() => setSelectedTime(t)}
            style={{
              backgroundColor:
                selectedTime === t ? "gold" : "#222",
              padding: 10,
              margin: 5,
            }}
          >
            <Text style={{ color: "white" }}>{t}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        onPress={handleBooking}
        disabled={loading}
        style={{
          backgroundColor: "gold",
          padding: 15,
          marginTop: 20,
        }}
      >
        {loading ? (
          <ActivityIndicator color="black" />
        ) : (
          <Text style={{ color: "black", fontWeight: "bold" }}>
            Boka
          </Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
}