import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export default function ScanScreen() {

  return (
    <View style={styles.container}>

      {/* bottle area */}
      <View style={styles.scanArea}>

        <Image
          source={require("../assets/images/orangeJuice.png")}
          style={styles.bottle}
        />

        <View style={styles.frame} />

      </View>

      {/* product card */}
      <View style={styles.card}>

        <Image
          source={require("../assets/images/orangeJuice.png")}
          style={styles.thumb}
        />

        <View style={{flex:1}}>
          <Text style={styles.brand}>Lauren’s</Text>
          <Text style={styles.name}>Orange Juice</Text>
        </View>

        <TouchableOpacity style={styles.addBtn}>
          <Text style={{color:"#fff",fontSize:20}}>+</Text>
        </TouchableOpacity>

      </View>

    </View>
  );
}

const styles = StyleSheet.create({

    container:{
        flex:1,
        backgroundColor:"#EFE3D3",
        paddingHorizontal:20,
        justifyContent:"space-between",
        alignSelf:"center",
        width: Math.min(width, 420)
      },

      scanArea:{
        flex:1,
        alignItems:"center",
        justifyContent:"center"
      },

      bottle:{
        width:"100%",
        height:"100%",
        resizeMode:"contain"
      },

  frame:{
    position:"absolute",
    width:width * 0.75,
    height:width * 1.2,
    borderRadius:30,
    borderWidth:3,
    borderColor:"#F7EBDA",
    alignSelf:"center"
  },

  card:{
    flexDirection:"row",
    alignItems:"center",
    backgroundColor:"#fff",
    borderRadius:20,
    padding:15,
    marginBottom:40,
    elevation:5
  },

  thumb:{
    width:40,
    height:70,
    marginRight:10,
    resizeMode:"contain"
  },

  brand:{
    fontSize:12,
    color:"#999"
  },

  name:{
    fontSize:16,
    fontWeight:"600"
  },

  addBtn:{
    width:38,
    height:38,
    borderRadius:10,
    backgroundColor:"#6C63FF",
    justifyContent:"center",
    alignItems:"center"
  }

});