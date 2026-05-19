import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable, Linking, Image } from 'react-native';
import { useRouter } from 'expo-router';

const UI_COLORS = {
  bg: '#0F172A', surface: '#1E293B', innerBg: '#111827',
  border: '#334155', textPrimary: '#F8FAFC', textSecondary: '#94A3B8',
  purple: '#7C3AED', emerald: '#10B981', orange: '#EA580C', blue: '#0284C7'
};

const GADGET_DATA = [
  // --- PREMIUM TIERS (₱50k to ₱100k) ---
  {
    brand: 'Apple',
    model: 'iPhone 15 Pro Max (256GB)',
    price: 84990,
    tier: 'Premium Tier',
    subcat: 'Flagship iOS System',
    icon: '📱',
    img: 'https://images.unbxd.io/autocars-production/1625735100_iphone15-exterior.png',
    url: 'https://www.apple.com/ph/iphone-15-pro/'
  },
  {
    brand: 'Samsung',
    model: 'Galaxy S24 Ultra (256GB)',
    price: 84990,
    tier: 'Premium Tier',
    subcat: 'Premium Android AI',
    icon: '📱',
    img: 'https://images.unbxd.io/autocars-production/1625735200_s24ultra-exterior.png',
    url: 'https://www.samsung.com/ph/smartphones/galaxy-s24-ultra/'
  },
  {
    brand: 'Apple',
    model: 'MacBook Air M3 (256GB)',
    price: 69990,
    tier: 'Premium Tier',
    subcat: 'Productivity Ultraportable',
    icon: '💻',
    img: 'https://images.unbxd.io/autocars-production/1625735300_macbookm3-exterior.png',
    url: 'https://www.apple.com/ph/macbook-air/'
  },
  {
    brand: 'Asus',
    model: 'ROG Ally X (Handheld Gaming)',
    price: 56995,
    tier: 'Premium Tier',
    subcat: 'Extreme Portable PC',
    icon: '🎮',
    img: 'https://images.unbxd.io/autocars-production/1625737100_rogally-exterior.png',
    url: 'https://rog.asus.com/ph/'
  },

  // --- UPPER MID-TIERS (₱20k to ₱49k) ---
  {
    brand: 'Huawei',
    model: 'MateBook D 14 (2024)',
    price: 35999,
    tier: 'Upper Mid-Tier',
    subcat: 'Slim Office Metal Notebook',
    icon: '💻',
    img: 'https://images.unbxd.io/autocars-production/1625736300_matebook-exterior.png',
    url: 'https://consumer.huawei.com/ph/laptops/'
  },
  {
    brand: 'Vivo',
    model: 'V30 Pro 5G',
    price: 34999,
    tier: 'Upper Mid-Tier',
    subcat: 'Zeiss Optics Flagship',
    icon: '📱',
    img: 'https://images.unbxd.io/autocars-production/1625737300_v30pro-exterior.png',
    url: 'https://www.vivo.com/ph/'
  },
  {
    brand: 'OPPO',
    model: 'Reno11 Pro 5G',
    price: 31999,
    tier: 'Upper Mid-Tier',
    subcat: 'Portrait Camera Specialist',
    icon: '📱',
    img: 'https://images.unbxd.io/autocars-production/1625737200_reno11-exterior.png',
    url: 'https://www.oppo.com/ph/'
  },

  // --- BUDGET COMPACT / SULIT MID-RANGE (Below ₱20k) ---
  {
    brand: 'Xiaomi',
    model: 'POCO X6 Pro 5G',
    price: 16999,
    tier: 'Sulit Mid-Range',
    subcat: 'Ultimate Budget Performance',
    icon: '📱',
    img: 'https://images.unbxd.io/autocars-production/1625737400_pocox6-exterior.png',
    url: 'https://www.mi.com/ph/'
  },
  {
    brand: 'realme',
    model: 'realme 12 5G',
    price: 14999,
    tier: 'Sulit Mid-Range',
    subcat: 'Value Stream Design King',
    icon: '📱',
    img: 'https://images.unbxd.io/autocars-production/1625736200_realme12-exterior.png',
    url: 'https://www.realme.com/ph/'
  },
  {
    brand: 'Infinix',
    model: 'Infinix XPAD LTE',
    price: 9499,
    tier: 'Sulit Mid-Range',
    subcat: 'Entry Entertainment Slate',
    icon: '平板',
    img: 'https://images.unbxd.io/autocars-production/1625736400_xpad-exterior.png',
    url: 'https://www.infinixmobility.com/ph/'
  }
];

