import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { useRouter } from "expo-router";

export default function Login() {
  const router = useRouter();
  const [password, setPassword] = useState("");

  const ADMIN_PASSWORD = "1234";

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      router.push("/admin");
    } else {
      Alert.alert("Fel lösenord");
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 20 }}>
      
      <Text style={{ fontSize: 26, marginBottom: 20 }}>
        Admin Login 🔐
      </Text>

      <TextInput
        placeholder="Lösenord"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={{
          borderWidth: 1,
          padding: 12,
          marginBottom: 20,
        }}
      />

      <TouchableOpacity
        onPress={handleLogin}
        style={{
          backgroundColor: "black",
          padding: 15,
          borderRadius: 8,
        }}
      >
        <Text style={{ color: "white", textAlign: "center" }}>
          Logga in
        </Text>
      </TouchableOpacity>

    </View>
  );
}