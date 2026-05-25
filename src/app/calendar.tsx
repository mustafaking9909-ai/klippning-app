import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, Alert } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";

const API = "https://booking-backend-jcxi.onrender.com/bookings";

/* 💈 schema */
const schedule: any = {
  Sön: [],
  Mån: ["10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"],
  Tis: ["10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"],
  Ons: ["10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"],
  Tors: ["10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"],
  Fre: ["10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"],
  Lör: ["10:00", "11:00", "12:00", "13:00"],
};

const days = ["Sön", "Mån", "Tis", "Ons", "Tors", "Fre", "Lör"];

export default function Calendar() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const [selectedDay, setSelectedDay] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [bookings, setBookings] = useState<any[]>([]);

  /* 📦 hämta bokningar */
  const loadBookings = async () => {
    try {
      const res = await fetch(API);
      const data = await res.json();
      setBookings(data);
    } catch {
      Alert.alert("Kunde inte ladda kalender");
    }
  };

  useEffect(() => {
    loadBookings();
  }, []);

  const isBooked = (day: string, time: string) => {
    return bookings.some(
      (b) => b.day === day && b.time === time
    );
  };

  const times = selectedDay ? schedule[selectedDay] || [] : [];

  const goConfirm = () => {
    if (!selectedDay || !selectedTime) {
      Alert.alert("Välj dag och tid");
      return;
    }

    router.push({
      pathname: "/confirm",
      params: {
        ...params,
        day: selectedDay,
        time: selectedTime,
      },
    });
  };

  return (
    <ScrollView style={{ flex: 1, padding: 20, paddingTop: 60 }}>

      <Text style={{ fontSize: 26, marginBottom: 15 }}>
        Välj tid 💈
      </Text>

      {/* 📅 VECKA SCROLL */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ marginBottom: 20 }}
      >
        {days.map((d, index) => (
          <TouchableOpacity
            key={d}
            onPress={() => {
              setSelectedDay(d);
              setSelectedTime("");
            }}
            style={{
              padding: 15,
              marginRight: 10,
              borderRadius: 10,
              backgroundColor: selectedDay === d ? "black" : "#eee",
              minWidth: 70,
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: selectedDay === d ? "white" : "black",
                fontWeight: "bold",
              }}
            >
              {d}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* ⏰ TIDER */}
      <Text style={{ marginBottom: 10 }}>
        Lediga tider
      </Text>

      <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
        {selectedDay === "" ? (
          <Text>Välj en dag först 📅</Text>
        ) : times.length === 0 ? (
          <Text>Stängt denna dag ❌</Text>
        ) : (
          times.map((t) => {
            const booked = isBooked(selectedDay, t);

            return (
              <TouchableOpacity
                key={t}
                disabled={booked}
                onPress={() => setSelectedTime(t)}
                style={{
                  padding: 12,
                  margin: 5,
                  borderRadius: 8,
                  backgroundColor: booked
                    ? "red"
                    : selectedTime === t
                    ? "black"
                    : "#eee",
                }}
              >
                <Text
                  style={{
                    color: booked
                      ? "white"
                      : selectedTime === t
                      ? "white"
                      : "black",
                  }}
                >
                  {booked ? "Full" : t}
                </Text>
              </TouchableOpacity>
            );
          })
        )}
      </View>

      {/* KNAPP */}
      <TouchableOpacity
        onPress={goConfirm}
        style={{
          marginTop: 30,
          backgroundColor: "black",
          padding: 15,
          borderRadius: 10,
        }}
      >
        <Text style={{ color: "white", textAlign: "center" }}>
          Fortsätt
        </Text>
      </TouchableOpacity>

    </ScrollView>
  );
}