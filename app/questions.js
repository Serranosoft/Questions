import { ui } from '../src/utils/styles';
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { createRef, useEffect, useRef, useState } from 'react';
import LottieView from 'lottie-react-native';
import { supabase } from "../src/supabaseClient";
import Question from '../src/components/Question';
import Animated, { Easing, withDelay, withTiming } from 'react-native-reanimated';
import { getRandomObjectFromArray } from '../src/utils/scripts';
import QuestionsAnimationHandler from '../src/components/QuestionsAnimationHandler';
import InAppReviewHandler from '../src/components/InAppReviewHandler';
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';
import AdsHandler from '../src/components/AdsHandler';
import { bannerId } from '../src/utils/constants';
import OffersHandler from '../src/components/OffersHandler';

export default function Questions() {

    const { users, mode } = useLocalSearchParams();

    const [user, setUser] = useState(null);
    const [question, setQuestion] = useState("");
    const [questions, setQuestions] = useState([]);
    const [triggerAd, setTriggerAd] = useState(0);


    const questionsArr = useRef([]); // Array de preguntas que ya han visto.
    const questionsCount = useRef(0); // Cantidad de preguntas que hay en la base de datos.
    const usersIndex = useRef(0);
    const adsHandlerRef = createRef();

    const { tap, position, scale, animatedScale, animatedStyle } = QuestionsAnimationHandler({ fetchQuestion });
    const { askForReview } = InAppReviewHandler();
    const { premium } = OffersHandler();

    // Calcular cantidad de preguntas que hay en base de datos.
    useEffect(() => {
        if (questionsCount.current == 0) {
            const fetchCount = async () => {
                const { count } = await supabase.from(mode).select('*', { count: 'exact' })
                questionsCount.current = count;
            }
            fetchCount();
        }
    })

    // Al comenzar el juego, se obtienen todas las preguntas
    useEffect(() => {
        async function getAllQuestions() {
            if (questions.length < 1) {
                await supabase.from(`random_${mode}`).select("Question").then(result => setQuestions(result.data));
            }
        }
        getAllQuestions();
    }, [])

    // Al obtener todas las preguntas, se escoge una y selecciona el primer jugador.
    useEffect(() => {
        if (questions.length > 0) {
            fetchQuestion();
        }
    }, [questions])

    useEffect(() => {
        if (triggerAd === 4) {
            adsHandlerRef.current.showIntersitialAd();
            setTriggerAd(0)
        } else if (triggerAd === 3) {
            askForReview();
        }
    }, [triggerAd])

    // Selecciona una pregunta, carga el usuario actual y renderiza en pantalla.
    function fetchQuestion() {
        const question = getRandomObjectFromArray(questions).Question;

        // Comprobar si ya ha leído todas las preguntas.
        if (questionsArr.current.length === questionsCount) {
            questionsArr.current = [];
        } else if (questionsArr.current.includes(question)) {
            fetchQuestion();
        } else {
            questionsArr.current.push(question);
            fetchUser();
            setQuestion(question);
            setTriggerAd(() => triggerAd + 1); // Sumamos 1 para saber cuando mostrar un anuncio nuevo
        }
    }

    // Mostrar el usuario actual.
    function fetchUser() {
        const usersParsed = JSON.parse(users);
        const nextUser = usersParsed[usersIndex.current];

        usersIndex.current++;
        usersIndex.current == usersParsed.length ? usersIndex.current = 0 : null;

        setUser(nextUser);
    }

    // Animación y fetchQuestion si pulsa en el botón
    function slideBtn() {
        position.value = withTiming(-60 * 10, { duration: 400, easing: Easing.ease });
        scale.value = withTiming(1 + -265 / 250, { duration: 400, easing: Easing.ease });

        setTimeout(() => {
            position.value = Dimensions.get("screen").width;
            position.value = withDelay(25, withTiming(0, { duration: 300, easing: Easing.ease }))
            scale.value = withDelay(25, withTiming(1, { duration: 400, easing: Easing.ease }));
            fetchQuestion();
        }, 250)
    }


    return (

        user ?
            <>
                <AdsHandler ref={adsHandlerRef} adType={[0]} />
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center", width: "100%", gap: 40 }}>
                    
                    <Animated.View style={[animatedScale, styles.user]}>
                        <LottieView source={{ uri: user.avatar }} style={styles.lottie} loop={false} autoPlay={false} />
                        <Text style={[ui.text, styles.name]} numberOfLines={2}>{user.name}</Text>
                    </Animated.View>

                    {!premium && <BannerAd unitId={TestIds.BANNER/* bannerId */} size={BannerAdSize.LARGE_BANNER} requestOptions={{}} /> }

                    <Question question={question} tap={tap} animatedStyle={animatedStyle} fetchQuestion={fetchQuestion} />

                    {!premium && <BannerAd unitId={TestIds.BANNER/* bannerId */} size={BannerAdSize.BANNER} requestOptions={{}} /> }

                    <TouchableOpacity style={{ alignSelf: "center" }} onPress={slideBtn}>
                        <Image style={styles.img} resizeMode="contain" source={require('../assets/siguiente.png')} />
                    </TouchableOpacity>
                </View>
            </>
            :
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <LottieView source={require("../assets/lottie/loading.json")} style={{width: 250, height: 250, }} loop={true} autoPlay={true} />
            </View>

    )
}

const styles = StyleSheet.create({

    user: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
    },

    lottie: {
        width: 95,
        height: 95,
        aspectRatio: 1,
    },

    name: {
        fontSize: 38,
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
    },

    img: {
        aspectRatio: 1,
        width: 150,
        height: 150,
    }
});