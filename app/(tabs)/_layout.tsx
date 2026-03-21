import { Tabs } from "expo-router";
import { View, Text, Image, StyleSheet } from "react-native";
import { useCart } from "../../context/CartContext";

const TAB_ICONS: Record<string, { active: any; inactive: any }> = {
  index:   { active: require("../../assets/scr-sh/home.png"),    inactive: require("../../assets/scr-sh/home.png") },
  scan:    { active: require("../../assets/scr-sh/scan.png"),    inactive: require("../../assets/scr-sh/scan.png") },
  explore: { active: require("../../assets/scr-sh/offer.png"),   inactive: require("../../assets/scr-sh/offer.png") },
  history: { active: require("../../assets/scr-sh/history.png"), inactive: require("../../assets/scr-sh/history.png") },
  cart:    { active: require("../../assets/scr-sh/cart.png"),    inactive: require("../../assets/scr-sh/cart.png") },
};

const styles = StyleSheet.create({
  badge: {
    position: "absolute",
    top: -4,
    right: -6,
    backgroundColor: "#E87D4D",
    borderRadius: 8,
    minWidth: 16,
    height: 16,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 3,
  },
  badgeText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "700",
  },
});

function TabIcon({ name, focused }: { name: string; focused: boolean }) {
  const icons = TAB_ICONS[name];
  return (
    <Image
      source={focused ? icons.active : icons.inactive}
      style={{ width: 24, height: 24, resizeMode: "contain" }}
    />
  );
}

function CartBadge() {
  const { totalCount } = useCart();
  if (totalCount === 0) return null;
  return (
    <View style={styles.badge}>
      <Text style={styles.badgeText}>{totalCount > 99 ? "99+" : totalCount}</Text>
    </View>
  );
}

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#E87D4D",
        tabBarInactiveTintColor: "#999",
        tabBarShowLabel: false,
        tabBarStyle: { paddingBottom: 8, height: 60 },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) => <TabIcon name="index" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Offer",
          tabBarIcon: ({ focused }) => <TabIcon name="explore" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="scan"
        options={{
          title: "Scan",
          tabBarIcon: ({ focused }) => <TabIcon name="scan" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: "History",
          tabBarIcon: ({ focused }) => <TabIcon name="history" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: "Cart",
          tabBarIcon: ({ focused }) => (
            <View>
              <TabIcon name="cart" focused={focused} />
              <CartBadge />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}