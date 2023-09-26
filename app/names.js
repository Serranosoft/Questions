import { Stack, router, useLocalSearchParams } from "expo-router";
import { createRef, useContext, useRef, useState } from "react";
import { Image, Keyboard, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { ui } from "../src/utils/styles";
import LottieView from 'lottie-react-native';
import { DataContext } from "../src/utils/DataContext";
import { BannerAd, BannerAdSize, TestIds } from "react-native-google-mobile-ads";
import AdsHandler from "../src/components/AdsHandler";
import OffersHandler from "../src/components/OffersHandler";
import { bannerId } from "../src/utils/constants";

export default function Names() {

    const { users, setUser } = useContext(DataContext);

    const { mode } = useLocalSearchParams();
    const { premium } = OffersHandler();

    const [username, setUsername] = useState("");
    const input = useRef();

    function addUser() {
        if (username.length > 0) {
            setUser([...users, username ]);
            Keyboard.dismiss();
            input.current.clear();
            setUsername("");
        }
    }

    const adsHandlerRef = createRef();
    function closedIntersitialCallback() {
        router.push({ pathname: "questions", params: { users: JSON.stringify(users), mode: mode } })
    }

    function startGame() {
        if (adsHandlerRef.current.isLoadedIntersitial()) {
            adsHandlerRef.current.showIntersitialAd()
        } else {
            router.push({ pathname: "questions", params: { users: JSON.stringify(users), mode: mode } })
        }
    }

    return (
        <>
            <AdsHandler ref={adsHandlerRef} adType={[0]} closedIntersitialCallback={() => { closedIntersitialCallback() }} />
            <View style={styles.container}>
                <Stack.Screen options={{ headerShown: false }} />
                <View style={styles.inputWrapper}>
                    <View style={styles.avatarWrapper}>
                        <Image style={styles.actionImg} source={require("../assets/pencil.png")} resizeMode="contain" />
                        <TextInput
                            style={styles.input}
                            placeholderTextColor="black"
                            placeholder="Añade un jugador"
                            onChangeText={text => setUsername(text)}
                            ref={input}
                            clearButtonMode="always"
                            onSubmitEditing={addUser}
                        />
                    </View>
                    <TouchableOpacity onPress={addUser}>
                        <Image style={styles.inputBtn} resizeMode="contain" source={require("../assets/mas.png")} />
                    </TouchableOpacity>
                </View>
                {!premium && <BannerAd unitId={TestIds.BANNER} size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER} requestOptions={{}} />}
                <ScrollView style={styles.scrollContainer}>
                    {
                        users.map((user, index) => (
                            <View style={styles.userRow} key={index}>
                                <Text numberOfLines={1} style={[ui.text, { maxWidth: 200 }]}>{user}</Text>
                                <TouchableOpacity style={styles.scrollContainerRowImageWrapper} onPress={() => {
                                    const usersAux = users.filter((_, i) => i !== index);
                                    setUser(usersAux);
                                }}>
                                    <Image source={require("../assets/equis.png")} style={styles.actionImg} resizeMode="contain" />
                                </TouchableOpacity>
                            </View>
                        ))
                    }
                </ScrollView>
                {users.length > 0 &&
                    <TouchableOpacity onPress={startGame}>
                        <Image source={require("../assets/boton-jugar.png")} />
                    </TouchableOpacity>
                }

            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
        gap: 8
    },

    inputWrapper: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 8,
    },

    avatarWrapper: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
        borderWidth: 3,
        borderColor: "#9362A3",
        borderRadius: 20,
    },

    actionImg: {
        width: 35,
        height: 35,
        marginLeft: 10,
    },

    input: {
        flex: 1,
        height: 55,
        paddingLeft: 8,
        fontSize: 22,
        color: "black",
    },

    inputBtn: {
        width: 55,
        height: 55,
    },

    scrollContainer: {
        backgroundColor: "white",
        flex: 1,
        width: "100%",
        borderWidth: 3,
        borderColor: "#9362A3",
        borderRadius: 20,
    },

    userRow: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderColor: "lightgray"
    },

    lottie: {
        width: 57,
        aspectRatio: 1,
        marginLeft: -6,
    }
})