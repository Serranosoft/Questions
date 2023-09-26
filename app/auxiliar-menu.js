import { TouchableOpacity, View, Image } from "react-native";
import { Stack, router, useLocalSearchParams } from "expo-router";
import OffersHandler from "../src/components/OffersHandler";
import PremiumButton from "../src/components/premium-button";
import { ui } from "../src/utils/styles";

export default function AuxiliarMenu() {

    const { mode } = useLocalSearchParams();
    const { premium } = OffersHandler();

    return (
        <View style={{ flex: 1 }}>
            { !premium && <PremiumButton /> }
            <Stack.Screen options={{ headerShown: false }} />
            <View style={{ justifyContent: "center", alignItems: "center", flex: 1, gap: 28, marginTop: 24 }}>

                {
                    mode === "questions" &&
                    <>
                        <TouchableOpacity onPress={() => router.push({ pathname: "names", params: { mode: "couple" } })}>
                            <Image source={require("../assets/boton-parejas.png")} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => router.push({ pathname: "names", params: { mode: "friends" } })}>
                            <Image source={require("../assets/boton-amigos.png")} />
                        </TouchableOpacity>
                        {
                            premium ?
                                <TouchableOpacity onPress={() => router.push({ pathname: "names", params: { mode: "adult" } })}>
                                    <Image source={require("../assets/boton-mas-18.png")} />
                                </TouchableOpacity>
                                :
                                <TouchableOpacity onPress={() => router.push({ pathname: "buy-premium" })}>
                                    <View style={{ position: "relative" }}>
                                        <Image source={require("../assets/lock.png")} style={ui.lock} /> 
                                        <Image source={require("../assets/boton-mas-18.png")} style={{ opacity: 0.5 }} />
                                    </View>
                                </TouchableOpacity>
                        }
                    </>
                }
            </View>
        </View>
    )
}