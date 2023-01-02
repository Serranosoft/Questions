import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './screens/Home';
import * as Font from "expo-font";
import Apploading from "expo-app-loading";
import { useState, useEffect } from 'react';
import Questions from './screens/Questions';
import 'react-native-url-polyfill/auto';
import Names from './screens/Names';
import { Audio } from 'expo-av';

export default function App() {

    const Stack = createNativeStackNavigator();
    const [fontsloaded, setFontsLoaded] = useState(false);

    const getFonts = () => Font.loadAsync({
        heading: require("./assets/fonts/Source_Code_Pro/static/SourceCodePro-SemiBold.ttf"),
        subtitle: require("./assets/fonts/Pragati_Narrow/PragatiNarrow-Regular.ttf"),
        text: require("./assets/fonts/Nunito_Sans/NunitoSans-Regular.ttf")
    });

    // const [sound, setSound] = useState();

    // async function playSound() {
    //     const { sound } = await Audio.Sound.createAsync(require('./assets/music.mp3'));
    //     setSound(sound);
    //     sound.setIsLoopingAsync(true);

    //     await sound.playAsync();
    // }

    // useEffect(() => {
    //     playSound();
    // }, [])

    // useEffect(() => {
    //     return sound
    //       ? () => {
    //           sound.unloadAsync();
    //         }
    //       : undefined;
    //   }, [sound]);



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
