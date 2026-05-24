import React from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";

const API = "https://booking-backend-jcxi.onrender.com/bookings";

export default function Confirm() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const book = async () => {
    await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(params),
    });

    Alert.alert("Bokning klar 💈");
    router.push("/");
  };

  return (
    <View style={{ flex: 1, padding: 20, paddingTop: 60 }}>

      <Text>Bekräfta bokning</Text>

      <Text>{JSON.stringify(params)}</Text>

      <TouchableOpacity
        onPress={book}
        style={{
          marginTop: 30,
          backgroundColor: "black",
          padding: 15,
          borderRadius: 10
        }}
      >
        <Text style={{ color: "white" }}>
          Boka nu
        </Text>
      </TouchableOpacity>

    </View>
  );
}