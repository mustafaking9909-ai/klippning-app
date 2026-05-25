import React from "react";
import { TouchableOpacity, Text } from "react-native";

export function GoldButton({ label, onPress, disabled }: any) {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={{
        backgroundColor: disabled ? "#333" : "gold",
        padding: 15,
        borderRadius: 10,
        marginTop: 20,
        alignItems: "center",
      }}
    >
      <Text style={{ fontWeight: "bold", color: "#000" }}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}