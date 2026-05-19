import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable, useWindowDimensions } from 'react-native';
import { useRouter } from 'expo-router';

const THEME = {
  bg: '#0B0F19',
  surface: '#151D30',
  surfaceCard: '#1E2942',
  innerBg: '#0D1322',
  border: '#2A3754',
  textLight: '#F8FAFC',
  textSecondary: '#94A3B8',
  textMuted: '#64748B',
  
  // App Feature Visual Identity System
  hysBlue: '#0284C7',
  gadgetsGreen: '#10B981',
  autoPurple: '#7C3AED',
  realEstateOrange: '#EA580C',
  lendingGold: '#EAB308'
};

const INCOME_TIERS = [45000, 100000, 500000, 1000000];

export default function DashboardScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const [householdIncome, setHouseholdIncome] = useState(1000000); // Defaults to highest tier standard

  // Dynamic calculations for grid items
  const cardWidth = (width - 54) / 2;

  // Maximum benchmark cap to measure line bar fill percentage
  const maxBenchmark = 1000000;
  const progressPercentage = Math.min((householdIncome / maxBenchmark) * 100, 100);

  const tools = [
    {
      id: 'hys',
      title: 'High-Yield Savings',
      desc: 'Yield Comparator',
      icon: '💼',
      color: THEME.hysBlue,
      route: '/banks' // Pointing directly to your newly polished banks.tsx
    },
    {
      id: 'gadgets',
      title: 'Smart Gadgets',
      desc: 'Budget Matcher',
      icon: '📱',
      color: THEME.gadgetsGreen,
      route: '/gadgets'
    },
    {
      id: 'auto',
      title: 'Auto Loans',
      desc: 'True Net Cost',
      icon: '🚗',
      color: THEME.autoPurple,
      route: '/auto'
    },
    {
      id: 'realestate',
      title: 'Real Estate',
      desc: 'Affordability Index',
      icon: '🏠',
      color: THEME.realEstateOrange,
      route: '/realestate'
    }
  ];

  return (
    <ScrollView style={{ flex: 1, backgroundColor: THEME.bg }} contentContainerStyle={{ paddingBottom: 40 }}>
      
      {/* HEADER SECTION */}
      <View style={{ paddingHorizontal: 20, paddingTop: 50, paddingBottom: 16, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
          <Text style={{ fontSize: 24, fontWeight: '900', color: THEME.textLight, letterSpacing: -0.5 }}>SAVVYMAX</Text>
          <View style={{ backgroundColor: THEME.gadgetsGreen, paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 }}>
            <Text style={{ color: THEME.bg, fontSize: 10, fontWeight: '800' }}>PH</Text>
          </View>
        </View>
        <Text style={{ fontSize: 12, color: THEME.textMuted, fontWeight: '600' }}>Free Financial Utility</Text>
      </View>

      {/* PREMIUM INTERACTIVE INCOME LAYER WITH LINE BAR STYLE */}
      <View style={{ marginHorizontal: 20, backgroundColor: THEME.surface, borderRadius: 24, padding: 20, borderWidth: 1, borderColor: THEME.border, marginBottom: 28 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
          <Text style={{ fontSize: 14 }}>💰</Text>
          <Text style={{ color: THEME.textSecondary, fontSize: 13, fontWeight: '600' }}>Monthly Household Income</Text>
        </View>

        {/* LARGE INTUITIVE VALUE ACCENT */}
        <Text style={{ color: THEME.gadgetsGreen, fontSize: 34, fontWeight: '800', marginTop: 8, letterSpacing: -0.5 }}>
          ₱{householdIncome.toLocaleString()}
        </Text>

        <Text style={{ color: THEME.textMuted, fontSize: 11, marginTop: 2, marginBottom: 16 }}>Select profile base target tier:</Text>

        {/* FLEXIBLE BUTTON GRID SELECTOR */}
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 20 }}>
          {INCOME_TIERS.map((tier) => {
            const isActive = householdIncome === tier;
            return (
              <Pressable
                key={tier}
                onPress={() => setHouseholdIncome(tier)}
                style={{
                  width: '48%', // Splitting selectors perfectly into symmetrical rows
                  backgroundColor: isActive ? THEME.gadgetsGreen : THEME.innerBg,
                  paddingVertical: 14,
                  borderRadius: 12,
                  alignItems: 'center',
                  borderWidth: 1,
                  borderColor: isActive ? THEME.gadgetsGreen : THEME.border
                }}
              >
                <Text style={{ color: isActive ? THEME.bg : THEME.textLight, fontSize: 14, fontWeight: '700' }}>
                  ₱{tier.toLocaleString()}
                </Text>
              </Pressable>
            );
          })}
        </View>

        {/* METRIC SEGMENT: PREMIUM TRACK LINE BAR STYLE */}
        <View style={{ gap: 6 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text style={{ color: THEME.textMuted, fontSize: 10, fontWeight: '700', textTransform: 'uppercase' }}>Allocation Scaling Level</Text>
            <Text style={{ color: THEME.gadgetsGreen, fontSize: 11, fontWeight: '700' }}>{Math.round(progressPercentage)}% Capacity</Text>
          </View>
          
          {/* THE METICULOUS SLIDER TRACK LINE BAR */}
          <View style={{ height: 8, backgroundColor: THEME.innerBg, borderRadius: 4, width: '100%', overflow: 'hidden', borderWidth: 1, borderColor: THEME.border }}>
            <View 
              style={{ 
                width: `${progressPercentage}%`, 
                height: '100%', 
                backgroundColor: THEME.gadgetsGreen,
                borderRadius: 4
              }} 
            />
          </View>
        </View>
      </View>

      {/* CALCULATOR TILES SECTION */}
      <View style={{ paddingHorizontal: 20, marginBottom: 14 }}>
        <Text style={{ color: THEME.textLight, fontSize: 14, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.5 }}>
          Financial Calculators
        </Text>
      </View>

      {/* RESPONSIVE GRID WRAPPER */}
      <View style={{ paddingHorizontal: 20, flexDirection: 'row', flexWrap: 'wrap', gap: 14, justifyContent: 'space-between' }}>
        {tools.map((item) => (
          <View 
            key={item.id} 
            style={{ 
              width: cardWidth, 
              backgroundColor: THEME.surface, 
              borderRadius: 20, 
              padding: 16, 
              borderWidth: 1, 
              borderColor: THEME.border,
              justifyContent: 'space-between',
              minHeight: 184 
            }}
          >
            <View>
              {/* BRANDED FLOATING ICON EMBED */}
              <View style={{ width: 44, height: 44, borderRadius: 12, backgroundColor: THEME.innerBg, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: THEME.border, marginBottom: 14 }}>
                <Text style={{ fontSize: 18 }}>{item.icon}</Text>
              </View>
              <Text style={{ color: THEME.textLight, fontSize: 15, fontWeight: '700' }} numberOfLines={1}>{item.title}</Text>
              <Text style={{ color: THEME.textSecondary, fontSize: 12, marginTop: 3 }} numberOfLines={1}>{item.desc}</Text>
            </View>

            <Pressable
              onPress={() => router.push(item.route)}
              style={({ pressed }) => ({
                backgroundColor: item.color,
                borderRadius: 10,
                paddingVertical: 10,
                alignItems: 'center',
                marginTop: 14,
                opacity: pressed ? 0.85 : 1
              })}
            >
              <Text style={{ color: '#FFF', fontSize: 12, fontWeight: '700' }}>Open Tools</Text>
            </Pressable>
          </View>
        ))}

        {/* FULL-WIDTH GRID HIGHLIGHT FOR WIDE SCALE MICRO-LENDING ACCORDION */}
        <View 
          style={{ 
            width: '100%', 
            backgroundColor: THEME.surface, 
            borderRadius: 20, 
            padding: 16, 
            borderWidth: 1, 
            borderColor: THEME.border,
            marginTop: 4
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 14, marginBottom: 16 }}>
            <View style={{ width: 44, height: 44, borderRadius: 12, backgroundColor: THEME.innerBg, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: THEME.border }}>
              <Text style={{ fontSize: 18 }}>🤝</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ color: THEME.textLight, fontSize: 16, fontWeight: '700' }}>Micro-Lending Matrix</Text>
              <Text style={{ color: THEME.textSecondary, fontSize: 12, marginTop: 2 }}>Sari-Sari / Personal Emergency Credit</Text>
            </View>
          </View>

          <Pressable
            onPress={() => router.push('/microlending')} // Correctly routing to microlending.tsx file
            style={({ pressed }) => ({
              backgroundColor: THEME.lendingGold,
              borderRadius: 10,
              paddingVertical: 12,
              alignItems: 'center',
              opacity: pressed ? 0.85 : 1
            })}
          >
            <Text style={{ color: THEME.bg, fontSize: 13, fontWeight: '700' }}>Open Specialized Calculator</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
}
