import {View, Text, StyleSheet, Image,TouchableOpacity, FlatList, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useCart } from "../../context/CartContext";
import React from "react";
  
  const { width } = Dimensions.get("window");
  
  export default function CartScreen() {
    const { items, increase, decrease } = useCart();
  
    const total = items.reduce((sum, i) => sum + i.price * i.qty, 0);
  
    return (
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Your Cart 👍🏻</Text>
        </View>
  
        {items.length === 0 ? (
          <View style={styles.empty}>
            <Ionicons name="cart-outline" size={64} color="#ddd" />
            <Text style={styles.emptyText}>Giỏ hàng trống</Text>
          </View>
        ) : (
          <>
            <FlatList
              data={items}
              keyExtractor={(item) => item.id}
              contentContainerStyle={{ paddingBottom: 16 }}
              renderItem={({ item }) => (
                <View style={styles.row}>
                  <View style={styles.imageBox}>
                    <Image source={item.image} style={styles.thumb} />
                  </View>
  
                  <View style={{ flex: 1 }}>
                    <Text style={styles.brand}>{item.brand}</Text>
                    <Text style={styles.name}>{item.name}</Text>
                    <Text style={styles.price}>₹ {item.price}</Text>
                  </View>
  
                  {/* Qty control */}
                  <View style={styles.qtyRow}>
                    <TouchableOpacity
                      style={styles.qtyBtn}
                      onPress={() => decrease(item.id)}
                      activeOpacity={0.7}
                    >
                      <Ionicons name="remove" size={16} color="#666" />
                    </TouchableOpacity>
  
                    <Text style={styles.qty}>{item.qty}</Text>
  
                    <TouchableOpacity
                      style={styles.qtyBtn}
                      onPress={() => increase(item.id)}
                      activeOpacity={0.7}
                    >
                      <Ionicons name="add" size={16} color="#666" />
                    </TouchableOpacity>
                  </View>
                </View>
              )}
              ItemSeparatorComponent={() => <View style={styles.sep} />}
            />
  
            {/* Footer */}
            <View style={styles.footer}>
              <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>Total</Text>
                <Text style={styles.totalValue}>₹ {total.toLocaleString()}</Text>
              </View>
              <TouchableOpacity style={styles.checkoutBtn} activeOpacity={0.85}>
                <Text style={styles.checkoutText}>Proceed to checkout</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#F8F8F8",
      alignSelf: "center",
      width: Math.min(width, 420),
    },
  
    header: { paddingHorizontal: 20, paddingTop: 60, paddingBottom: 16 },
    title: { fontSize: 24, fontWeight: "700" },
  
    empty: { flex: 1, justifyContent: "center", alignItems: "center", gap: 12 },
    emptyText: { fontSize: 15, color: "#bbb" },
  
    row: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "#fff",
      marginHorizontal: 20,
      borderRadius: 16,
      padding: 14,
      gap: 12,
      elevation: 2,
      shadowColor: "#000",
      shadowOpacity: 0.04,
      shadowRadius: 6,
      shadowOffset: { width: 0, height: 2 },
    },
  
    imageBox: {
      width: 54,
      height: 70,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#F9F5F0",
      borderRadius: 10,
    },
  
    thumb: { width: 40, height: 60, resizeMode: "contain" },
    brand: { fontSize: 11, color: "#aaa" },
    name: { fontSize: 14, fontWeight: "600", marginTop: 2 },
    price: { fontSize: 14, color: "#E87D4D", fontWeight: "600", marginTop: 4 },
  
    qtyRow: { flexDirection: "row", alignItems: "center", gap: 8 },
    qtyBtn: {
      width: 28,
      height: 28,
      borderRadius: 8,
      backgroundColor: "#F2F2F2",
      justifyContent: "center",
      alignItems: "center",
    },
    qty: { fontSize: 15, fontWeight: "600", minWidth: 18, textAlign: "center" },
  
    sep: { height: 10 },
  
    footer: {
      backgroundColor: "#fff",
      borderTopLeftRadius: 24,
      borderTopRightRadius: 24,
      padding: 20,
      paddingBottom: 36,
      elevation: 10,
      shadowColor: "#000",
      shadowOpacity: 0.08,
      shadowRadius: 12,
      shadowOffset: { width: 0, height: -4 },
    },
  
    totalRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 16 },
    totalLabel: { fontSize: 17, fontWeight: "600" },
    totalValue: { fontSize: 17, fontWeight: "700", color: "#E87D4D" },
  
    checkoutBtn: {
      backgroundColor: "#E87D4D",
      borderRadius: 16,
      height: 52,
      justifyContent: "center",
      alignItems: "center",
    },
    checkoutText: { color: "#fff", fontSize: 16, fontWeight: "600" },
  });