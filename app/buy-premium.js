import { Stack, router } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { ui } from "../src/utils/styles";
import OffersHandler from "../src/components/OffersHandler";
import { useContext } from "react";
import { DataContext } from "../src/utils/DataContext";

export default function BuyPremium() {

    const { buyProduct } = OffersHandler();
    const { lang } = useContext(DataContext);

    return (
        <View style={{ flex: 1, alignItems: "center", backgroundColor: "white", borderRadius: 20, paddingVertical: 6, paddingHorizontal: 8 }}>
            <Stack.Screen options={{ headerShown: false }} />
            <TouchableOpacity onPress={() => router.push({ pathname: "/" })} style={{ alignSelf: "flex-end" }}>
                <Text style={{ marginRight: 16, fontSize: 24, fontWeight: "bold" }}>✖</Text>
            </TouchableOpacity>
            <Text style={[ui.text, { fontSize: 42, fontWeight: "bold", textAlign: "center", paddingHorizontal: 24 }]}>{lang.t('premiumTitle')}</Text>
            <Image source={require("../assets/vip-banner.png")} resizeMode="contain" style={{ width: "100%" }} />

            <View style={{ paddingHorizontal: 40, gap: 8 }}>
                <Text style={[ui.text, { fontSize: 26 }]}>• {lang.t('premiumFeature1')}</Text>
                <Text style={[ui.text, { fontSize: 26 }]}>• {lang.t('premiumFeature2')}</Text>
                <Text style={[ui.text, { fontSize: 26 }]}>• {lang.t('premiumFeature3')}</Text>
                <Text style={[ui.text, { fontSize: 45, fontWeight: "bold", alignSelf: "center" }]}>{lang.t('premiumPrice')}</Text>
            </View>
            <TouchableOpacity onPress={buyProduct} style={{marginTop: 22}}>
                <View style={{ padding: 16, backgroundColor: "#9362A3", borderRadius: 10 }}>
                    <Text style={{ fontWeight: "bold", color: "white", fontSize: 20 }}>{lang.t('premiumBtn')}</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}