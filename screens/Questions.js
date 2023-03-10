import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { createRef, useEffect, useRef, useState } from "react";
import { supabase } from "../src/supabaseClient";
import "../src/fonts";
import { BannerAd, BannerAdSize } from 'react-native-google-mobile-ads';
import InAppReview from 'react-native-in-app-review';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Question from "../src/components/Question"
import AdsHandler from "../src/components/AdsHandler"
import { bannerId } from "../src/utils/constants"
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import LottieView from 'lottie-react-native';

InAppReview.isAvailable();

export default function Questions({ route }) {

    const { mode, users } = route.params;

    let questionsArr = useRef([]); // Array de preguntas que ya han visto.
    let questionsCount = useRef(0); // Cantidad de preguntas que hay en la base de datos.
    let usersIndex = useRef(0); // Índice para saber que usuario es el que le toca responder.

    const [triggerAd, setTriggerAd] = useState(0);
    const [question, setQuestion] = useState("");
    const [user, setUser] = useState("");

    const adsHandlerRef = createRef();

    // Calcular cantidad de preguntas que hay en base de datos.
    useEffect(() => {
        if (questionsCount.current == 0) {
            const fetchCount = async () => {
                const { data, count } = await supabase
                    .from(mode)
                    .select('*', { count: 'exact' })

                questionsCount.current = count;
            }
            fetchCount();
        }
    })

    // Al comenzar el juego, se obtiene una pregunta
    useEffect(() => {
        fetchQuestion();
    }, [])

    useEffect(() => {
        if (triggerAd === 20) {
            adsHandlerRef.current.showIntersitialAd();
            setTriggerAd(0)
        } else if (triggerAd === 17) {
            askForReview();
        }
    }, [triggerAd])

    // Mostrar el usuario actual.
    function fetchUser() {

        let nextUser = users[usersIndex.current];
        usersIndex.current++;

        if (usersIndex.current == users.length) {
            usersIndex.current = 0;
        }

        setUser(nextUser);
    }

    // Mostrar la pregunta
    const fetchQuestion = async () => {

        const {data, error} = await supabase
        .from(`random_${mode}`)
        .select("Question")
        .limit(1)
        .single()

        if (data) {
            // Comprobar si ya ha leído todas las preguntas.
            if (questionsArr.current.length === questionsCount) {
                questionsArr.current = [];
            } else if (questionsArr.current.includes(data.Question)) {
                fetchQuestion();
            } else {
                questionsArr.current.push(data.Question);
                fetchUser(); // Cambia de jugador
                setQuestion(data.Question); // Agrega la pregunta a la tarjeta
                setTriggerAd(() => triggerAd + 1); // Sumamos 1 para saber cuando mostrar un anuncio nuevo

            }
        } else if (error) {
            console.error(error);
        }
    }

    async function askForReview() {

        const dateStorage = await AsyncStorage.getItem("@launch-app-review");
        if (dateStorage) {
            // Si existe asyncStorage, entonces comprobar si cumple la condición y entonces mostrar el rating modal.
            if (new Date().getTime() >= parseInt(JSON.parse(dateStorage))) {
                showRatingModal();
                let date = new Date();
                date.setDate(new Date().getDate() + 10);
                await AsyncStorage.setItem("@launch-app-review", JSON.stringify(date.getTime()));    
            }
        } else {
            // Si no existe asyncStorage, entonces implementarlo y mostrar el rating modal.
            showRatingModal();
            let date = new Date();
            date.setDate(new Date().getDate() + 10);
            await AsyncStorage.setItem("@launch-app-review", JSON.stringify(date.getTime()));
        }

    }

    async function showRatingModal() {
        InAppReview.RequestInAppReview().then(async () => {

        }).catch((error) => {
            console.log(error);
        });
    }

    return (
        <>
            <AdsHandler ref={adsHandlerRef} adType={[0]} />
            <View style={styles.container}>
                <LottieView source={require("../assets/lottie/background-color2.json")} style={styles.lottieBg} loop={true} autoPlay={true} />
                <View style={styles.itemsWrapper}>
                    <View style={styles.nameWrapper}>
                        <Text numberOfLines={2} style={styles.name}>
                            {user}
                        </Text>
                    </View>

                    <BannerAd
                        unitId={bannerId/* TestIds.BANNER */}
                        size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
                        requestOptions={{
                            requestNonPersonalizedAdsOnly: true,
                        }}
                    />

                    <Question question={question} fetchQuestion={() => fetchQuestion()} mode={mode} />

                    <TouchableOpacity onPress={() => fetchQuestion()} style={styles.nextBtnWrapper}>
                        <Image style={styles.nextBtn} source={require('../assets/siguiente.png')} />
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
const nextBtnRatio = win.width / 527;

const styles = StyleSheet.create({
    container: {
        width: wp("100%"),
        height: hp("100%"),
        paddingTop: hp("5%"),
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
        height: hp("90%"),
        alignItems: "center",
    },
    nameWrapper: {
        height: "10%",
        width: "85%",
        marginBottom: "5%",
    },
    name: {
        fontSize: 55,
        color: "#e9eaec",
        fontFamily: "heading",
        textAlign: "center",
    },
    nextBtnWrapper: {
        alignItems: "center",
    },
    nextBtn: {
        width: win.width / 3,
        height: (500 * nextBtnRatio) / 3,
        resizeMode: "contain",
    },
    version: {
        width: wp("100%"),
        height: hp("5%"),
        alignItems: "flex-end",
        justifyContent: "flex-end",
        paddingHorizontal: 8,
    },
    versionText: {
        fontWeight: "bold"
    }

})