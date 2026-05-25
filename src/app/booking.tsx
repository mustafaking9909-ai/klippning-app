console.log("🔥 BOOK BUTTON CLICKED");
alert("CLICKED");
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
  const params = useLocalSearchParams();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const [selectedDay, setSelectedDay] = useState("monday");
  const [selectedTime, setSelectedTime] = useState("");

  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // 💈 SERVICE INFO
  const service = String(params?.service || "Herrklippning");
  const beard = params?.beard === "1";
  const price = Number(params?.price || 150);

  // 📦 LOAD BOOKINGS
  const loadBookings = async () => {
    console.log("LOADING BOOKINGS...");

    const { data, error } = await supabase
      .from("bookings")
      .select("*");

    console.log("BOOKINGS RESPONSE:", data);
    console.log("BOOKINGS ERROR:", error);

    if (!error && data) {
      setBookings(data);
    }
  };

  useEffect(() => {
    loadBookings();
  }, []);

  // ❌ TAKEN CHECK
  const isTaken = (day: string, time: string) => {
    return bookings.some(
      (b) => b.day === day && b.time === time
    );
  };

  // 💥 BOOK FUNCTION
  const handleBooking = async () => {
    try {
      if (!name || !phone || !selectedTime) {
        Alert.alert("Fyll i alla fält");
        return;
      }

      if (isTaken(selectedDay, selectedTime)) {
        Alert.alert("Tiden är redan bokad");
        return;
      }

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

      console.log("SENDING BOOKING:", bookingData);

      const { data, error } = await supabase
        .from("bookings")
        .insert([bookingData])
        .select();

      console.log("INSERT DATA:", data);
      console.log("INSERT ERROR:", error);

      if (error) {
        Alert.alert(
          "Booking Error",
          JSON.stringify(error, null, 2)
        );

        setLoading(false);
        return;
      }

      Alert.alert("💈 Bokning bekräftad!");

      // RESET
      setName("");
      setPhone("");
      setSelectedTime("");

      await loadBookings();

      setLoading(false);
    } catch (err: any) {
      console.log("CRASH ERROR:", err);

      Alert.alert(
        "CRASH ERROR",
        JSON.stringify(err, null, 2)
      );

      setLoading(false);
    }
  };

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: "#0A0A0A",
      }}
      contentContainerStyle={{
        padding: 20,
        paddingBottom: 100,
      }}
    >
      {/* HEADER */}
      <Text
        style={{
          color: "gold",
          fontSize: 30,
          fontWeight: "bold",
          marginTop: 40,
        }}
      >
        Boka tid 💈
      </Text>

      {/* SERVICE CARD */}
      <View
        style={{
          backgroundColor: "#111",
          padding: 18,
          borderRadius: 18,
          marginTop: 20,
          borderWidth: 1,
          borderColor: "#222",
        }}
      >
        <Text
          style={{
            color: "white",
            fontSize: 18,
            fontWeight: "600",
          }}
        >
          {service}
        </Text>

        <Text
          style={{
            color: "#aaa",
            marginTop: 6,
          }}
        >
          Skägg: {beard ? "Ja (+50kr)" : "Nej"}
        </Text>

        <Text
          style={{
            color: "gold",
            marginTop: 8,
            fontSize: 18,
            fontWeight: "bold",
          }}
        >
          {price} kr
        </Text>
      </View>

      {/* DAYS */}
      <Text
        style={{
          color: "white",
          marginTop: 30,
          marginBottom: 10,
          fontSize: 18,
          fontWeight: "600",
        }}
      >
        Välj dag
      </Text>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {DAYS.map((day) => (
          <TouchableOpacity
            key={day.key}
            onPress={() => setSelectedDay(day.key)}
            style={{
              backgroundColor:
                selectedDay === day.key ? "gold" : "#1A1A1A",
              paddingVertical: 12,
              paddingHorizontal: 18,
              borderRadius: 12,
              marginRight: 10,
            }}
          >
            <Text
              style={{
                color:
                  selectedDay === day.key ? "black" : "white",
                fontWeight: "600",
              }}
            >
              {day.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* TIMES */}
      <Text
        style={{
          color: "white",
          marginTop: 30,
          marginBottom: 10,
          fontSize: 18,
          fontWeight: "600",
        }}
      >
        Välj tid
      </Text>

      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
        }}
      >
        {TIMES.map((time) => {
          const taken = isTaken(selectedDay, time);

          return (
            <TouchableOpacity
              key={time}
              disabled={taken}
              onPress={() => setSelectedTime(time)}
              style={{
                backgroundColor: taken
                  ? "#441111"
                  : selectedTime === time
                  ? "gold"
                  : "#1A1A1A",
                paddingVertical: 12,
                paddingHorizontal: 18,
                borderRadius: 12,
                marginRight: 10,
                marginBottom: 10,
              }}
            >
              <Text
                style={{
                  color:
                    selectedTime === time && !taken
                      ? "black"
                      : "white",
                  fontWeight: "600",
                }}
              >
                {time}
              </Text>
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
          padding: 15,
          borderRadius: 14,
          marginTop: 25,
        }}
      />

      <TextInput
        placeholder="Telefonnummer"
        placeholderTextColor="#777"
        value={phone}
        onChangeText={setPhone}
        style={{
          backgroundColor: "#111",
          color: "white",
          padding: 15,
          borderRadius: 14,
          marginTop: 15,
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
          marginTop: 30,
          alignItems: "center",
        }}
      >
        {loading ? (
          <ActivityIndicator color="black" />
        ) : (
          <Text
            style={{
              color: "black",
              fontWeight: "bold",
              fontSize: 16,
            }}
          >
            Bekräfta bokning
          </Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
}