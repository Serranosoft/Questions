import { ui, app } from "../src/utils/styles";
import { View, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Stack, router } from "expo-router";
import PremiumButton from "../src/components/premium-button";
import OffersHandler from "../src/components/OffersHandler";
import { useContext, useEffect } from "react";
import { DataContext } from "../src/utils/DataContext";
import LangSelector from "../src/components/lang-selector";
import { scheduleWeeklyNotification } from "../src/utils/notifications";

export default function App() {

    const { premium } = OffersHandler();
    const { lang } = useContext(DataContext);

    useEffect(() => {
        scheduleWeeklyNotification();
    }, [])

    return (
        <View style={{ flex: 1 }}>

            <LangSelector />
            {!premium && <PremiumButton />}

            <Stack.Screen options={{ headerShown: false }} />
            <View style={styles.menu}>

                <View style={styles.logo}><Image source={require("../assets/logo-new.jpg")} style={app.logo} /></View>

                <TouchableOpacity style={{ alignSelf: "center" }} onPress={() => router.push({ pathname: "auxiliar-menu", params: { mode: "questions" } })}>
                    {lang.locale == "es-ES" ? <Image source={require("../assets/boton-preguntas.png")} /> : <Image source={require("../assets/boton-preguntas-ingles.png")} />}
                </TouchableOpacity>
                {
                    premium ?
                        <TouchableOpacity style={{ alignSelf: "center" }} onPress={() => router.push({ pathname: "names", params: { mode: "challenges" } })}>
                            {lang.locale == "es-ES" ? <Image source={require("../assets/boton-retos.png")} contentFit={'contain'} /> : <Image source={require("../assets/boton-retos-ingles.png")} contentFit={'contain'} />}
                        </TouchableOpacity>
                        :
                        <TouchableOpacity style={{ alignSelf: "center" }} onPress={() => router.push({ pathname: "buy-premium" })}>
                            <View style={{ position: "relative" }}>
                                <Image source={require("../assets/lock.png")} style={ui.lock} />
                                {lang.locale == "es-ES" ? <Image source={require("../assets/boton-retos.png")} style={ui.disabled} /> : <Image source={require("../assets/boton-retos-ingles.png")} style={ui.disabled} />}
                            </View>
                        </TouchableOpacity>

                }
                <TouchableOpacity style={{ alignSelf: "center" }} onPress={() => router.push({ pathname: "names", params: { mode: "i_never" } })}>
                    {lang.locale == "es-ES" ? <Image source={require("../assets/boton-yo-nunca.png")} contentFit={'contain'} /> : <Image source={require("../assets/boton-yo-nunca-ingles.png")} contentFit={'contain'} />}
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    menu: {
        justifyContent: "center",
        gap: 28,
        marginTop: 24,
    },

    logo: {
        elevation: 50,
        shadowColor: "black",
        borderRadius: 100
    }
});