import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './screens/Home';
import * as Font from "expo-font";
import { useState, useEffect } from 'react';
import Questions from './screens/Questions';
import 'react-native-url-polyfill/auto';
import Names from './screens/Names';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

export default function App() {

    const Stack = createNativeStackNavigator();
    const [appIsReady, setAppIsReady] = useState(false);

    const getFonts = () => Font.loadAsync({
        heading: require("./assets/fonts/Source_Code_Pro/static/SourceCodePro-SemiBold.ttf"),
        subtitle: require("./assets/fonts/Pragati_Narrow/PragatiNarrow-Regular.ttf"),
        text: require("./assets/fonts/Nunito_Sans/NunitoSans-Regular.ttf")
    });

    useEffect(() => {
        async function prepare() {
            try {
                // Pre-load fonts, make any API calls you need to do here
                getFonts();
            } catch (e) {
                console.warn(e);
            } finally {
                // Tell the application to render
                setAppIsReady(true);
            }
        }

        prepare();
    }, []);

    const hideSplashScreen = async () => {
        await SplashScreen.hideAsync();
    }

    useEffect(() => {
        if (appIsReady) {
            hideSplashScreen();
        }
    }, [appIsReady])

    if (appIsReady) {
        return (

            <NavigationContainer>
                <Stack.Navigator initialRouteName='Home'>
                    <Stack.Screen
                        name="Home"
                        component={Home}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="Questions"
                        component={Questions}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="Names"
                        component={Names}
                        options={{ headerShown: false }}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        );
    }

}
