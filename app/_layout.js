import { Slot, SplashScreen } from "expo-router";
import { View, StatusBar, StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useEffect, useState } from "react";
import LottieView from 'lottie-react-native';
import { useFonts } from "expo-font";
import { DataContext } from "../src/utils/DataContext";
import { translations } from "../src/utils/localizations";
import * as Localization from "expo-localization";
import { I18n } from 'i18n-js'
import * as Notifications from 'expo-notifications';

SplashScreen.preventAutoHideAsync();
export default function Layout() {

    // Carga de fuentes.
    const [fontsLoaded] = useFonts({
        "Nunito": require("../assets/fonts/Nunito_Sans/NunitoSans-Regular.ttf"),
    });

    const [users, setUser] = useState([]);

    // Gestión de traducciones
    const [locale, setLocale] = useState(Localization.locale);
    const i18n = new I18n(translations);
    i18n.locale = locale;
    i18n.enableFallback = true
    i18n.defaultLocale = "es";

    useEffect(() => {
        if (fontsLoaded) {
            SplashScreen.hideAsync();
        }
    }, [fontsLoaded])

    
    useEffect(() => {
        Notifications.setNotificationHandler({
            handleNotification: async () => ({
                shouldShowAlert: true,
                shouldPlaySound: false,
                shouldSetBadge: false,
            }),
        });
    }, [])
    
    if (!fontsLoaded) {
        return null;
    }
    
    return (
        <View style={styles.container}>
            <LottieView source={require("../assets/lottie/background-color2.json")} style={styles.lottieBg} loop={true} autoPlay={true} />
            <GestureHandlerRootView style={styles.wrapper}>
                <DataContext.Provider value={{ users: users, setUser: setUser, lang: i18n, setLocale: setLocale }}>
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