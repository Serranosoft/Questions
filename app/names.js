import { Stack, router, useLocalSearchParams } from "expo-router";
import { createRef, useContext, useRef, useState } from "react";
import { Image, Keyboard, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { ui } from "../src/utils/styles";
import LottieView from 'lottie-react-native';
import { DataContext } from "../src/utils/DataContext";
import { BannerAd, BannerAdSize, TestIds } from "react-native-google-mobile-ads";
import AdsHandler from "../src/components/AdsHandler";
import OffersHandler from "../src/components/OffersHandler";

export default function Names() {

    const { users, setUser } = useContext(DataContext);

    const { mode } = useLocalSearchParams();
    const { premium } = OffersHandler();

    const avatars = [
        "https://ukgelqpfnlytdjdnyrcd.supabase.co/storage/v1/object/public/animations/1.json",
        "https://ukgelqpfnlytdjdnyrcd.supabase.co/storage/v1/object/public/animations/2.json",
        "https://ukgelqpfnlytdjdnyrcd.supabase.co/storage/v1/object/public/animations/3.json",
        "https://ukgelqpfnlytdjdnyrcd.supabase.co/storage/v1/object/public/animations/4.json",
        "https://ukgelqpfnlytdjdnyrcd.supabase.co/storage/v1/object/public/animations/5.json",
        "https://ukgelqpfnlytdjdnyrcd.supabase.co/storage/v1/object/public/animations/6.json",
        "https://ukgelqpfnlytdjdnyrcd.supabase.co/storage/v1/object/public/animations/7.json",
        "https://ukgelqpfnlytdjdnyrcd.supabase.co/storage/v1/object/public/animations/8.json",
        "https://ukgelqpfnlytdjdnyrcd.supabase.co/storage/v1/object/public/animations/9.json",
        "https://ukgelqpfnlytdjdnyrcd.supabase.co/storage/v1/object/public/animations/10.json",
        "https://ukgelqpfnlytdjdnyrcd.supabase.co/storage/v1/object/public/animations/11.json",
        "https://ukgelqpfnlytdjdnyrcd.supabase.co/storage/v1/object/public/animations/12.json",
        "https://ukgelqpfnlytdjdnyrcd.supabase.co/storage/v1/object/public/animations/13.json",
        "https://ukgelqpfnlytdjdnyrcd.supabase.co/storage/v1/object/public/animations/14.json",
        "https://ukgelqpfnlytdjdnyrcd.supabase.co/storage/v1/object/public/animations/15.json",
        "https://ukgelqpfnlytdjdnyrcd.supabase.co/storage/v1/object/public/animations/16.json",
        "https://ukgelqpfnlytdjdnyrcd.supabase.co/storage/v1/object/public/animations/17.json",
    ]

    const [username, setUsername] = useState("");
    const input = useRef();

    function addUser() {
        if (username.length > 0) {
            const random = Math.floor(Math.random() * avatars.length);
            const avatar = avatars[random];
            setUser([...users, { name: username, avatar: avatar }]);
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
                                <LottieView source={{ uri: user.avatar }} style={styles.lottie} loop={true} autoPlay={true} />
                                <Text numberOfLines={1} style={[ui.text, { maxWidth: 200 }]}>{user.name}</Text>
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