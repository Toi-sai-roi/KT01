import {
  View, Text, StyleSheet, Image,
  TouchableOpacity, ScrollView, Dimensions,
  ImageBackground,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { PRODUCTS } from "../../constants/products";

const { width } = Dimensions.get("window");

const INSIGHTS = [
  { icon: require("../../assets/scr-sh/iconScan.png"),       bg: null,                                          cardBg: require("../../assets/scr-sh/bg.png"),    label: "Scan new",     sub: "Scanned 483"      },
  { icon: require("../../assets/scr-sh/iconWarn.png"),   bg: require("../../assets/scr-sh/bgWarn.png"),     cardBg: require("../../assets/scr-sh/bg.png"),    label: "Counterfeits", sub: "Counterfeited 32" },
  { icon: require("../../assets/scr-sh/iconSucces.png"), bg: require("../../assets/scr-sh/bgSucces.png"),   cardBg: require("../../assets/scr-sh/bg.png"),  label: "Success",      sub: "Checkouts 8"      },
  { icon: require("../../assets/scr-sh/iconDirec.png"),  bg: require("../../assets/scr-sh/bgDirec.png"),    cardBg: require("../../assets/scr-sh/bg.png"),   label: "Directory",    sub: "History 26"       },
];

export default function HomeScreen() {
  const router = useRouter();

  const handleInsightPress = (label: string) => {
    if (label === "Scan new") router.push("/(tabs)/scan");
  };

  const handleProductPress = (productId: string) => {
    router.push({ pathname: "/(tabs)/scan", params: { productId } });
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.hello}>Hello 👋</Text>
          <Text style={styles.username}>Christie Doe</Text>
        </View>
        <Image
          source={require("../../assets/scr-sh/avatar.png")}
          style={styles.avatar}
        />
      </View>

      {/* Your Insights */}
      <Text style={styles.sectionTitle}>Your Insights</Text>
      <View style={styles.grid}>
        {INSIGHTS.map((item) => (
          <View key={item.label} style={styles.insightCard}>
          <ImageBackground
            source={item.cardBg}
            style={{ flex: 1 }} 
          >
            <TouchableOpacity
              style={styles.insightContent} 
              onPress={() => handleInsightPress(item.label)}
              activeOpacity={0.75}
            >
              <View style={styles.iconBox}>
                {item.bg && <Image source={item.bg} style={styles.insightBg} />}
                <Image source={item.icon} style={styles.insightIcon} />
              </View>
              
              <Text style={styles.insightLabel}>{item.label}</Text>
              <Text style={styles.insightSub}>{item.sub}</Text>
            </TouchableOpacity>
          </ImageBackground>
        </View>
        ))}
      </View>

      {/* Explore More */}
      <View style={styles.sectionRow}>
        <Text style={styles.sectionTitle}>Explore More</Text>
        <Ionicons name="arrow-forward" size={18} color="#333" />
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.productRow}>
        {PRODUCTS.map((p) => (
          <TouchableOpacity
            key={p.id}
            style={styles.productCard}
            onPress={() => handleProductPress(p.id)}
            activeOpacity={0.8}
          >
            <Image source={p.image} style={styles.productImage} />
            <Text style={styles.productBrand}>{p.brand}</Text>
            <Text style={styles.productName}>{p.name}</Text>
            <Text style={styles.productPrice}>₹ {p.price}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={{ height: 30 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8F8F8", paddingHorizontal: 20 },

  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 60, marginBottom: 24 },
  hello: { fontSize: 26, fontWeight: "700" },
  username: { fontSize: 14, color: "#999", marginTop: 2 },
  avatar: { width: 44, height: 44, borderRadius: 22 },

  sectionTitle: { fontSize: 17, fontWeight: "600", marginBottom: 14 },
  sectionRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 14, marginTop: 10 },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between", 
    width: "100%",
  },
  insightCard: {
    width: "48%", 
    marginBottom: 15,
    borderRadius: 16,
    overflow: "hidden", 
    // Shadow cho iOS
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    // Shadow cho Android
    elevation: 3,
  },
  insightContent: {
    padding: 16,
    flex: 1, 
    minHeight: 120,
  },
  iconBox: { width: 44, height: 44, borderRadius: 12, justifyContent: "center", alignItems: "center", marginBottom: 10, overflow: "hidden" },
  insightBg: { position: "absolute", width: "100%", height: "100%", resizeMode: "cover" },
  insightIcon: { width: 26, height: 26, resizeMode: "contain" },
  insightLabel: { fontSize: 15, fontWeight: "600" },
  insightSub: { fontSize: 12, color: "#aaa", marginTop: 3 },

  productRow: { marginLeft: -4 },
  productCard: {
    width: 140,
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 14,
    marginRight: 12,
    marginLeft: 4,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  productImage: { width: "100%", height: 110, resizeMode: "contain", marginBottom: 8 },
  productBrand: { fontSize: 11, color: "#aaa" },
  productName: { fontSize: 13, fontWeight: "600", marginTop: 2 },
  productPrice: { fontSize: 13, color: "#E87D4D", fontWeight: "600", marginTop: 4 },
});