export default function GadgetScreen() {
  const router = useRouter();
  const [activeTier, setActiveTier] = useState('All');
  const [selectedTerm, setSelectedTerm] = useState<number>(12);
  const [expandedCard, setExpandedCard] = useState<number | null>(null);

  const tiers = ['All', 'Premium Tier', 'Upper Mid-Tier', 'Sulit Mid-Range'];
  const terms = [3, 6, 12, 24];

  const calculateInstallment = (totalPrice: number, months: number) => {
    const dynamicProcessingRate = months === 24 ? 0.025 : 0.0;
    const totalWithInterest = totalPrice * (1 + dynamicProcessingRate);
    return Math.round(totalWithInterest / months);
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: UI_COLORS.bg }} contentContainerStyle={{ padding: 20, paddingTop: 40 }}>
      <Pressable onPress={() => router.replace('/')} style={{ marginBottom: 16 }}>
        <Text style={{ color: UI_COLORS.purple, fontWeight: '600' }}>← Dashboard</Text>
      </Pressable>
      
      <Text style={{ fontSize: 24, fontWeight: '700', color: '#FFF', marginBottom: 4 }}>Smart Gadgets Matcher</Text>
      <Text style={{ fontSize: 13, color: UI_COLORS.textSecondary, marginBottom: 20 }}>Compare retail installment models for devices under ₱100k.</Text>

      {/* BUDGET CEILING LIMIT HEADER */}
      <View style={{ backgroundColor: UI_COLORS.innerBg, padding: 12, borderRadius: 12, marginBottom: 20, borderLeftWidth: 4, borderLeftColor: UI_COLORS.orange, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Text style={{ color: '#FFF', fontSize: 12, fontWeight: '700', textTransform: 'uppercase' }}>🎯 Active Matrix Budget Ceiling:</Text>
        <Text style={{ color: UI_COLORS.orange, fontSize: 14, fontWeight: '800' }}>₱100,000 MAX</Text>
      </View>

      {/* MATRICES TERM BAR */}
      <Text style={{ color: UI_COLORS.textSecondary, fontSize: 11, fontWeight: '700', textTransform: 'uppercase', marginBottom: 8 }}>Select Credit Card Installment Term:</Text>
      <View style={{ flexDirection: 'row', gap: 6, marginBottom: 20 }}>
        {terms.map(t => (
          <Pressable key={t} onPress={() => setSelectedTerm(t)} style={{ flex: 1, paddingVertical: 10, borderRadius: 10, backgroundColor: selectedTerm === t ? UI_COLORS.emerald : UI_COLORS.surface, alignItems: 'center', borderWidth: 1, borderColor: UI_COLORS.border }}>
            <Text style={{ color: '#FFF', fontSize: 12, fontWeight: '700' }}>{t} Mos</Text>
          </Pressable>
        ))}
      </View>

      {/* CLASSIFICATION HORIZONTAL SEGMENTS */}
      <Text style={{ color: UI_COLORS.textSecondary, fontSize: 11, fontWeight: '700', textTransform: 'uppercase', marginBottom: 8 }}>Filter Brand Classification Tier:</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 20, maxHeight: 45 }}>
        {tiers.map(t => (
          <Pressable key={t} onPress={() => setActiveTier(t)} style={{ paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, backgroundColor: activeTier === t ? UI_COLORS.purple : UI_COLORS.surface, marginRight: 8, borderWidth: 1, borderColor: UI_COLORS.border }}>
            <Text style={{ color: '#FFF', fontSize: 12, fontWeight: '600' }}>{t}</Text>
          </Pressable>
        ))}
      </ScrollView>

      {/* PRODUCT LIST RENDER MATRIX */}
      <View style={{ gap: 14 }}>
        {GADGET_DATA.filter(g => activeTier === 'All' || g.tier === activeTier).map((item, index) => {
          const isExpanded = expandedCard === index;
          const cardMonthly = calculateInstallment(item.price, selectedTerm);
          const fintechMonthly = Math.round((item.price * 0.8) * 1.045 / selectedTerm);

          return (
            <Pressable 
              key={index} 
              onPress={() => setExpandedCard(isExpanded ? null : index)}
              style={{ backgroundColor: UI_COLORS.surface, padding: 16, borderRadius: 16, borderWidth: 1, borderColor: isExpanded ? UI_COLORS.purple : UI_COLORS.border }}
            >
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <View style={{ flex: 1 }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
                    <Text style={{ fontSize: 14 }}>{item.icon}</Text>
                    <View style={{ backgroundColor: UI_COLORS.purple, paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 }}>
                      <Text style={{ color: '#FFF', fontSize: 9, fontWeight: '800' }}>{item.brand.toUpperCase()}</Text>
                    </View>
                    <View style={{ backgroundColor: UI_COLORS.innerBg, paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4, borderWidth: 1, borderColor: UI_COLORS.border }}>
                      <Text style={{ color: UI_COLORS.textSecondary, fontSize: 9, fontWeight: '600' }}>{item.subcat}</Text>
                    </View>
                  </View>
                  <Text style={{ color: '#FFF', fontSize: 16, fontWeight: '700', marginTop: 8 }}>{item.model}</Text>
                </View>
                <Text style={{ color: UI_COLORS.purple, fontSize: 15, fontWeight: '800' }}>₱{item.price.toLocaleString()}</Text>
              </View>

              {/* RENDER DYNAMIC IMAGE COMPONENT */}
              {isExpanded && item.img && (
                <Image 
                  source={{ uri: item.img }} 
                  style={{ width: '100%', height: 160, borderRadius: 12, marginTop: 12, backgroundColor: UI_COLORS.innerBg }} 
                  resizeMode="contain"
                />
              )}

              <View style={{ flexDirection: 'row', gap: 8, marginTop: 14 }}>
                <View style={{ flex: 1, backgroundColor: UI_COLORS.innerBg, padding: 10, borderRadius: 10, borderWidth: 1, borderColor: UI_COLORS.border }}>
                  <Text style={{ color: UI_COLORS.purple, fontSize: 10, fontWeight: '700' }}>💳 Card Plan ({selectedTerm}m)</Text>
                  <Text style={{ color: UI_COLORS.emerald, fontSize: 15, fontWeight: '800', marginVertical: 3 }}>₱{cardMonthly.toLocaleString()}<Text style={{ fontSize: 10, color: UI_COLORS.textSecondary }}>/mo</Text></Text>
                  <Text style={{ color: UI_COLORS.textSecondary, fontSize: 9 }}>Interest: 0% Promo</Text>
                </View>

                <View style={{ flex: 1, backgroundColor: UI_COLORS.innerBg, padding: 10, borderRadius: 10, borderWidth: 1, borderColor: UI_COLORS.border }}>
                  <Text style={{ color: UI_COLORS.orange, fontSize: 10, fontWeight: '700' }}>📱 Fintech Est. ({selectedTerm}m)</Text>
                  <Text style={{ color: UI_COLORS.emerald, fontSize: 15, fontWeight: '800', marginVertical: 3 }}>₱{fintechMonthly.toLocaleString()}<Text style={{ fontSize: 10, color: UI_COLORS.textSecondary }}>/mo</Text></Text>
                  <Text style={{ color: UI_COLORS.textSecondary, fontSize: 9 }}>DP: ~20% Required</Text>
                </View>
              </View>

              {isExpanded && (
                <Pressable onPress={() => Linking.openURL(item.url).catch(() => {})} style={{ backgroundColor: UI_COLORS.purple, borderRadius: 10, paddingVertical: 11, alignItems: 'center', marginTop: 12 }}>
                  <Text style={{ color: '#FFF', fontSize: 12, fontWeight: '700' }}>View Retail Matrix Data →</Text>
                </Pressable>
              )}
            </Pressable>
          );
        })}
      </View>
    </ScrollView>
  );
}
