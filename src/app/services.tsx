import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

const SERVICES = [
  { id: 'herr', name: 'Herr Klippning', price: 150 },
  { id: 'lineup', name: 'Line Up', price: 100 },
  { id: 'skagg', name: 'Skägg +', price: 50 },
];

export default function Services() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, padding: 20, justifyContent: 'center' }}>

      <Text style={{ fontSize: 24, marginBottom: 20 }}>
        Välj tjänst
      </Text>

      {SERVICES.map((s) => (
        <TouchableOpacity
          key={s.id}
          onPress={() =>
            router.push({
              pathname: '/booking',
              params: { serviceId: s.id }
            })
          }
          style={{
            padding: 15,
            backgroundColor: '#111',
            marginBottom: 10,
            borderRadius: 10,
          }}
        >
          <Text style={{ color: 'white' }}>{s.name}</Text>
          <Text style={{ color: 'gold' }}>{s.price} kr</Text>
        </TouchableOpacity>
      ))}

    </View>
  );
}