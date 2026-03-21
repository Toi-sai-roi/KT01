import {
  View, Text, StyleSheet, Image,
  TouchableOpacity, Dimensions, Animated,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useRef, useState } from "react";
import { PRODUCTS } from "../../constants/products";
import { useCart } from "../../context/CartContext";

const { width, height } = Dimensions.get("window");

export default function ScanScreen() {
  const { productId } = useLocalSearchParams<{ productId?: string }>();
  const router = useRouter();
  const { addToCart } = useCart();

  // Nếu được navigate với productId → dùng luôn, không thì random simulate scan
  const [currentProduct, setCurrentProduct] = useState(
    PRODUCTS.find((p) => p.id === productId) ?? PRODUCTS[0]
  );

  // Khi params thay đổi (người dùng bấm sản phẩm khác từ Home)
  useEffect(() => {
    if (productId) {
      const found = PRODUCTS.find((p) => p.id === productId);
      if (found) setCurrentProduct(found);
    }
  }, [productId]);

  // Animation nhẹ cho scan line
  const scanAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(scanAnim, { toValue: 1, duration: 1800, useNativeDriver: true }),
        Animated.timing(scanAnim, { toValue: 0, duration: 1800, useNativeDriver: true }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, []);

  const scanLineY = scanAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-height * 0.28, height * 0.28],
  });

  const handleAdd = () => {
    addToCart(currentProduct);
    router.push("/(tabs)/cart");
  };

  return (
    <View style={styles.container}>
      {/* Back button */}
      <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
        <Ionicons name="chevron-back" size={22} color="#555" />
      </TouchableOpacity>

      {/* Scan area */}
      <View style={styles.scanArea}>
        <Image source={currentProduct.image} style={styles.bottle} />

        {/* Frame corners */}
        <View style={styles.frame}>
          <Animated.View
            style={[styles.scanLine, { transform: [{ translateY: scanLineY }] }]}
          />
        </View>
      </View>

      {/* Product card */}
      <View style={styles.card}>
        <Image source={currentProduct.image} style={styles.thumb} />
        <View style={{ flex: 1 }}>
          <Text style={styles.brand}>{currentProduct.brand}</Text>
          <Text style={styles.name}>{currentProduct.name}</Text>
        </View>
        <TouchableOpacity style={styles.addBtn} onPress={handleAdd} activeOpacity={0.8}>
          <Ionicons name="add" size={22} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EFE3D3",
    justifyContent: "space-between",
    alignSelf: "center",
    width: Math.min(width, 420),
  },

  backBtn: {
    position: "absolute",
    top: 56,
    left: 20,
    zIndex: 10,
    backgroundColor: "#fff",
    borderRadius: 12,
    width: 38,
    height: 38,
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
  },

  scanArea: { flex: 1, alignItems: "center", justifyContent: "center" },

  bottle: { width: 220, height: 340, resizeMode: "contain", alignSelf: "center" },

  frame: {
    position: "absolute",
    width: width * 0.75,
    height: width * 1.2,
    borderRadius: 30,
    borderWidth: 3,
    borderColor: "#F7EBDA",
    alignSelf: "center",
    overflow: "hidden",
    justifyContent: "center",
  },

  scanLine: {
    width: "100%",
    height: 2,
    backgroundColor: "rgba(255,255,255,0.6)",
  },

  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 15,
    margin: 20,
    marginBottom: 40,
    elevation: 5,
  },

  thumb: { width: 40, height: 70, marginRight: 12, resizeMode: "contain" },
  brand: { fontSize: 12, color: "#999" },
  name: { fontSize: 16, fontWeight: "600" },

  addBtn: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: "#6C63FF",
    justifyContent: "center",
    alignItems: "center",
  },
});