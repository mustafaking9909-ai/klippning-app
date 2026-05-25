import React, { useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { isLoggedIn } from "../utils/auth";

const API = "https://booking-backend-jcxi.onrender.com/bookings";

export default function AdminDashboard() {
  const router = useRouter();
  const [bookings, setBookings] = useState<any[]>([]);

  useEffect(() => {
    const check = async () => {
      const ok = await isLoggedIn();
      if (!ok) router.replace("/login");
      else load();
    };

    check();
  }, []);

  const load = async () => {
    const res = await fetch(API);
    const data = await res.json();
    setBookings(data);
  };

  // 💰 PRISER (anpassa efter din app)
  const getPrice = (b: any) => {
    let price = 0;

    if (b.service === "herr") price += 150;
    if (b.service === "lineup") price += 100;
    if (b.beard === true) price += 50;

    return price;
  };

  const totalIncome = bookings.reduce(
    (sum, b) => sum + getPrice(b),
    0
  );

  const today = new Date().toISOString().split("T")[0];

  const todayBookings = bookings.filter(
    (b) => b.date === today
  );

  const serviceCount: any = {};

  bookings.forEach((b) => {
    serviceCount[b.service] =
      (serviceCount[b.service] || 0) + 1;
  });

  const mostBooked = Object.keys(serviceCount).reduce(
    (a, b) =>
      serviceCount[a] > serviceCount[b] ? a : b,
    "none"
  );

  return (
    <ScrollView style={{ flex: 1, padding: 20, paddingTop: 60 }}>

      <Text style={{ fontSize: 28, fontWeight: "bold", marginBottom: 20 }}>
        Admin Dashboard 📊
      </Text>

      {/* 💰 INKOMST */}
      <View style={box}>
        <Text style={title}>💰 Total inkomst</Text>
        <Text style={value}>{totalIncome} kr</Text>
      </View>

      {/* 📅 TOTAL BOOKINGS */}
      <View style={box}>
        <Text style={title}>📦 Bokningar totalt</Text>
        <Text style={value}>{bookings.length}</Text>
      </View>

      {/* 📆 TODAY */}
      <View style={box}>
        <Text style={title}>📅 Idag</Text>
        <Text style={value}>{todayBookings.length}</Text>
      </View>

      {/* 🔥 POPULÄR */}
      <View style={box}>
        <Text style={title}>🔥 Mest bokad tjänst</Text>
        <Text style={value}>{mostBooked}</Text>
      </View>

    </ScrollView>
  );
}

const box = {
  backgroundColor: "#eee",
  padding: 20,
  borderRadius: 12,
  marginBottom: 15,
};

const title = {
  fontSize: 16,
  color: "#555",
};

const value = {
  fontSize: 26,
  fontWeight: "bold",
  marginTop: 5,
};