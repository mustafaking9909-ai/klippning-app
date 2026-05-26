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

export default function BookingScreen() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState("");

  const [bookings, setBookings] = useState<any[]>([]);
  const [slots, setSlots] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // 💈 LOAD BOOKINGS
  const loadBookings = async () => {
    const { data } = await supabase.from("bookings").select("*");
    if (data) setBookings(data);
  };

  // 💈 LOAD LIVE SLOTS (FROM ADMIN)
  const loadSlots = async () => {
    const { data } = await supabase
      .from("available_slots")
      .select("*")
      .eq("is_active", true);

    if (data) setSlots(data);
  };

  useEffect(() => {
    loadBookings();
    loadSlots();
  }, []);

  // ❌ CHECK IF TAKEN
  const isTaken = (day: number | null, time: string) => {
    return bookings.some(
      (b) => b.day == day && b.time === time
    );
  };

  // 💥 BOOK
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

      {/* TIMES (LIVE FROM ADMIN) */}
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
        {slots
          .filter((s) => s.day === String(selectedDay))
          .map((slot) => {
            const taken = isTaken(selectedDay, slot.time);

            return (
              <TouchableOpacity
                key={slot.time}
                disabled={taken}
                onPress={() => setSelectedTime(slot.time)}
                style={{
                  backgroundColor: taken
                    ? "#3a1a1a"
                    : selectedTime === slot.time
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
                      selectedTime === slot.time
                        ? "black"
                        : "white",
                  }}
                >
                  {slot.time}
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