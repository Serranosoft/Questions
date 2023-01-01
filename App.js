import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import Home from './screens/Home';
import * as Font from "expo-font";
import Apploading from "expo-app-loading";
import { useState } from 'react';
import Questions from './screens/Questions';
import 'react-native-url-polyfill/auto';
import Names from './screens/Names';

export default function App() {

    const Stack = createNativeStackNavigator();
    const [fontsloaded, setFontsLoaded] = useState(false);

    const getFonts = () => Font.loadAsync({
        heading: require("./assets/fonts/Source_Code_Pro/static/SourceCodePro-SemiBold.ttf"),
        subtitle: require("./assets/fonts/Pragati_Narrow/PragatiNarrow-Regular.ttf"),
        text: require("./assets/fonts/Nunito_Sans/NunitoSans-Regular.ttf")
    });



    if (fontsloaded) {
        return (
            
            <NavigationContainer>
                <Stack.Navigator>
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
    } else {
        return (
            <Apploading
                startAsync={getFonts}
                onFinish={() => {
                    setFontsLoaded(true);
                }}
                onError={console.warn}
            />
        );
    }
}
