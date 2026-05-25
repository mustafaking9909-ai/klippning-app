import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { supabase } from "../lib/supabase";
import { useRouter } from "expo-router";

export default function LoginScreen() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      Alert.alert("Fel", error.message);
      return;
    }

    router.replace("/admin");
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 20, backgroundColor: "#0A0A0A" }}>
      <Text style={{ color: "gold", fontSize: 24, marginBottom: 20 }}>
        Admin Login 💈
      </Text>

      <TextInput
        placeholder="Email"
        placeholderTextColor="#666"
        value={email}
        onChangeText={setEmail}
        style={{ backgroundColor: "#111", padding: 12, marginBottom: 10, color: "white" }}
      />

      <TextInput
        placeholder="Password"
        placeholderTextColor="#666"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={{ backgroundColor: "#111", padding: 12, marginBottom: 20, color: "white" }}
      />

      <TouchableOpacity
        onPress={handleLogin}
        style={{ backgroundColor: "gold", padding: 15, borderRadius: 10 }}
      >
        <Text style={{ textAlign: "center", fontWeight: "bold" }}>
          {loading ? "Loggar in..." : "Login"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}