import React from "react";
import { Image, View } from "react-native";

export function AlboCutzLogo({ size = 120 }: { size?: number }) {
  return (
    <View style={{ alignItems: "center" }}>
      <Image
        source={require("../../assets/logo.jpeg")}
        style={{
          width: size,
          height: size,
          resizeMode: "contain",
        }}
      />
    </View>
  );
}