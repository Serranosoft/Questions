import { TouchableOpacity, View, Image } from "react-native";
import { Stack, router, useLocalSearchParams } from "expo-router";
import { app } from "../src/utils/styles";
import LottieView from 'lottie-react-native';
import { useEffect, useState } from "react";

export default function AuxiliarMenu() {

    const { mode } = useLocalSearchParams();

    return (
        <View style={{ flex: 1 }}>
            <Stack.Screen options={{ headerShown: false }} />
            <View style={{ justifyContent: "center", alignItems: "center", flex: 1, gap: 55 }}>

                {
                    mode === "questions" &&
                    <>
                        <TouchableOpacity onPress={() => router.push({ pathname: "names", params: { mode: "couple" } })}>
                            <Image source={require("../assets/boton-parejas.png")} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => router.push({ pathname: "names", params: { mode: "friends" } })}>
                            <Image source={require("../assets/boton-amigos.png")} />
                        </TouchableOpacity>
                    </>
                }
                {
                    mode === "challenges" &&
                    <TouchableOpacity onPress={() => router.push({ pathname: "names", params: { mode: "adult" } })}>
                        <Image source={require("../assets/boton-mas-18.png")} />
                    </TouchableOpacity>
                }

            </View>
        </View>
    )
}