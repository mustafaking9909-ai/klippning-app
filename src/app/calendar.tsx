import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";

const days = [
  "Sön",
  "Mån",
  "Tis",
  "Ons",
  "Tors",
  "Fre",
  "Lör",
];

// demo tider
const times = ["10:00", "12:00", "14:00", "16:00"];

export default function Calendar() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const [selectedDay, setSelectedDay] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  const goConfirm = () => {
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
    <View style={{ flex: 1, padding: 20, paddingTop: 60 }}>

      <Text style={{ fontSize: 26, marginBottom: 20 }}>
        Välj dag & tid
      </Text>

      {/* DAYS */}
      <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
        {days.map((d) => (
          <TouchableOpacity
            key={d}
            onPress={() => setSelectedDay(d)}
            style={{
              padding: 10,
              margin: 5,
              backgroundColor: selectedDay === d ? "black" : "#eee"
            }}
          >
            <Text style={{ color: selectedDay === d ? "white" : "black" }}>
              {d}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* TIMES */}
      <Text style={{ marginTop: 20 }}>Tider</Text>

      <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
        {times.map((t) => (
          <TouchableOpacity
            key={t}
            onPress={() => setSelectedTime(t)}
            style={{
              padding: 10,
              margin: 5,
              backgroundColor: selectedTime === t ? "black" : "#eee"
            }}
          >
            <Text style={{ color: selectedTime === t ? "white" : "black" }}>
              {t}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* NEXT */}
      <TouchableOpacity
        onPress={goConfirm}
        style={{
          marginTop: 30,
          backgroundColor: "black",
          padding: 15,
          borderRadius: 10
        }}
      >
        <Text style={{ color: "white" }}>
          Bekräfta
        </Text>
      </TouchableOpacity>

    </View>
  );
}