import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useRouter } from "expo-router";

export default function HomeScreen() {
  const router = useRouter();

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#070707" }}>

      {/* HERO SECTION */}
      <View
        style={{
          padding: 30,
          marginTop: 60,
        }}
      >
        <Text
          style={{
            color: "gold",
            fontSize: 38,
            fontWeight: "900",
          }}
        >
          Albocutz 💈
        </Text>

        <Text
          style={{
            color: "#999",
            marginTop: 10,
            fontSize: 14,
            lineHeight: 20,
          }}
        >
          Premium barber experience. Boka din tid enkelt och snabbt.
        </Text>
      </View>

      {/* LUXURY CARD */}
      <View
        style={{
          margin: 20,
          padding: 20,
          backgroundColor: "#111",
          borderRadius: 20,
        }}
      >
        <Text style={{ color: "white", fontSize: 18, fontWeight: "700" }}>
          🔥 Boka din klippning
        </Text>

        <Text style={{ color: "#888", marginTop: 8 }}>
          Välj tid, datum och få direkt bekräftelse
        </Text>

        <TouchableOpacity
          onPress={() => router.push("/booking")}
          style={{
            marginTop: 15,
            backgroundColor: "gold",
            padding: 16,
            borderRadius: 16,
            alignItems: "center",
            shadowColor: "gold",
            shadowOpacity: 0.4,
            shadowRadius: 10,
          }}
        >
          <Text
            style={{
              color: "black",
              fontWeight: "900",
              fontSize: 16,
            }}
          >
            Boka nu
          </Text>
        </TouchableOpacity>
      </View>

      {/* SERVICES CARD */}
      <View
        style={{
          margin: 20,
          padding: 20,
          backgroundColor: "#111",
          borderRadius: 20,
        }}
      >
        <Text style={{ color: "white", fontSize: 18, fontWeight: "700" }}>
          💈 Tjänster
        </Text>

        <Text style={{ color: "#999", marginTop: 10 }}>
          • Fade / Skin Fade{"\n"}
          • Skäggtrim{"\n"}
          • Komplett styling{"\n"}
          • Hot towel shave
        </Text>
      </View>

      {/* FOOTER */}
      <View style={{ padding: 20, marginTop: 10 }}>
        <Text style={{ color: "#444", textAlign: "center" }}>
          © Albocutz – Premium Barber Experience
        </Text>
      </View>

    </ScrollView>
  );
}