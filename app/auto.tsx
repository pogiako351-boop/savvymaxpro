import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable, Linking, Image } from 'react-native';
import { useRouter } from 'expo-router';

const UI_COLORS = {
  bg: '#0F172A', surface: '#1E293B', innerBg: '#111827',
  border: '#334155', textPrimary: '#F8FAFC', textSecondary: '#94A3B8',
  purple: '#7C3AED', emerald: '#10B981', orange: '#EA580C', blue: '#0284C7'
};

const VEHICLE_DATA = [
  // SEDANS
  { 
    brand: 'Toyota', 
    model: 'Vios 1.3 XLE CVT', 
    price: 902000, 
    category: 'Sedan', 
    subcat: 'Subcompact Sedan', 
    icon: '🚗', 
    img: 'https://bayanauto.com/wp-content/uploads/2021/11/vios.jpg', 
    url: 'https://toyota.com.ph/vios' 
  },
  { 
    brand: 'Honda', 
    model: 'City 1.5 V SENSING', 
    price: 1028000, 
    category: 'Sedan', 
    subcat: 'Subcompact Premium', 
    icon: '🚗', 
    img: 'https://bayanauto.com/wp-content/uploads/2021/11/city.jpg', 
    url: 'https://hondaphil.com/model/city' 
  },
  { 
    brand: 'Nissan', 
    model: 'Almera 1.0 VE Turbo', 
    price: 1059000, 
    category: 'Sedan', 
    subcat: 'Turbo Compact', 
    icon: '🚗', 
    img: 'https://bayanauto.com/wp-content/uploads/2021/11/almera.jpg', 
    url: 'https://www.nissan.ph/vehicles/new/almera.html' 
  },
  
  // MIDSIZE SUVs
  { 
    brand: 'Toyota', 
    model: 'Fortuner 2.4 V Diesel', 
    price: 1994000, 
    category: 'Midsize SUV', 
    subcat: 'Midsize Body-on-Frame SUV', 
    icon: '🚙', 
    img: 'https://bayanauto.com/wp-content/uploads/2021/11/fortuner.jpg', 
    url: 'https://toyota.com.ph/fortuner' 
  },
  { 
    brand: 'Mitsubishi', 
    model: 'Montero Sport GLS', 
    price: 1828000, 
    category: 'Midsize SUV', 
    subcat: 'Midsize Tech SUV', 
    icon: '🚙', 
    img: 'https://bayanauto.com/wp-content/uploads/2021/11/montero.jpg', 
    url: 'https://www.mitsubishi-motors.com.ph/cars/montero-sport' 
  },
  { 
    brand: 'Ford', 
    model: 'Everest Trend 2.0', 
    price: 1829000, 
    category: 'Midsize SUV', 
    subcat: 'Next-Gen Comfort', 
    icon: '🚙', 
    img: 'https://bayanauto.com/wp-content/uploads/2021/11/everest.jpg', 
    url: 'https://www.ford.com.ph/suvs/everest/' 
  },

  // PICK-UPS
  { 
    brand: 'Ford', 
    model: 'Ranger Wildtrak 4x2', 
    price: 1604000, 
    category: 'Pick-up', 
    subcat: 'Sleek Lifestyle Truck', 
    icon: '🛻', 
    img: 'https://bayanauto.com/wp-content/uploads/2021/11/ranger.jpg', 
    url: 'https://www.ford.com.ph/trucks/ranger/' 
  },
  { 
    brand: 'Toyota', 
    model: 'Hilux 2.4 G 4x2 AT', 
    price: 1390000, 
    category: 'Pick-up', 
    subcat: 'Utility Workhorse', 
    icon: '🛻', 
    img: 'https://bayanauto.com/wp-content/uploads/2021/11/hilux.jpg', 
    url: 'https://toyota.com.ph/hilux' 
  },

  // COMPACT MPVs & VANS
  { 
    brand: 'Mitsubishi', 
    model: 'Xpander GLS AT', 
    price: 1216000, 
    category: 'SUV / MPV', 
    subcat: 'Compact MPV Crossover', 
    icon: '🚘', 
    img: 'https://bayanauto.com/wp-content/uploads/2021/11/xpander.jpg', 
    url: 'https://www.mitsubishi-motors.com.ph/cars/xpander' 
  },
  { 
    brand: 'Toyota', 
    model: 'Hiace Commuter Deluxe', 
    price: 1899000, 
    category: 'Vans', 
    subcat: 'Passenger Transit', 
    icon: '🚐', 
    img: 'https://bayanauto.com/wp-content/uploads/2021/11/hiace.jpg', 
    url: 'https://toyota.com.ph/hiace' 
  }
];

