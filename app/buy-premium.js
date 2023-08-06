import { Stack, router } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { ui } from "../src/utils/styles";
import OffersHandler from "../src/components/OffersHandler";

export default function BuyPremium() {

    const { buyProduct } = OffersHandler();

    return (
        <View style={{ flex: 1, alignItems: "center", backgroundColor: "white", borderRadius: 20, paddingVertical: 6, paddingHorizontal: 8 }}>
            <Stack.Screen options={{ headerShown: false }} />
            <TouchableOpacity onPress={() => router.push({ pathname: "/" })} style={{ alignSelf: "flex-end" }}>
                <Text style={{ marginRight: 16, fontSize: 24, fontWeight: "bold" }}>✖</Text>
            </TouchableOpacity>
            <Text style={[ui.text, { fontSize: 42, fontWeight: "bold", textAlign: "center", paddingHorizontal: 24 }]}>¡¿Quieres probar mas?!</Text>
            <Image source={require("../assets/vip-banner.png")} resizeMode="contain" style={{ width: "100%" }} />

            <View style={{ paddingHorizontal: 40, gap: 8 }}>
                <Text style={[ui.text, { fontSize: 26 }]}>• Quita todos los anuncios</Text>
                <Text style={[ui.text, { fontSize: 26 }]}>• Desbloquea todas las <Text style={{ fontWeight: "bold" }}>preguntas</Text></Text>
                <Text style={[ui.text, { fontSize: 26 }]}>• Desbloquea todos los <Text style={{ fontWeight: "bold" }}>retos</Text></Text>
                <Text style={[ui.text, { fontSize: 45, fontWeight: "bold", alignSelf: "center" }]}>4,79€</Text>
            </View>
            <TouchableOpacity onPress={buyProduct} style={{marginTop: 22}}>
                <View style={{ padding: 16, backgroundColor: "#9362A3", borderRadius: 10 }}>
                    <Text style={{ fontWeight: "bold", color: "white", fontSize: 20 }}>Comprar ShotAsk Premium</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}