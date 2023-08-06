import { ui, app } from "../src/utils/styles";
import { View, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Stack, router } from "expo-router";
import PremiumButton from "../src/components/premium-button";
import OffersHandler from "../src/components/OffersHandler";

export default function App() {

    const { premium } = OffersHandler();

    return (
        <View style={{ flex: 1 }}>
            {!premium && <PremiumButton />}
            <Stack.Screen options={{ headerShown: false }} />
            <View style={styles.menu}>
                <View style={styles.logo}><Image source={require("../assets/logo-new.jpg")} style={app.logo} /></View>
                
                <TouchableOpacity onPress={() => router.push({ pathname: "auxiliar-menu", params: { mode: "questions" } })}>
                    <Image source={require("../assets/boton-preguntas.png")} />
                </TouchableOpacity>
                {
                    premium ?
                        <TouchableOpacity onPress={() => router.push({ pathname: "auxiliar-menu", params: { mode: "challenges" } })}>
                            <Image source={require("../assets/boton-retos.png")} style={ui.menuImg} contentFit={'contain'} />
                        </TouchableOpacity>
                        :
                        <TouchableOpacity onPress={() => router.push({ pathname: "buy-premium" })}>
                            <View style={{ position: "relative" }}>
                                <Image source={require("../assets/lock.png")} style={ui.lock} />
                                <Image source={require("../assets/boton-retos.png")} style={ui.disabled} />
                            </View>
                        </TouchableOpacity>

                }
                <TouchableOpacity onPress={() => router.push({ pathname: "names", params: { mode: "i_never" } })}>
                    <Image source={require("../assets/boton-yo-nunca.png")} style={ui.menuImg} contentFit={'contain'} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    menu: {
        justifyContent: "center", 
        alignItems: "center", 
        flex: 1, 
        gap: 28, 
        marginTop: 24
    },

    logo: {
        elevation: 50,
        shadowColor: "black", 
        borderRadius: 100
    }
});