import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable, Linking, Image, useWindowDimensions } from 'react-native';
import { useRouter } from 'expo-router';

const THEME = {
  bg: '#0B0F19',
  surface: '#151D30',
  surfaceCard: '#1E2942',
  innerBg: '#0D1322',
  border: '#2A3754',
  accent: '#EA580C',     // Premium Real Estate Orange
  emerald: '#10B981',    // Success Green
  blue: '#3B82F6',       // Institutional Blue
  textMuted: '#64748B',
  textSecondary: '#94A3B8',
  textLight: '#F8FAFC'
};

const LOCATIONS = ['All', 'Metro Manila', 'Suburban South', 'Central Luzon'];
const TERMS = ['15 Yrs', '20 Yrs', '25 Yrs', '30 Yrs'];

const PROPERTY_DATA = [
  {
    id: 'manila-condo',
    title: 'Premium High-Rise Studio',
    developer: 'SMDC / Megaworld Tier',
    location: 'Metro Manila',
    subLocation: 'BGC / Makati / Ortigas Core',
    price: 6500000,
    icon: '🏢',
    img: 'https://images.unbxd.io/autocars-production/1625738100_condo-exterior.png',
    portalUrl: 'https://www.property24.com.ph',
    // Dynamic calculations based on 20% DP standard bank/Pag-IBIG rules
    amortization: {
      '15 Yrs': { monthly: 49500, dp: 1300000 },
      '20 Yrs': { monthly: 42300, dp: 1300000 },
      '25 Yrs': { monthly: 38200, dp: 1300000 },
      '30 Yrs': { monthly: 33000, dp: 1300000 }
    }
  },
  {
    id: 'cavite-house',
    title: 'Modern 2-Storey Townhouse',
    developer: 'Ayala Land / Avida Tier',
    location: 'Suburban South',
    subLocation: 'Cavite / Laguna Growth Corridor',
    price: 3500000,
    icon: '🏡',
    img: 'https://images.unbxd.io/autocars-production/1625738200_townhouse-exterior.png',
    portalUrl: 'https://www.dotproperty.com.ph',
    amortization: {
      '15 Yrs': { monthly: 26800, dp: 700000 },
      '20 Yrs': { monthly: 22800, dp: 700000 },
      '25 Yrs': { monthly: 20600, dp: 700000 },
      '30 Yrs': { monthly: 18000, dp: 700000 }
    }
  },
  {
    id: 'bulacan-rowhouse',
    title: 'Economic Starter Home',
    developer: 'Decentralized Core Extension',
    location: 'Central Luzon',
    subLocation: 'Bulacan / Pampanga Transit Hubs',
    price: 1800000,
    icon: '🏠',
    img: 'https://images.unbxd.io/autocars-production/1625738300_rowhouse-exterior.png',
    portalUrl: 'https://www.pagibigfundservices.com',
    amortization: {
      '15 Yrs': { monthly: 14100, dp: 360000 },
      '20 Yrs': { monthly: 12000, dp: 360000 },
      '25 Yrs': { monthly: 10800, dp: 360000 },
      '30 Yrs': { monthly: 9500, dp: 360000 }
    }
  }
];

