import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { supabase } from "../lib/supabase";

const TIMES = [
  "13:00","13:30","14:00","14:30","15:00","15:30",
  "16:00","17:00","17:30","18:00","18:30",
  "19:00","20:00","20:30","21:00","21:30","22:00"
];

export default function AdminSlots() {
  const [slots, setSlots] = useState<any[]>([]);

  const load = async () => {
    const { data } = await supabase.from("available_slots").select("*");
    if (data) setSlots(data);
  };

  useEffect(() => {
    load();
  }, []);

  const toggleSlot = async (day: string, time: string, exists: any) => {
    if (exists?.is_active) {
      await supabase
        .from("available_slots")
        .update({ is_active: false })
        .eq("day", day)
        .eq("time", time);
    } else {
      await supabase.from("available_slots").insert([
        { day, time, is_active: true },
      ]);
    }

    load();
  };

  const day = "monday";

  return (
    <ScrollView style={{ padding: 20, backgroundColor: "#0A0A0A" }}>
      <Text style={{ color: "gold", fontSize: 24 }}>
        Admin Tider 💈
      </Text>

      {TIMES.map((t) => {
        const exists = slots.find(
          (s) => s.day === day && s.time === t
        );

        return (
          <TouchableOpacity
            key={t}
            onPress={() => toggleSlot(day, t, exists)}
            style={{
              padding: 15,
              marginTop: 10,
              backgroundColor: exists?.is_active
                ? "gold"
                : "#222",
              borderRadius: 10,
            }}
          >
            <Text style={{ color: exists?.is_active ? "black" : "white" }}>
              {t} {exists?.is_active ? "✔" : "✖"}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}