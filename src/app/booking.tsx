import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput, Alert } from "react-native";
import { supabase } from "../lib/supabase";

export default function BookingScreen() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [time, setTime] = useState("");

  const book = async () => {
    console.log("CLICKED");

    if (!name || !phone || !time) {
      Alert.alert("Fyll i allt");
      return;
    }

    const { data, error } = await supabase
      .from("bookings")
      .insert([
        {
          name,
          phone,
          time,
          day: "monday",
          status: "confirmed",
          price: 150,
          created_at: new Date().toISOString(),
        },
      ]);

    console.log("RESULT:", { data, error });

    if (error) {
      Alert.alert("ERROR", JSON.stringify(error));
      return;
    }

    Alert.alert("💈 Bokad!");

    setName("");
    setPhone("");
    setTime("");
  };

  return (
    <View style={{ padding: 20, marginTop: 50 }}>
      <Text>Namn</Text>
      <TextInput value={name} onChangeText={setName} style={{ borderWidth: 1, marginBottom: 10 }} />

      <Text>Telefon</Text>
      <TextInput value={phone} onChangeText={setPhone} style={{ borderWidth: 1, marginBottom: 10 }} />

      <Text>Tid (ex 10:00)</Text>
      <TextInput value={time} onChangeText={setTime} style={{ borderWidth: 1, marginBottom: 10 }} />

      <TouchableOpacity onPress={book} style={{ backgroundColor: "gold", padding: 15 }}>
        <Text>Boka</Text>
      </TouchableOpacity>
    </View>
  );
}