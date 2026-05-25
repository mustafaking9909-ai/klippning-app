import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  StatusBar,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";

const { width } = Dimensions.get("window");

export default function HomeScreen() {
  const router = useRouter();

  const [service, setService] = useState<null | string>(null);
  const [beard, setBeard] = useState(false);

  const getPrice = () => {
    let price = 0;

    if (service === "haircut") price += 150;
    if (service === "lineup") price += 80;

    if (beard) price += 50;

    return price;
  };

  const handleBook = () => {
    if (!service) return;

    router.push({
      pathname: "/booking",
      params: {
        service,
        beard: beard ? "1" : "0",
        price: getPrice().toString(),
      },
    });
  };

  return (
    <LinearGradient
      colors={["#050505", "#111111", "#1A1A1A"]}
      style={{ flex: 1 }}
    >
      <StatusBar barStyle="light-content" />

      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>

        {/* HERO */}
        <View style={{ alignItems: "center", paddingTop: 60 }}>

          <Image
            source={require("../../assets/images/logo.png")}
            style={{ width: width * 0.7, height: 200, resizeMode: "contain" }}
          />

          <Text style={{ color: "#999", marginTop: -10 }}>
            Premium barber upplevelse
          </Text>
        </View>

        {/* SERVICES */}
        <View
          style={{
            marginTop: 25,
            backgroundColor: "#111",
            borderRadius: 30,
            padding: 20,
            borderWidth: 1,
            borderColor: "#222",
            marginHorizontal: 20,
          }}
        >
          <Text style={{ color: "#D4AF37", fontWeight: "700" }}>
            TJÄNSTER
          </Text>

          <Text style={{ color: "white", fontSize: 20, marginTop: 10 }}>
            Välj behandling
          </Text>

          {/* SERVICE BUTTONS */}

          <TouchableOpacity
            onPress={() => setService("haircut")}
            style={{
              backgroundColor: service === "haircut" ? "#D4AF37" : "#1A1A1A",
              padding: 15,
              borderRadius: 15,
              marginTop: 15,
            }}
          >
            <Text style={{ color: service === "haircut" ? "black" : "white" }}>
              💇 Herrklippning — 150 kr
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setService("lineup")}
            style={{
              backgroundColor: service === "lineup" ? "#D4AF37" : "#1A1A1A",
              padding: 15,
              borderRadius: 15,
              marginTop: 10,
            }}
          >
            <Text style={{ color: service === "lineup" ? "black" : "white" }}>
              ✂️ Line up — 80 kr
            </Text>
          </TouchableOpacity>

          {/* BEARD ADD ON */}
          <TouchableOpacity
            onPress={() => setBeard(!beard)}
            style={{
              backgroundColor: beard ? "#D4AF37" : "#1A1A1A",
              padding: 15,
              borderRadius: 15,
              marginTop: 10,
            }}
          >
            <Text style={{ color: beard ? "black" : "white" }}>
              🧔 Skägg +50 kr (tillägg)
            </Text>
          </TouchableOpacity>

          {/* PRICE */}
          <Text style={{ color: "white", marginTop: 15, fontSize: 18 }}>
            Pris: {getPrice()} kr
          </Text>
        </View>

        {/* BOOK BUTTON */}
        <TouchableOpacity
          onPress={handleBook}
          disabled={!service}
          style={{
            marginHorizontal: 20,
            marginTop: 25,
            backgroundColor: service ? "#D4AF37" : "#333",
            padding: 18,
            borderRadius: 25,
            alignItems: "center",
          }}
        >
          <Text style={{ color: "black", fontWeight: "800" }}>
            FORTSÄTT TILL BOKNING
          </Text>
        </TouchableOpacity>

      </ScrollView>
    </LinearGradient>
  );

useEffect(() => {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/sw.js");
  }
}, []);
}