import { Slot, SplashScreen } from "expo-router";
import { View, StatusBar, StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useEffect, useState } from "react";
import { MobileAds } from 'react-native-google-mobile-ads';
import LottieView from 'lottie-react-native';
import { useFonts } from "expo-font";
import { DataContext } from "../src/utils/DataContext";

SplashScreen.preventAutoHideAsync();
export default function Layout() {

    // Carga de fuentes.
    const [fontsLoaded] = useFonts({
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
        <View style={styles.container}>
            <LottieView source={require("../assets/lottie/background-color2.json")} style={styles.lottieBg} loop={true} autoPlay={true} />
            <GestureHandlerRootView style={styles.wrapper}>
                <DataContext.Provider value={{ users: users, setUser: setUser }}>
                    <Slot />
                </DataContext.Provider>
            </GestureHandlerRootView>
            <StatusBar style="light" />
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        marginTop: StatusBar.currentHeight, 
        position: "relative", 
        justifyContent: "center"
    },

    wrapper: {
        flex: 0.89, 
        width: "100%", 
        alignSelf: "center", 
        justifyContent: "center", 
        paddingHorizontal: 20
    },

    lottieBg: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        resizeMode: "cover",
        zIndex: -1
    },
})