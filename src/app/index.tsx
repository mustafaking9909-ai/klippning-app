import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

export default function Home() {
  const router = useRouter();

  return (
    <View style={{
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "white"
    }}>

      {/* LOGO */}
      <Text style={{ fontSize: 40, fontWeight: "bold" }}>
        Albo Cutz
      </Text>

      <Text style={{ marginTop: 10, marginBottom: 40 }}>
        Barber Studio
      </Text>

      {/* BOOK BUTTON */}
      <TouchableOpacity
        onPress={() => router.push("/services")}
        style={{
          backgroundColor: "black",
          padding: 15,
          borderRadius: 10
        }}
      >
        <Text style={{ color: "white" }}>
          Boka tid
        </Text>
      </TouchableOpacity>

    </View>
  );
}