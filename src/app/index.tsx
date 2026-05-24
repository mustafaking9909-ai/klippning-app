import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";

const API = "https://booking-backend-jcxi.onrender.com/bookings";

export default function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [time, setTime] = useState("");

  const times = [
    "09:30", "10:00", "10:30", "11:00",
    "11:30", "12:00", "12:30", "13:00",
    "13:30", "14:00", "14:30", "15:00",
    "15:30", "16:00", "16:30", "17:00",
    "17:30", "18:00", "18:30", "19:00",
    "19:30", "20:00", "20:30", "21:00",
    "21:30", "22:00",
  ];

  const bookAppointment = async () => {
    if (!name || !email || !phone || !time) {
      Alert.alert("Fyll i alla fält");
      return;
    }

    try {
      const res = await fetch(API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          time,
          createdAt: new Date(),
        }),
      });

      if (!res.ok) throw new Error("Booking failed");

      await res.json();

      Alert.alert("Bokning bekräftad 💈");

      setName("");
      setEmail("");
      setPhone("");
      setTime("");
    } catch (error) {
      console.log(error);
      Alert.alert("Något gick fel");
    }
  };

  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 20, paddingTop: 60 }}>

      <Text style={{ fontSize: 28, fontWeight: "bold", marginBottom: 20 }}>
        Boka tid 💈
      </Text>

      <TextInput
        placeholder="Namn"
        value={name}
        onChangeText={setName}
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
      />

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
      />

      <TextInput
        placeholder="Telefon"
        value={phone}
        onChangeText={setPhone}
        style={{ borderWidth: 1, padding: 10, marginBottom: 20 }}
      />

      <Text style={{ fontSize: 18, marginBottom: 10 }}>
        Välj tid:
      </Text>

      <View style={{ flexDirection: "row", flexWrap: "wrap", marginBottom: 20 }}>
        {times.map((t) => (
          <TouchableOpacity
            key={t}
            onPress={() => setTime(t)}
            style={{
              padding: 10,
              margin: 5,
              backgroundColor: time === t ? "black" : "#eee",
              borderRadius: 6,
            }}
          >
            <Text style={{ color: time === t ? "white" : "black" }}>
              {t}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        onPress={bookAppointment}
        style={{
          backgroundColor: "black",
          padding: 15,
          alignItems: "center",
          borderRadius: 8,
        }}
      >
        <Text style={{ color: "white", fontWeight: "bold" }}>
          Bekräfta bokning
        </Text>
      </TouchableOpacity>

    </ScrollView>
  );
}