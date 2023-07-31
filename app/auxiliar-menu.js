import { TouchableOpacity, View, Image } from "react-native";
import { Stack, router, useLocalSearchParams } from "expo-router";
import { app } from "../src/utils/styles";
import LottieView from 'lottie-react-native';
import { useEffect, useState } from "react";

export default function AuxiliarMenu() {

    const { mode } = useLocalSearchParams();
    const [lottie, setLottie] = useState(require("../assets/lottie/couple.json"));

    useEffect(() => {
        if (mode) {
            switch(mode) {
                case "couple":
                    setLottie(require("../assets/lottie/couple.json") );
                    break;
                case "friends":
                    setLottie(require("../assets/lottie/friends.json") );
                    break;
                case "i_never":
                    setLottie(require("../assets/lottie/i_never.json") );
                    break;
            }
        }
    }, [mode])

    return (
        <View style={{ flex: 1 }}>
            <Stack.Screen options={{ headerShown: false }} />
            <View style={{ justifyContent: "center", alignItems: "center", flex: 1, gap: 24 }}>
                <LottieView source={lottie} style={{ width: 200 }} loop={false} autoPlay={true} />
                <TouchableOpacity onPress={() => router.push({ pathname: "names", params: { mode: "couple" } })}>
                    <Image source={require("../assets/boton-parejas.png")} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => router.push({ pathname: "names", params: { mode: "friends" } })}>
                    <Image source={require("../assets/boton-amigos.png")} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => router.push({ pathname: "names", params: { mode: "i_never" } })}>
                    <Image source={require("../assets/boton-yo-nunca.png")} />
                </TouchableOpacity>
            </View>
        </View>
    )
}