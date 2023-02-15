import { Image, ImageBackground, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import "../src/fonts";

export default function Home({ navigation }) {

    return (
        <ImageBackground source={require("../assets/background2.jpg")} resizeMode="cover"
            style={{
                width: '100%',
                height: '100%',
                flex: 1
            }}>
            <View style={{
                flex: 1,
                alignItems: "center",
                marginTop: StatusBar.currentHeight,
                paddingVertical: 60,
            }}>
                <View
                    style={{
                        flex: 1,
                        width: "100%",
                        justifyContent: "center",
                        alignItems: "center"
                    }}>

                    <Image
                        source={require("../assets/logo-new.jpg")}
                        style={{
                            width: 150,
                            height: 150,
                            resizeMode: "contain",
                            padding: 0,
                            borderRadius: 100
                        }} 
                    />
                </View>
                <View style={{
                    width: "100%",
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                }}>
                    <TouchableOpacity
                        onPress={() =>
                            navigation.navigate("Names", { mode: 'friends' })
                        }>
                        <Image
                            source={require("../assets/boton-parejas.png")}
                            style={{
                                width: 230,
                                resizeMode: "contain",
                                padding: 0,
                            }}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() =>
                            navigation.navigate("Names", { mode: 'couple' })
                        }>
                        <Image
                            source={require("../assets/boton-amigos.png")}
                            style={{
                                width: 230,
                                resizeMode: "contain",
                                padding: 0,
                            }} />
                    </TouchableOpacity>
                </View>

            </View>

            <View style={{ paddingHorizontal: 8, alignItems: "flex-end" }}>
                <Text style={{ fontWeight: "bold" }}>v1.0.1</Text>
            </View>

        </ImageBackground>
    )
}