import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable, Linking, Alert, Image } from 'react-native';
import { useRouter } from 'expo-router';

const UI_COLORS = {
  bg: '#0F172A', surface: '#1E293B', innerBg: '#111827',
  border: '#334155', textPrimary: '#F8FAFC', textSecondary: '#94A3B8',
  purple: '#7C3AED', orange: '#EA580C', emerald: '#10B981', blue: '#0284C7'
};

const PROPERTY_DATA = [
  {
    id: 'manila-condo',
    type: 'Metro Manila Condo',
    location: 'BGC / Makati / Ortigas Metro Area',
    valuation: 6500000,
    requiredDP: 1300000, // 20% Upfront Capital
    monthlyAmortization: 33000, 
    description: 'Premium high-rise studio or 1BR unit close to major central business districts.',
    img: 'https://images.unbxd.io/autocars-production/1625738100_condo-exterior.png'
  },
  {
    id: 'cavite-house',
    type: 'Cavite / Laguna House & Lot',
    location: 'Suburban Gated Community Development',
    valuation: 3500000,
    requiredDP: 700000, // 20% Upfront Capital
    monthlyAmortization: 18000, 
    description: 'Perfect for growing families. Two-story townhouse with parking space.',
    img: 'https://images.unbxd.io/autocars-production/1625738200_townhouse-exterior.png'
  },
  {
    id: 'bulacan-rowhouse',
    type: 'Bulacan Rowhouse',
    location: 'Accessible Fringe Core Extension Area',
    valuation: 1800000,
    requiredDP: 360000, // 20% Upfront Capital
    monthlyAmortization: 9500, 
    description: 'Highly affordable starter home accessible via major transit line extensions.',
    img: 'https://images.unbxd.io/autocars-production/1625738300_rowhouse-exterior.png'
  }
];

