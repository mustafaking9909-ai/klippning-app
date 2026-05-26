import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";

import { supabase } from "../lib/supabase";
import LuxuryCalendar from "../components/LuxuryCalendar";

const TIMES = [
  "13:00","13:30","14:00","14:30","15:00","15:30",
  "16:00","17:00","17:30","18:00","18:30",
  "19:00","20:00","20:30","21:00","21:30","22:00"
];

export default function BookingScreen() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState("");

  const [service, setService] = useState<string | null>(null);
  const [price, setPrice] = useState(0);

  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const loadBookings = async () => {
    const { data } = await supabase.from("bookings").select("*");
    if (data) setBookings(data);
  };

  useEffect(() => {
    loadBookings();
  }, []);

  const isTaken = (day: number | null, time: string) => {
    return bookings.some((b) => b.day == day && b.time === time);
  };

  const selectService = (type: string, cost: number) => {
    setService(type);
    setPrice(cost);
  };

  const addBeard = () => {
    if (!service) return;

    setService(service + " + Skägg");
    setPrice(price + 50);
  };

  const handleBooking = async () => {
    if (!name || !phone || !selectedDay || !selectedTime || !service) {
      Alert.alert("Fyll i allt (inkl tjänst)");
      return;
    }

    setLoading(true);

    const { error } = await supabase.from("bookings").insert([
      {
        name,
        phone,
        day: String(selectedDay),
        time: selectedTime,
        service: service,
        price: price,
        status: "confirmed",
        created_at: new Date().toISOString(),
      },
    ]);

    if (error) {
      Alert.alert("Error", error.message);
      setLoading(false);
      return;
    }

    Alert.alert("💈 Bokad!");

    setName("");
    setPhone("");
    setSelectedTime("");
    setService(null);
    setPrice(0);

    loadBookings();
    setLoading(false);
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#0A0A0A" }}>
      
      {/* TITLE */}
      <Text style={{
        color: "gold",
        fontSize: 32,
        fontWeight: "900",
        marginTop: 50,
        marginLeft: 20,
      }}>
        Boka tid 💈
      </Text>

      {/* SERVICES */}
      <View
        style={{
          margin: 20,
          padding: 15,
          backgroundColor: "#111",
          borderRadius: 15,
        }}
      >
        <Text style={{ color: "white", fontWeight: "800", marginBottom: 10 }}>
          Välj tjänst
        </Text>

        <TouchableOpacity
          onPress={() => selectService("Herrklippning", 150)}
          style={{
            padding: 12,
            backgroundColor: service === "Herrklippning" ? "gold" : "#1A1A1A",
            borderRadius: 10,
            marginBottom: 10,
          }}
        >
          <Text style={{ color: service === "Herrklippning" ? "black" : "white" }}>
            Herrklippning — 150 kr
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => selectService("Line up", 80)}
          style={{
            padding: 12,
            backgroundColor: service === "Line up" ? "gold" : "#1A1A1A",
            borderRadius: 10,
            marginBottom: 10,
          }}
        >
          <Text style={{ color: service === "Line up" ? "black" : "white" }}>
            Line up — 80 kr
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={addBeard}
          style={{
            padding: 12,
            backgroundColor: "#1A1A1A",
            borderRadius: 10,
          }}
        >
          <Text style={{ color: "white" }}>
            + Skägg (+50 kr)
          </Text>
        </TouchableOpacity>

        <Text style={{ color: "gold", marginTop: 10, fontWeight: "800" }}>
          Pris: {price} kr
        </Text>
      </View>

      {/* CALENDAR */}
      <LuxuryCalendar
        selectedDay={selectedDay}
        onSelectDay={setSelectedDay}
      />

      {/* TIMES */}
      <View style={{ flexDirection: "row", flexWrap: "wrap", padding: 15 }}>
        {TIMES.map((t) => {
          const taken = isTaken(selectedDay, t);

          return (
            <TouchableOpacity
              key={t}
              disabled={taken}
              onPress={() => setSelectedTime(t)}
              style={{
                backgroundColor: taken
                  ? "#3a1a1a"
                  : selectedTime === t
                  ? "gold"
                  : "#1A1A1A",
                padding: 12,
                margin: 5,
                borderRadius: 10,
                opacity: taken ? 0.4 : 1,
              }}
            >
              <Text style={{ color: "white" }}>{t}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* INPUTS */}
      <View style={{ padding: 20 }}>
        <TextInput
          placeholder="Namn"
          placeholderTextColor="#777"
          value={name}
          onChangeText={setName}
          style={{
            backgroundColor: "#111",
            color: "white",
            padding: 15,
            borderRadius: 12,
            marginBottom: 10,
          }}
        />

        <TextInput
          placeholder="Telefon"
          placeholderTextColor="#777"
          value={phone}
          onChangeText={setPhone}
          style={{
            backgroundColor: "#111",
            color: "white",
            padding: 15,
            borderRadius: 12,
          }}
        />

        {/* BUTTON */}
        <TouchableOpacity
          onPress={handleBooking}
          disabled={loading}
          style={{
            backgroundColor: "gold",
            padding: 18,
            borderRadius: 14,
            marginTop: 20,
            alignItems: "center",
          }}
        >
          {loading ? (
            <ActivityIndicator color="black" />
          ) : (
            <Text style={{ fontWeight: "900", color: "black" }}>
              Bekräfta bokning
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}