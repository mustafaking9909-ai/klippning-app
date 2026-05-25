import React, { useMemo } from "react";
import { View, Text, TouchableOpacity } from "react-native";

const DAYS = ["M", "T", "O", "T", "F", "L", "S"];

function getDaysInMonth() {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const adjustedFirstDay = firstDay === 0 ? 6 : firstDay - 1;

  const days = [];

  for (let i = 0; i < adjustedFirstDay; i++) {
    days.push(null);
  }

  for (let d = 1; d <= daysInMonth; d++) {
    days.push(d);
  }

  return days;
}

export default function LuxuryCalendar({
  selectedDay,
  onSelectDay,
}: any) {
  const days = useMemo(() => getDaysInMonth(), []);

  const today = new Date().getDate();

  return (
    <View
      style={{
        backgroundColor: "#111",
        padding: 15,
        borderRadius: 20,
        margin: 20,
      }}
    >
      <Text
        style={{
          color: "gold",
          fontSize: 18,
          fontWeight: "700",
          marginBottom: 10,
        }}
      >
        Välj datum
      </Text>

      {/* WEEK HEADER */}
      <View style={{ flexDirection: "row", marginBottom: 10 }}>
        {DAYS.map((d, i) => (
          <Text
            key={i}
            style={{
              flex: 1,
              color: "#777",
              textAlign: "center",
              fontSize: 12,
            }}
          >
            {d}
          </Text>
        ))}
      </View>

      {/* GRID */}
      <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
        {days.map((day, i) => {
          const isSelected = selectedDay === day;
          const isToday = day === today;

          return (
            <TouchableOpacity
              key={i}
              disabled={!day}
              onPress={() => onSelectDay(day)}
              style={{
                width: "14.2%",
                aspectRatio: 1,
                justifyContent: "center",
                alignItems: "center",
                marginBottom: 8,
              }}
            >
              <View
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: 12,
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: isSelected
                    ? "gold"
                    : isToday
                    ? "#222"
                    : "transparent",
                  borderWidth: isToday ? 1 : 0,
                  borderColor: "#333",
                }}
              >
                <Text
                  style={{
                    color: isSelected ? "black" : "white",
                    fontWeight: "600",
                  }}
                >
                  {day || ""}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}