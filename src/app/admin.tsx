import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { useRouter } from "expo-router";

const API = "https://booking-backend-jcxi.onrender.com/bookings";

export default function Index() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [time, setTime] = useState("");

  const bookTime = async () => {
    if (!name || !email || !phone || !time) {
      Alert.alert("Fyll i alla fält");
      return;
    }

    try {
      await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          time,
        }),
      });

      Alert.alert("Bokning skapad 💈");

      setName("");
      setEmail("");
      setPhone("");
      setTime("");
    } catch (error) {
      Alert.alert("Något gick fel");
    }
  };

  return (
    <View style={{ flex: 1, padding: 20, paddingTop: 60 }}>

      {/* 🔐 ADMIN KNAPP */}
      <TouchableOpacity
        onPress={() => router.push("/login")}
        style={{
          position: "absolute",
          top: 40,
          right: 20,
          backgroundColor: "black",
          padding: 10,
          borderRadius: 8,
        }}
      >
        <Text style={{ color: "white" }}>Admin</Text>
      </TouchableOpacity>

      <Text style={{ fontSize: 28, fontWeight: "bold", marginBottom: 20 }}>
        Boka tid 💈
      </Text>

      <TextInput
        placeholder="Namn"
        value={name}
        onChangeText={setName}
        style={{ borderWidth: 1, marginBottom: 10, padding: 10 }}
      />

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={{ borderWidth: 1, marginBottom: 10, padding: 10 }}
      />

      <TextInput
        placeholder="Telefon"
        value={phone}
        onChangeText={setPhone}
        style={{ borderWidth: 1, marginBottom: 10, padding: 10 }}
      />

      <TextInput
        placeholder="Tid (ex 14:00)"
        value={time}
        onChangeText={setTime}
        style={{ borderWidth: 1, marginBottom: 20, padding: 10 }}
      />

      <TouchableOpacity
        onPress={bookTime}
        style={{
          backgroundColor: "black",
          padding: 15,
          borderRadius: 8,
        }}
      >
        <Text style={{ color: "white", textAlign: "center" }}>
          Boka tid
        </Text>
      </TouchableOpacity>

    </View>
  );
}