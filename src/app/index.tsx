import React, { useState } from "react";
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

  const [service, setService] = useState<null | string>(null);
  const [price, setPrice] = useState(0);

  const selectService = (type: string, cost: number) => {
    setService(type);
    setPrice(cost);
  };

  return (
    <ImageBackground
      source={require("../../assets/bg.jpeg")}
      style={{ flex: 1 }}
      resizeMode="cover"
    >
      <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.65)" }}>
        <ScrollView>

          {/* LOGO (STÖRRE NU) */}
          <View style={{ alignItems: "center", marginTop: 60 }}>
            <Image
              source={require("../../assets/images/logo.png")}
              style={{
                width: 220,
                height: 220,
                resizeMode: "contain",
              }}
            />
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
            <Text style={{ color: "white", fontSize: 18, fontWeight: "800" }}>
              💈 Välj tjänst
            </Text>

            {/* HERRKLIPPNING */}
            <TouchableOpacity
              onPress={() => selectService("Herrklippning", 150)}
              style={{
                marginTop: 12,
                padding: 15,
                borderRadius: 12,
                backgroundColor:
                  service === "Herrklippning" ? "gold" : "#1A1A1A",
              }}
            >
              <Text
                style={{
                  color: service === "Herrklippning" ? "black" : "white",
                  fontWeight: "700",
                }}
              >
                Herrklippning — 150 kr
              </Text>
            </TouchableOpacity>

            {/* LINE UP */}
            <TouchableOpacity
              onPress={() => selectService("Line up", 80)}
              style={{
                marginTop: 12,
                padding: 15,
                borderRadius: 12,
                backgroundColor:
                  service === "Line up" ? "gold" : "#1A1A1A",
              }}
            >
              <Text
                style={{
                  color: service === "Line up" ? "black" : "white",
                  fontWeight: "700",
                }}
              >
                Line up — 80 kr
              </Text>
            </TouchableOpacity>

            {/* SKÄGG ADDON */}
            <TouchableOpacity
              onPress={() =>
                service === "Herrklippning"
                  ? setPrice(200)
                  : setPrice(price + 50)
              }
              style={{
                marginTop: 12,
                padding: 15,
                borderRadius: 12,
                backgroundColor: "#1A1A1A",
              }}
            >
              <Text style={{ color: "white", fontWeight: "700" }}>
                + Skägg (+50 kr)
              </Text>
            </TouchableOpacity>

            {/* PRICE DISPLAY */}
            <View style={{ marginTop: 15 }}>
              <Text style={{ color: "gold", fontSize: 18, fontWeight: "800" }}>
                Pris: {price} kr
              </Text>
            </View>
          </View>

          {/* BOOK BUTTON */}
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
            <TouchableOpacity
              onPress={() => router.push("/booking")}
              style={{
                backgroundColor: "gold",
                padding: 16,
                borderRadius: 16,
                alignItems: "center",
              }}
            >
              <Text style={{ color: "black", fontWeight: "900", fontSize: 16 }}>
                Fortsätt till bokning
              </Text>
            </TouchableOpacity>
          </View>

        </ScrollView>
      </View>
    </ImageBackground>
  );
}