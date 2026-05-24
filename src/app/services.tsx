import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

export default function Services() {
  const router = useRouter();

  const [service, setService] = useState("");
  const [beard, setBeard] = useState(false);

  const selectService = (s: string) => {
    setService(s);
  };

  const goNext = () => {
    router.push({
      pathname: "/calendar",
      params: {
        service,
        beard: beard ? "1" : "0",
      },
    });
  };

  return (
    <View style={{ flex: 1, padding: 20, paddingTop: 60 }}>

      <Text style={{ fontSize: 26, marginBottom: 20 }}>
        Välj tjänst
      </Text>

      {/* SERVICES */}
      <TouchableOpacity onPress={() => selectService("herr")}>
        <Text>Herr klippning - 150 kr (30 min)</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => selectService("lineup")}>
        <Text>Line up - 100 kr</Text>
      </TouchableOpacity>

      {/* BEARD */}
      <TouchableOpacity
        onPress={() => setBeard(!beard)}
        style={{ marginTop: 20 }}
      >
        <Text>
          {beard ? "✔ Skägg +50 kr" : "➕ Lägg till skägg +50 kr"}
        </Text>
      </TouchableOpacity>

      {/* NEXT */}
      <TouchableOpacity
        onPress={goNext}
        style={{
          marginTop: 30,
          backgroundColor: "black",
          padding: 15,
          borderRadius: 10
        }}
      >
        <Text style={{ color: "white" }}>
          Nästa
        </Text>
      </TouchableOpacity>

    </View>
  );
}