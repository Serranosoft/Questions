import { Image, ImageBackground, ScrollView, StatusBar, Text, TextInput, TouchableOpacity, View, Dimensions, Button, StyleSheet } from "react-native";
import { createRef, useRef, useState } from "react";
import { Keyboard } from 'react-native'
import "../src/fonts";
import AdsHandler from "../src/components/AdsHandler";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default function Names({ navigation, route }) {
    const { mode } = route.params;

    const [users, setUser] = useState([]);
    const [userName, setUserName] = useState("");

    let textInput = useRef();

    const adsHandlerRef = createRef();

    function closedIntersitialCallback() {
        navigation.navigate("Questions", { mode: mode, users: users })
    }

    function add() {
        if (userName.length > 0) {
            setUser([...users, userName]);
            Keyboard.dismiss();
            textInput.current.clear();
            setUserName("");
        }
    }

    return (
        <>
            <AdsHandler ref={adsHandlerRef} adType={[0]} closedIntersitialCallback={() => {closedIntersitialCallback()} }/>
            <ImageBackground source={require("../assets/background2.jpg")} resizeMode="cover" style={styles.container}>
                <View style={styles.itemsWrapper}>
                    <View style={styles.headingWrapper}>
                        <Text style={styles.heading}>Apunta el nombre de los jugadores</Text>
                    </View>

                    <View style={styles.inputWrapper}>
                        <TextInput
                            style={styles.input}
                            placeholder="Añade un jugador"
                            onChangeText={text => setUserName(text)}
                            ref={textInput}
                            clearButtonMode="always"
                            onSubmitEditing={() => add()}
                        />
                        <TouchableOpacity style={styles.inputSubmit} onPress={() => add()}>
                            <Image resizeMode="contain" style={styles.inputSubmitImage} source={require("../assets/mas.png")} />
                        </TouchableOpacity>
                    </View>

                    <ScrollView contentContainerStyle={styles.scrollContainerContent} style={styles.scrollContainer}>
                        {
                            users.map((user, index) => (
                                <View style={styles.scrollContainerRow}>
                                    <Text numberOfLines={1} style={styles.scrollContainerRowName}>{user}</Text>
                                    <TouchableOpacity style={styles.scrollContainerRowImageWrapper} onPress={() => {
                                        let usersAux = users.filter((el, i) => i !== index);
                                        setUser(usersAux);
                                    }}>
                                        <Image source={require("../assets/equis.png")} style={styles.scrollContainerRowImage} />
                                    </TouchableOpacity>
                                </View>
                            ))
                        }
                    </ScrollView>

                    <TouchableOpacity /* styles={styles.playButtonWrapper}  */onPress={() => {
                        if (adsHandlerRef.current.isLoadedIntersitial()) {
                            adsHandlerRef.current.showIntersitialAd()
                        } else {
                            navigation.navigate("Questions", { mode: mode, users: users })
                        }
                    }
                    }>
                        <Image source={require("../assets/play.png")} style={styles.playButton} />
                    </TouchableOpacity>
                </View>

                <View style={styles.version}>
                    <Text style={styles.versionText}>v1.1.0</Text>
                </View>

            </ImageBackground>
        </>
    )
}

const win = Dimensions.get('window');
const inputCrossRatio = win.width / 525;

const styles = StyleSheet.create({
    container: {
        width: wp("100%"),
        height: hp("100%"),
        paddingTop: hp("7%"),
        alignItems: "center",
        backgroundColor: "red"
    },
    itemsWrapper: {
        width: wp("100%"),
        height: hp("90%"),
    },
    headingWrapper: {
        width: "90%",
        marginBottom: "5%",
        alignSelf: "center",
    },
    heading: {
        fontFamily: "heading", 
        textAlign: "center",
        color: "#e9eaec",
        fontSize: 45,
        letterSpacing: -1,
    },
    inputWrapper: {
        width: "90%",
        height: "7%",
        marginBottom: "5%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "center",

    },
    input: {
        width: "75%",
        marginRight: "5%",
        backgroundColor: "#e9eaec",
        paddingLeft: 8,
        height: "100%",
        fontSize: 20,
        fontFamily: "heading",
        borderRadius: 16,
    },
    inputSubmit: {
        width: "20%",
    },
    inputSubmitImage: {
        width: "100%", 
        height: "100%"
    },
    scrollContainer: {
        width: "90%",
        height: "50%",
        marginBottom: "5%",
        backgroundColor: "rgba(0,0,0,0.55)",
        borderRadius: 10,
        alignSelf: "center"
    },
    scrollContainerContent: {
        paddingHorizontal: 16,
    },

    scrollContainerRow: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 16
    },
    scrollContainerRowName: {
        width: "85%",
        fontSize: 23, 
        color: "white",
        fontFamily: "heading"
    },
    scrollContainerRowImageWrapper: {
        width: "15%",
    },
    scrollContainerRowImage: {
        width: "100%",
        height: (500 * inputCrossRatio) / 10,
        resizeMode: "contain"
    },
    playButtonWrapper: {
        width: "100%",
        height: hp("10%"),
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "center",

    },
    playButton: {
        width: "75%",
        height: 150,
        resizeMode: "contain",
        alignSelf: "center"

    },
    version: {
        width: wp("100%"),
        height: hp("5%"),
        alignItems: "flex-end",
        paddingHorizontal: 8
    },
    versionText: {
        fontWeight: "bold"
    }
    
})


