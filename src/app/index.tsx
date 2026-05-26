import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  Image,
} from "react-native";
import { useRouter } from "expo-router";

export default function HomeScreen() {
  const router = useRouter();

  return (
    <ImageBackground
      source={require("../../assets/bg.jpeg")}
      style={{ flex: 1 }}
      resizeMode="cover"
    >
      {/* DARK OVERLAY */}
      <View
        style={{
          flex: 1,
          backgroundColor: "rgba(0,0,0,0.65)",
        }}
      >
        <ScrollView style={{ flex: 1 }}>

          {/* LOGO HERO */}
          <View
            style={{
              alignItems: "center",
              marginTop: 70,
              marginBottom: 20,
            }}
          >
            <Image
              source={require("../../assets/images/logo.png")}
              style={{
                width: 160,
                height: 160,
                resizeMode: "contain",
              }}
            />
          </View>

          {/* TEXT */}
          <View style={{ paddingHorizontal: 30 }}>
            <Text
              style={{
                color: "#ddd",
                fontSize: 15,
                textAlign: "center",
                lineHeight: 22,
              }}
            >
              Premium barber experience. Fade, skägg & style i toppklass.
            </Text>
          </View>

          {/* BOOK CARD */}
          <View
            style={{
              margin: 20,
              padding: 20,
              backgroundColor: "rgba(20,20,20,0.85)",
              borderRadius: 20,
              borderWidth: 1,
              borderColor: "#222",
              marginTop: 30,
            }}
          >
            <Text style={{ color: "white", fontSize: 18, fontWeight: "700" }}>
              💈 Boka din tid
            </Text>

            <Text style={{ color: "#aaa", marginTop: 8 }}>
              Välj datum & tid direkt i appen
            </Text>

            <TouchableOpacity
              onPress={() => router.push("/booking")}
              style={{
                marginTop: 15,
                backgroundColor: "gold",
                padding: 16,
                borderRadius: 16,
                alignItems: "center",
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

          {/* SERVICES */}
          <View
            style={{
              margin: 20,
              padding: 20,
              backgroundColor: "rgba(20,20,20,0.85)",
              borderRadius: 20,
              borderWidth: 1,
              borderColor: "#222",
            }}
          >
            <Text style={{ color: "white", fontSize: 18, fontWeight: "700" }}>
              💈 Tjänster
            </Text>

            <Text style={{ color: "#bbb", marginTop: 10, lineHeight: 22 }}>
              ✂ Fade / Skin Fade{"\n"}
              🧔 Skäggtrim{"\n"}
              💇 Komplett klippning{"\n"}
              🔥 Hot towel shave
            </Text>
          </View>

          {/* FOOTER */}
          <View style={{ padding: 20 }}>
            <Text style={{ color: "#555", textAlign: "center" }}>
              Premium Barber Experience
            </Text>
          </View>

        </ScrollView>
      </View>
    </ImageBackground>
  );
}