import { Slot, SplashScreen } from "expo-router";
import { View, StatusBar, StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useCallback, useEffect, useState } from "react";
import { MobileAds } from 'react-native-google-mobile-ads';
import LottieView from 'lottie-react-native';
import { useFonts } from "expo-font";
import { DataContext } from "../src/utils/DataContext";

SplashScreen.preventAutoHideAsync();

export default function Layout() {

    // Carga de fuentes.
    const [fontsLoaded] = useFonts({
        "Chewy": require("../assets/fonts/Chewy/Chewy-Regular.ttf"),
        "Nunito": require("../assets/fonts/Nunito_Sans/NunitoSans-Regular.ttf"),
    });

    const [users, setUser] = useState([]);

    useEffect(() => {
        if (fontsLoaded) {
            SplashScreen.hideAsync();
        }
    }, [fontsLoaded])

    if (!fontsLoaded) {
        return null;
    }

    MobileAds()
        .initialize()
        .then(adapterStatuses => {
            // Initialization complete!
        });

    return (
        <View style={{ flex: 1, marginTop: StatusBar.currentHeight, position: "relative", justifyContent: "center" }}>
            <LottieView source={require("../assets/lottie/background-color2.json")} style={styles.lottieBg} loop={true} autoPlay={true} />
            <GestureHandlerRootView style={{ flex: 0.87, width: "90%", alignSelf: "center", justifyContent: "center" }}>
                <DataContext.Provider value={{ users: users, setUser: setUser }}>
                    <Slot />
                </DataContext.Provider>
            </GestureHandlerRootView>
            <StatusBar style="light" />
        </View >
    )
}

const styles = StyleSheet.create({
    lottieBg: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        resizeMode: "cover",
        zIndex: -1
    },
})