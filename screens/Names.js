import { Image, ScrollView, Text, TextInput, TouchableOpacity, View, Dimensions, StyleSheet } from "react-native";
import React, { createRef, useEffect, useRef, useState } from "react";
import { Keyboard } from 'react-native'
import "../src/fonts";
import AdsHandler from "../src/components/AdsHandler";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import LottieView from 'lottie-react-native';

export default function Names({ navigation, route }) {
    const { mode } = route.params;

    const [users, setUser] = useState([]);
    const [userName, setUserName] = useState("");
    const [avatar, setAvatar] = useState(require("../assets/lottie/smily.json") );

    useEffect(() => {
        if (mode) {
            switch(mode) {
                case "couple":
                    setAvatar(require("../assets/lottie/kiss.json") );
                    break;
                case "friends":
                    setAvatar(require("../assets/lottie/smily.json") );
                    break;
                case "i_never":
                    setAvatar(require("../assets/lottie/crazy-tongue.json") );
                    break;
            }
        }
    }, [mode])
    
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
            <View styles={styles.container}>
                <LottieView source={require("../assets/lottie/background-color2.json")} style={styles.lottieBg} loop={true} autoPlay={true} />
                <View style={styles.itemsWrapper}>
                    <View style={styles.headingWrapper}>
                        <Text style={styles.heading}>Jugadores</Text>
                    </View>
                    <View style={styles.inputWrapper}>
                        <TextInput
                            style={styles.input}
                            placeholderTextColor="white" 
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
                                    <LottieView source={avatar} style={styles.scrollContainerRowAvatar} loop={true} autoPlay={true} />
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
                    <TouchableOpacity onPress={() => {
                        if (adsHandlerRef.current.isLoadedIntersitial()) {
                            adsHandlerRef.current.showIntersitialAd()
                        } else {
                            navigation.navigate("Questions", { mode: mode, users: users })
                        }
                    }
                    }>
                        <Image source={require("../assets/boton-jugar.png")} style={styles.playButton} />
                    </TouchableOpacity>
                </View>
                <View style={styles.version}>
                    <Text style={styles.versionText}>v1.1.1</Text>
                </View>
            </View>
        </>
    )
}

const win = Dimensions.get('window');
const inputCrossRatio = win.width / 525;

const styles = StyleSheet.create({
    container: {
        width: wp("100%"),
        height: hp("100%"),
        alignItems: "center",
        // marginTop: hp("7%"),
    },
    lottieBg: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        resizeMode: "cover",
        zIndex: -1
    },
    itemsWrapper: {
        width: wp("100%"),
        height: hp("95%"),
    },
    headingWrapper: {
        width: "90%",
        marginVertical: "10%",
        alignSelf: "center",
    },
    heading: {
        fontFamily: "heading", 
        textAlign: "center",
        color: "#e9eaec",
        fontSize: 48,
    },
    inputWrapper: {
        width: "90%",
        height: "7%",
        marginBottom: "8%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        alignSelf: "center",

    },
    input: {
        width: "75%",
        marginRight: "5%",
        // backgroundColor: "#e9eaec",
        backgroundColor: "rgba(0,0,0,0.55)",
        color: "white",
        paddingLeft: 8,
        height: "100%",
        fontSize: 20,
        fontFamily: "heading",
        borderRadius: 10,
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
        marginVertical: 16,
    },
    scrollContainerRowAvatar: {
        width: "17%",
        marginRight: "5%"
    },
    scrollContainerRowName: {
        width: "65%",
        fontSize: 23, 
        color: "white",
        fontFamily: "heading"
    },
    scrollContainerRowImageWrapper: {
        width: "13%",
    },
    scrollContainerRowImage: {
        width: "100%",
        height: (500 * inputCrossRatio) / 11,
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
        width: "65%",
        height: 150,
        resizeMode: "contain",
        alignSelf: "center"

    },
    version: {
        width: wp("100%"),
        height: hp("5%"),
        alignItems: "flex-end",
        justifyContent: "flex-end",
        paddingHorizontal: 8,
        // backgroundColor: "green"
    },
    versionText: {
        fontWeight: "bold"
    }
    
})