export default function AutoScreen() {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedTerm, setSelectedTerm] = useState<number>(12);
  const [expandedCard, setExpandedCard] = useState<number | null>(null);

  const categories = ['All', 'Sedan', 'Midsize SUV', 'Pick-up', 'SUV / MPV', 'Vans'];
  const terms = [12, 24, 36, 48];

  const calculateMonthly = (principal: number, termMonths: number, type: 'Bank' | 'InHouse') => {
    const annualRate = type === 'Bank' ? 0.07 : 0.15;
    const totalInterest = principal * annualRate * (termMonths / 12);
    return Math.round((principal + totalInterest) / termMonths);
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: UI_COLORS.bg }} contentContainerStyle={{ padding: 20, paddingTop: 40 }}>
      <Pressable onPress={() => router.replace('/')} style={{ marginBottom: 16 }}>
        <Text style={{ color: UI_COLORS.purple, fontWeight: '600' }}>← Dashboard</Text>
      </Pressable>
      
      <Text style={{ fontSize: 24, fontWeight: '700', color: '#FFF', marginBottom: 4 }}>Auto Loans Matrix</Text>
      <Text style={{ fontSize: 13, color: UI_COLORS.textSecondary, marginBottom: 20 }}>Compare financial structures side-by-side with official dealership data.</Text>

      {/* TIER REFERENCE INFO BLOCK */}
      <View style={{ backgroundColor: UI_COLORS.surface, borderRadius: 16, padding: 14, marginBottom: 20, borderWidth: 1, borderColor: UI_COLORS.border }}>
        <Text style={{ color: '#FFF', fontSize: 12, fontWeight: '700', marginBottom: 10, textTransform: 'uppercase', letterSpacing: 0.5 }}>PH Interest Tier Reference</Text>
        <View style={{ flexDirection: 'row', gap: 10 }}>
          <View style={{ flex: 1, backgroundColor: UI_COLORS.innerBg, padding: 10, borderRadius: 10, borderWidth: 1, borderColor: UI_COLORS.purple }}>
            <Text style={{ color: UI_COLORS.purple, fontSize: 13, fontWeight: '700' }}>🏦 Bank Financing</Text>
            <Text style={{ color: '#FFF', fontSize: 11, marginTop: 4 }}>• Interest: <Text style={{ color: UI_COLORS.emerald, fontWeight: '600' }}>~7.0% p.a.</Text></Text>
            <Text style={{ color: '#FFF', fontSize: 11 }}>• Downpayment: <Text style={{ fontWeight: '600' }}>20%</Text></Text>
          </View>
          <View style={{ flex: 1, backgroundColor: UI_COLORS.innerBg, padding: 10, borderRadius: 10, borderWidth: 1, borderColor: UI_COLORS.orange }}>
            <Text style={{ color: UI_COLORS.orange, fontSize: 13, fontWeight: '700' }}>🏠 In-House Dealer</Text>
            <Text style={{ color: '#FFF', fontSize: 11, marginTop: 4 }}>• Interest: <Text style={{ color: '#EF4444', fontWeight: '600' }}>~15.0% p.a.</Text></Text>
            <Text style={{ color: '#FFF', fontSize: 11 }}>• Downpayment: <Text style={{ fontWeight: '600' }}>15% Low Promo</Text></Text>
          </View>
        </View>
      </View>

      {/* TERM SELECTOR */}
      <Text style={{ color: UI_COLORS.textSecondary, fontSize: 11, fontWeight: '700', textTransform: 'uppercase', marginBottom: 8 }}>Select Target Installment Term:</Text>
      <View style={{ flexDirection: 'row', gap: 6, marginBottom: 20 }}>
        {terms.map(t => (
          <Pressable key={t} onPress={() => setSelectedTerm(t)} style={{ flex: 1, paddingVertical: 10, borderRadius: 10, backgroundColor: selectedTerm === t ? UI_COLORS.emerald : UI_COLORS.surface, alignItems: 'center', borderWidth: 1, borderColor: UI_COLORS.border }}>
            <Text style={{ color: '#FFF', fontSize: 13, fontWeight: '700' }}>{t} Mos</Text>
          </Pressable>
        ))}
      </View>

      {/* CATEGORY FILTER */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 20, maxHeight: 45 }}>
        {categories.map(cat => (
          <Pressable key={cat} onPress={() => setActiveCategory(cat)} style={{ paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, backgroundColor: activeCategory === cat ? UI_COLORS.purple : UI_COLORS.surface, marginRight: 8, borderWidth: 1, borderColor: UI_COLORS.border }}>
            <Text style={{ color: '#FFF', fontSize: 12, fontWeight: '600' }}>{cat}</Text>
          </Pressable>
        ))}
      </ScrollView>

      {/* LIST VEHICLES */}
      <View style={{ gap: 14 }}>
        {VEHICLE_DATA.filter(v => activeCategory === 'All' || v.category === activeCategory).map((c, i) => {
          const isExpanded = expandedCard === i;

          const bankDp = c.price * 0.20;
          const bankMonthly = calculateMonthly(c.price - bankDp, selectedTerm, 'Bank');

          const inHouseDp = c.price * 0.15;
          const inHouseMonthly = calculateMonthly(c.price - inHouseDp, selectedTerm, 'InHouse');

          return (
            <Pressable 
              key={i} 
              onPress={() => setExpandedCard(isExpanded ? null : i)}
              style={{ backgroundColor: UI_COLORS.surface, padding: 16, borderRadius: 16, borderWidth: 1, borderColor: isExpanded ? UI_COLORS.purple : UI_COLORS.border }}
            >
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <View style={{ flex: 1 }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                    <Text style={{ fontSize: 16 }}>{c.icon}</Text>
                    <View style={{ backgroundColor: UI_COLORS.innerBg, paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4, borderWidth: 1, borderColor: UI_COLORS.border }}>
                      <Text style={{ color: '#FFF', fontSize: 10, fontWeight: '700' }}>{c.brand.toUpperCase()}</Text>
                    </View>
                    <Text style={{ color: UI_COLORS.textSecondary, fontSize: 11 }}>• {c.subcat}</Text>
                  </View>
                  <Text style={{ color: '#FFF', fontSize: 18, fontWeight: '700', marginTop: 6 }}>{c.model}</Text>
                </View>
                <Text style={{ color: UI_COLORS.purple, fontSize: 16, fontWeight: '800' }}>₱{c.price.toLocaleString()}</Text>
              </View>

              {/* STABLE ERROR-GUARDED IMAGE CONTROLLER */}
              {isExpanded && c.img && (
                <Image 
                  source={{ uri: c.img }} 
                  style={{ width: '100%', height: 160, borderRadius: 12, marginTop: 12, backgroundColor: UI_COLORS.innerBg }} 
                  resizeMode="contain"
                />
              )}

              <View style={{ flexDirection: 'row', gap: 8, marginTop: 12 }}>
                <View style={{ flex: 1, backgroundColor: UI_COLORS.innerBg, padding: 10, borderRadius: 10, borderWidth: 1, borderColor: UI_COLORS.border }}>
                  <Text style={{ color: UI_COLORS.purple, fontSize: 11, fontWeight: '700' }}>🏦 Bank Plan ({selectedTerm}m)</Text>
                  <Text style={{ color: UI_COLORS.emerald, fontSize: 15, fontWeight: '800', marginVertical: 2 }}>₱{bankMonthly.toLocaleString()}<Text style={{ fontSize: 10, color: UI_COLORS.textSecondary }}>/mo</Text></Text>
                  <Text style={{ color: UI_COLORS.textSecondary, fontSize: 10 }}>DP: ₱{Math.round(bankDp).toLocaleString()}</Text>
                </View>

                <View style={{ flex: 1, backgroundColor: UI_COLORS.innerBg, padding: 10, borderRadius: 10, borderWidth: 1, borderColor: UI_COLORS.border }}>
                  <Text style={{ color: UI_COLORS.orange, fontSize: 11, fontWeight: '700' }}>🏠 In-House ({selectedTerm}m)</Text>
                  <Text style={{ color: UI_COLORS.emerald, fontSize: 15, fontWeight: '800', marginVertical: 2 }}>₱{inHouseMonthly.toLocaleString()}<Text style={{ fontSize: 10, color: UI_COLORS.textSecondary }}>/mo</Text></Text>
                  <Text style={{ color: UI_COLORS.textSecondary, fontSize: 10 }}>DP: ₱{Math.round(inHouseDp).toLocaleString()}</Text>
                </View>
              </View>

              {isExpanded && (
                <Pressable onPress={() => Linking.openURL(c.url).catch(() => {})} style={{ backgroundColor: UI_COLORS.purple, borderRadius: 10, paddingVertical: 11, alignItems: 'center', marginTop: 12 }}>
                  <Text style={{ color: '#FFF', fontSize: 12, fontWeight: '700' }}>Get Official Dealer Quote Now →</Text>
                </Pressable>
              )}
            </Pressable>
          );
        })}
      </View>
    </ScrollView>
  );
                          }