export default function RealEstateScreen() {
  const router = useRouter();
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [selectedTerm, setSelectedTerm] = useState('30 Yrs'); // Default to standard Pag-IBIG long term
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  const filteredProperties = PROPERTY_DATA.filter(p => 
    selectedLocation === 'All' || p.location === selectedLocation
  );

  return (
    <ScrollView style={{ flex: 1, backgroundColor: THEME.bg }} contentContainerStyle={{ paddingBottom: 40 }}>
      
      {/* PREMIUM HEADER HERO */}
      <View style={{ paddingHorizontal: 20, paddingTop: 50, paddingBottom: 24 }}>
        <Pressable onPress={() => router.replace('/')} style={{ marginBottom: 14 }}>
          <Text style={{ color: THEME.accent, fontWeight: '600', fontSize: 14 }}>← Back to Dashboard</Text>
        </Pressable>
        <Text style={{ fontSize: 28, fontWeight: '800', color: THEME.textLight, letterSpacing: -0.5 }}>Real Estate Matrix</Text>
        <Text style={{ fontSize: 14, color: THEME.textSecondary, marginTop: 4 }}>Benchmark property values alongside localized Pag-IBIG loan models.</Text>
      </View>

      {/* FILTER SEGMENT BLOCKS */}
      <View style={{ paddingHorizontal: 20, marginBottom: 24, gap: 16 }}>
        {/* PAYMENT REPAYMENT TERM SELECTOR */}
        <View>
          <Text style={{ color: THEME.textMuted, fontSize: 11, fontWeight: '700', textTransform: 'uppercase', marginBottom: 8, letterSpacing: 0.5 }}>Select Financing Amortization Period</Text>
          <View style={{ flexDirection: 'row', backgroundColor: THEME.surface, borderRadius: 12, padding: 4, borderWidth: 1, borderColor: THEME.border }}>
            {TERMS.map(t => (
              <Pressable 
                key={t} 
                onPress={() => setSelectedTerm(t)} 
                style={{ flex: 1, paddingVertical: 10, borderRadius: 8, backgroundColor: selectedTerm === t ? THEME.accent : 'transparent', alignItems: 'center' }}
              >
                <Text style={{ color: selectedTerm === t ? '#FFF' : THEME.textSecondary, fontSize: 13, fontWeight: '700' }}>{t}</Text>
              </Pressable>
            ))}
          </View>
        </View>

        {/* REGIONAL LOCATION TIER SCROLLER */}
        <View>
          <Text style={{ color: THEME.textMuted, fontSize: 11, fontWeight: '700', textTransform: 'uppercase', marginBottom: 8, letterSpacing: 0.5 }}>Filter Region Territory</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8 }}>
            {LOCATIONS.map(loc => {
              const isActive = selectedLocation === loc;
              return (
                <Pressable 
                  key={loc} 
                  onPress={() => setSelectedLocation(loc)} 
                  style={{ paddingHorizontal: 16, paddingVertical: 8, borderRadius: 24, backgroundColor: isActive ? THEME.textLight : THEME.surface, borderWidth: 1, borderColor: isActive ? THEME.textLight : THEME.border }}
                >
                  <Text style={{ color: isActive ? THEME.bg : THEME.textLight, fontSize: 12, fontWeight: '600' }}>{loc}</Text>
                </Pressable>
              );
            })}
          </ScrollView>
        </View>
      </View>

      {/* INVESTMENT CEILING BENCHMARK BANNER */}
      <View style={{ marginHorizontal: 20, backgroundColor: THEME.surface, borderRadius: 16, padding: 14, borderWidth: 1, borderColor: THEME.border, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <View>
          <Text style={{ color: THEME.textMuted, fontSize: 10, fontWeight: '700', textTransform: 'uppercase' }}>Maximum Processing Ceiling</Text>
          <Text style={{ color: THEME.textLight, fontSize: 13, fontWeight: '500', marginTop: 2 }}>Locked Matrix Filter Scale</Text>
        </View>
        <Text style={{ color: THEME.accent, fontSize: 15, fontWeight: '800' }}>₱100,000 / MO MAX</Text>
      </View>

      {/* PROPERTY DATA ENGINE MATRIX */}
      <View style={{ paddingHorizontal: 20, gap: 16 }}>
        {filteredProperties.map((property) => {
          const isExpanded = expandedCard === property.id;
          const rates = property.amortization[selectedTerm] || property.amortization['30 Yrs'];
          
          // Institutional guidelines rule out monthly payments exceeding 35% of overall household income
          const requiredGrossIncome = Math.round(rates.monthly / 0.35);

          return (
            <Pressable 
              key={property.id}
              onPress={() => setExpandedCard(isExpanded ? null : property.id)}
              style={{ backgroundColor: THEME.surface, borderRadius: 20, borderWidth: 1, borderColor: isExpanded ? THEME.accent : THEME.border, overflow: 'hidden', padding: 16 }}
            >
              {/* LAYOUT TEXT CARD TOPPER */}
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <View style={{ flex: 1, marginRight: 8 }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
                    <Text style={{ fontSize: 13 }}>{property.icon}</Text>
                    <View style={{ backgroundColor: THEME.surfaceCard, paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6, borderWidth: 1, borderColor: THEME.border }}>
                      <Text style={{ color: THEME.textLight, fontSize: 10, fontWeight: '800', letterSpacing: 0.3 }}>{property.location.toUpperCase()}</Text>
                    </View>
                    <Text style={{ color: THEME.textSecondary, fontSize: 11 }}>• {property.developer}</Text>
                  </View>
                  <Text style={{ color: THEME.textLight, fontSize: 19, fontWeight: '700', marginTop: 8 }}>{property.title}</Text>
                  <Text style={{ color: THEME.textMuted, fontSize: 12, marginTop: 2 }}>{property.subLocation}</Text>
                </View>
                <View style={{ alignItems: 'flex-end' }}>
                  <Text style={{ color: THEME.accent, fontSize: 18, fontWeight: '800' }}>₱{(property.price / 1000000).toFixed(1)}M</Text>
                  <Text style={{ color: THEME.textMuted, fontSize: 10, marginTop: 2 }}>Est. Value</Text>
                </View>
              </View>

              {/* HIGH AVAILABILITY REAL ARCHITECTURAL RENDER IMAGE */}
              {isExpanded && property.img && (
                <Image 
                  source={{ uri: property.img }}
                  style={{ width: '100%', height: 160, marginTop: 14, borderRadius: 12, backgroundColor: THEME.innerBg }}
                  resizeMode="cover"
                />
              )}

              {/* DYNAMIC METRIC CHECKLIST TILES */}
              <View style={{ flexDirection: 'row', gap: 10, marginTop: 16 }}>
                {/* Amortization Layout Block */}
                <View style={{ flex: 1, backgroundColor: THEME.innerBg, padding: 12, borderRadius: 12, borderWidth: 1, borderColor: THEME.border }}>
                  <Text style={{ color: THEME.accent, fontSize: 10, fontWeight: '700', textTransform: 'uppercase' }}>🏠 Amortization ({selectedTerm})</Text>
                  <Text style={{ color: THEME.emerald, fontSize: 16, fontWeight: '800', marginVertical: 4 }}>
                    ₱{rates.monthly.toLocaleString()}<Text style={{ fontSize: 10, color: THEME.textSecondary, fontWeight: '400' }}>/mo</Text>
                  </Text>
                  <Text style={{ color: THEME.textSecondary, fontSize: 9 }}>Equity DP: ₱{rates.dp.toLocaleString()}</Text>
                </View>

                {/* Qualification Income Layout Block */}
                <View style={{ flex: 1, backgroundColor: THEME.innerBg, padding: 12, borderRadius: 12, borderWidth: 1, borderColor: THEME.border }}>
                  <Text style={{ color: THEME.blue, fontSize: 10, fontWeight: '700', textTransform: 'uppercase' }}>📊 Min Gross Income</Text>
                  <Text style={{ color: THEME.textLight, fontSize: 16, fontWeight: '800', marginVertical: 4 }}>
                    ₱{requiredGrossIncome.toLocaleString()}<Text style={{ fontSize: 10, color: THEME.textSecondary, fontWeight: '400' }}>/mo</Text>
                  </Text>
                  <Text style={{ color: THEME.textSecondary, fontSize: 9 }}>Based on 35% Max DTI</Text>
                </View>
              </View>

              {/* RESPONSIVE CALL-TO-ACTION DRIVING DIRECT TO SPECIFIED PORTALS */}
              {isExpanded && (
                <Pressable 
                  onPress={() => Linking.openURL(property.portalUrl).catch(() => {})}
                  style={({ pressed }) => ({
                    backgroundColor: THEME.accent,
                    borderRadius: 12,
                    paddingVertical: 14,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: 14,
                    opacity: pressed ? 0.85 : 1,
                    width: '100%'
                  })}
                >
                  <Text style={{ color: '#FFF', fontSize: 13, fontWeight: '700', letterSpacing: 0.3 }}>
                    Verify Loan Pre-Eligibility & Inventory →
                  </Text>
                </Pressable>
              )}
            </Pressable>
          );
        })}
      </View>
    </ScrollView>
  );
}
