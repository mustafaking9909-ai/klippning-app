import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { useRouter } from "expo-router";
import { View, Text } from "react-native";

export default function AuthGuard({ children }: any) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const check = async () => {
      const { data } = await supabase.auth.getUser();

      if (!data.user) {
        router.replace("/login");
      }

      setLoading(false);
    };

    check();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, backgroundColor: "#000", justifyContent: "center" }}>
        <Text style={{ color: "white", textAlign: "center" }}>
          Laddar...
        </Text>
      </View>
    );
  }

  return children;
}