export default function RealEstateScreen() {
  const router = useRouter();
  const [selectedProperty, setSelectedProperty] = useState(PROPERTY_DATA[0]);

  const calculateRequiredIncome = (amortization: number) => {
    return Math.round(amortization / 0.35);
  };

  const handleCTAAction = () => {
    Alert.alert(
      "Pag-IBIG Pre-Qualification",
      `Redirecting to estimate requirements for your chosen ${selectedProperty.type}. Ensure you have at least 24 months of active savings contributions.`,
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Proceed to Portal", 
          onPress: () => Linking.openURL('https://www.pagibigfundservices.com/').catch(() => {}) 
        }
      ]
    );
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: UI_COLORS.bg }} contentContainerStyle={{ padding: 20, paddingTop: 40 }}>
      <Pressable onPress={() => router.replace('/')} style={{ marginBottom: 16 }}>
        <Text style={{ color: UI_COLORS.orange, fontWeight: '600' }}>← Dashboard</Text>
      </Pressable>
      
      <Text style={{ fontSize: 24, fontWeight: '700', color: '#FFF', marginBottom: 4 }}>Real Estate Affordability Index</Text>
      <Text style={{ fontSize: 13, color: UI_COLORS.textSecondary, marginBottom: 20 }}>Benchmark estimated long-term property values with local government amortization plans.</Text>

      {/* RENDER PROPERTY OPTIONS SELECTION CARDS */}
      <View style={{ gap: 14, marginBottom: 24 }}>
        {PROPERTY_DATA.map((item) => {
          const isSelected = selectedProperty.id === item.id;
          return (
            <Pressable 
              key={item.id} 
              onPress={() => setSelectedProperty(item)}
              style={{ 
                backgroundColor: UI_COLORS.surface, 
                padding: 16, 
                borderRadius: 16, 
                borderWidth: 1, 
                borderColor: isSelected ? UI_COLORS.orange : UI_COLORS.border 
              }}
            >
              <Text style={{ color: '#FFF', fontSize: 18, fontWeight: '700' }}>{item.type}</Text>
              <Text style={{ color: UI_COLORS.textSecondary, fontSize: 12, marginTop: 2 }}>{item.location}</Text>
              <Text style={{ color: UI_COLORS.orange, fontSize: 14, fontWeight: '700', marginTop: 4 }}>
                Estimated Valuation: <Text style={{ color: '#FFF' }}>₱{item.valuation.toLocaleString()}</Text>
              </Text>

              {/* RENDER DYNAMIC ARCHITECTURAL IMAGE IF ACTIVE/SELECTED */}
              {isSelected && item.img && (
                <Image 
                  source={{ uri: item.img }} 
                  style={{ width: '100%', height: 160, borderRadius: 12, marginTop: 12, backgroundColor: UI_COLORS.innerBg }} 
                  resizeMode="cover"
                />
              )}
              
              <View style={{ backgroundColor: UI_COLORS.innerBg, padding: 12, borderRadius: 10, marginTop: 12, borderWidth: 1, borderColor: UI_COLORS.border }}>
                <Text style={{ color: UI_COLORS.textSecondary, fontSize: 11 }}>Required Upfront Capital (20%): ₱{item.requiredDP.toLocaleString()}</Text>
                <Text style={{ color: UI_COLORS.orange, fontSize: 14, fontWeight: '700', marginTop: 4 }}>
                  Pag-IBIG Amortization (30 Yrs): <Text style={{ fontSize: 16, fontWeight: '800' }}>₱{item.monthlyAmortization.toLocaleString()}/mo</Text>
                </Text>
              </View>
            </Pressable>
          );
        })}
      </View>

      {/* AFFORDABILITY EVALUATION CHECKLIST CTA */}
      <View style={{ backgroundColor: UI_COLORS.surface, borderRadius: 16, padding: 16, borderWidth: 1, borderColor: UI_COLORS.border }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 12 }}>
          <Text style={{ fontSize: 16 }}>🏡</Text>
          <Text style={{ color: '#FFF', fontSize: 14, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.5 }}>
            Affordability Evaluation Checklist
          </Text>
        </View>

        <Text style={{ color: UI_COLORS.textSecondary, fontSize: 12, marginBottom: 14 }}>
          Based on the selected property tier (<Text style={{ color: '#FFF', fontWeight: '600' }}>{selectedProperty.type}</Text>), here is your target financial baseline for approval:
        </Text>

        <View style={{ gap: 10, marginBottom: 16 }}>
          <View style={{ backgroundColor: UI_COLORS.innerBg, padding: 12, borderRadius: 10, borderWidth: 1, borderColor: UI_COLORS.border }}>
            <Text style={{ color: UI_COLORS.textSecondary, fontSize: 11 }}>Recommended Combined Household Income:</Text>
            <Text style={{ color: UI_COLORS.emerald, fontSize: 18, fontWeight: '800', marginTop: 2 }}>
              ₱{calculateRequiredIncome(selectedProperty.monthlyAmortization).toLocaleString()} <Text style={{ fontSize: 11, color: UI_COLORS.textSecondary, fontWeight: 'normal' }}>/ mo</Text>
            </Text>
            <Text style={{ color: UI_COLORS.textSecondary, fontSize: 10, marginTop: 4, fontStyle: 'italic' }}>
              * Calculated using a safe 35% maximum DTI framework rule.
            </Text>
          </View>

          <View style={{ backgroundColor: UI_COLORS.innerBg, padding: 12, borderRadius: 10, borderWidth: 1, borderColor: UI_COLORS.border }}>
            <Text style={{ color: UI_COLORS.textSecondary, fontSize: 11 }}>Target Safe Cash Savings Buffer:</Text>
            <Text style={{ color: '#FFF', fontSize: 14, fontWeight: '700', marginTop: 2 }}>
              ₱{(selectedProperty.requiredDP * 1.1).toLocaleString()}
            </Text>
            <Text style={{ color: UI_COLORS.textSecondary, fontSize: 10, marginTop: 2 }}>
              Includes the 20% downpayment plus 10% estimation to secure documentary stamps, registration fees, and setup charges.
            </Text>
          </View>
        </View>

        <Pressable 
          onPress={handleCTAAction} 
          style={({ pressed }) => ({
            backgroundColor: UI_COLORS.orange,
            borderRadius: 12,
            paddingVertical: 14,
            alignItems: 'center',
            justifyContent: 'center',
            opacity: pressed ? 0.9 : 1
          })}
        >
          <Text style={{ color: '#FFF', fontSize: 14, fontWeight: '700' }}>
            Check Pag-IBIG Loan Pre-Eligibility →
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}
