import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { WORKING_HOURS } from "../constants/workingHours";

const DAYS = [
  { day: 23, name: "monday" },
  { day: 24, name: "tuesday" },
  { day: 25, name: "wednesday" },
  { day: 26, name: "thursday" },
  { day: 27, name: "friday" },
  { day: 28, name: "saturday" },
  { day: 29, name: "sunday" },
];

const ALL_TIMES = [
  "09:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00"
];

export function CalendarPicker({ onSelectSlot }: any) {
  const [selectedDay, setSelectedDay] = useState<any>(null);
  const [booked, setBooked] = useState<any[]>([]);

  useEffect(() => {
    const load = async () => {
      const res = await fetch("https://booking-backend-jcxi.onrender.com/bookings");
      const data = await res.json();
      setBooked(data);
    };
    load();
  }, []);

  const isBooked = (day: number, time: string) => {
    return booked.some(
      (b) => b.date?.includes(String(day)) && b.time === time
    );
  };

  const isOutsideWorkingHours = (dayName: string, time: string) => {
    const hours = WORKING_HOURS[dayName];
    if (!hours) return true;

    return time < hours.open || time >= hours.close;
  };

  return (
    <View>
      {/* DAYS */}
      <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8 }}>
        {DAYS.map((d) => (
          <TouchableOpacity
            key={d.day}
            onPress={() => setSelectedDay(d)}
            style={{
              padding: 10,
              borderRadius: 8,
              backgroundColor:
                selectedDay?.day === d.day ? "gold" : "#111",
            }}
          >
            <Text
              style={{
                color: selectedDay?.day === d.day ? "#000" : "#fff",
              }}
            >
              {d.day}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* TIMES */}
      <View style={{ flexDirection: "row", flexWrap: "wrap", marginTop: 15 }}>
        {ALL_TIMES.map((time) => {
          const dayName = selectedDay?.name;

          const blocked =
            !selectedDay ||
            isBooked(selectedDay.day, time) ||
            isOutsideWorkingHours(dayName, time);

          return (
            <TouchableOpacity
              key={time}
              disabled={blocked}
              onPress={() =>
                onSelectSlot(selectedDay.day, {
                  time,
                  available: !blocked,
                })
              }
              style={{
                padding: 10,
                margin: 5,
                borderRadius: 8,
                backgroundColor: blocked ? "#333" : "#1a1a1a",
                opacity: blocked ? 0.3 : 1,
              }}
            >
              <Text style={{ color: "white" }}>
                {time} {blocked ? "❌" : ""}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}