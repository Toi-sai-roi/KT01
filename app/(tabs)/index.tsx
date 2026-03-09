import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function HomeScreen() {

  const router = useRouter();

  return (
    <View style={styles.container}>

      <Text style={styles.title}>Hello 👋</Text>
      <Text style={styles.subtitle}>Your Insights</Text>

      <View style={styles.grid}>

        <TouchableOpacity 
          style={styles.card}
          onPress={() => router.push("/scan")}
        >
          <Text style={styles.cardTitle}>Scan new</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card}>
          <Text style={styles.cardTitle}>Counterfeits</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card}>
          <Text style={styles.cardTitle}>Success</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card}>
          <Text style={styles.cardTitle}>Directory</Text>
        </TouchableOpacity>

      </View>

    </View>
  );
}

const styles = StyleSheet.create({

  container:{
    flex:1,
    padding:20,
    backgroundColor:"#f5f5f5"
  },

  title:{
    fontSize:24,
    fontWeight:"bold"
  },

  subtitle:{
    marginTop:5,
    marginBottom:20,
    color:"#666"
  },

  grid:{
    flexDirection:"row",
    flexWrap:"wrap",
    justifyContent:"space-between"
  },

  card:{
    width:"47%",
    height:120,
    backgroundColor:"#fff",
    borderRadius:15,
    justifyContent:"center",
    alignItems:"center",
    marginBottom:15,
    elevation:3
  },

  cardTitle:{
    fontSize:16,
    fontWeight:"600"
  }

});