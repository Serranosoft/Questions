import { StyleSheet, View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { createRef, useContext, useEffect, useState } from 'react';
import Question from '../src/components/Question';
import InAppReviewHandler from '../src/components/InAppReviewHandler';
import AdsHandler from '../src/components/AdsHandler';
import OffersHandler from '../src/components/OffersHandler';
import retrieveQuestions from '../src/utils/data';
import { createObjectFromArray, shuffleArr } from '../src/utils/scripts';
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';
import { DataContext } from '../src/utils/DataContext';

export default function Questions() {

    const { users, mode } = useLocalSearchParams();
    const { askForReview } = InAppReviewHandler();
    const { premium } = OffersHandler();
    const { lang } = useContext(DataContext);

    const [allQuestions, setAllQuestions] = useState([]);
    const [questions, setQuestions] = useState([]);
    const [players, setPlayers] = useState([]);
    const [readed, setReaded] = useState(1);
    const [hasToRotate, setHasToRotate] = useState(true);
    const [triggerAd, setTriggerAd] = useState(0);

    const adsHandlerRef = createRef();

    // Al obtener todas las preguntas, actualiza el estado para mostrar 8 preguntas.
    useEffect(() => {
        if (allQuestions.length < 1) {
            const arrTmp = retrieveQuestions(mode, lang.locale);
            const shuffled = shuffleArr(arrTmp);
            const objArr = createObjectFromArray(shuffled);
            setAllQuestions(objArr)
        }
    }, [])

    useEffect(() => {
        if (allQuestions.length > 0) {
            const playersAux = [];
            for (let i = 0; i < allQuestions.length; i++) {
                playersAux.push(JSON.parse(users)[i % JSON.parse(users).length]);
            }

            setPlayers(playersAux)
            setQuestions(allQuestions.splice(0, 8));
        }
    }, [allQuestions])

    // Actualización de las preguntas leídas
    useEffect(() => {
        setTriggerAd((trigger) => trigger + 1);
        if (condition = questions.length - readed === 3) {
            const remaining = questions.slice(0, questions.length - 4); // 3 preguntas restantes + la pregunta actual
            const newQuestions = allQuestions.splice(0, 4); // 4 Preguntas nuevas
            setReaded(1);
            setQuestions([...newQuestions, ...remaining]);
            setHasToRotate(false);

        }
    }, [readed])

    // Comprueba si se ha llegado al final de la partida.
    useEffect(() => {
        if (questions.length > 0 && allQuestions.length > 0) {
            if (questions.length >= allQuestions.length) {
                // allQuestions debe recargarse de nuevo.
                const arrTmp = retrieveQuestions(mode);
                const shuffled = shuffleArr(arrTmp);
                const objArr = createObjectFromArray(shuffled);
                setAllQuestions(objArr)
            }
        }
    }, [questions])

    // Actualización de estado de los anuncios
    useEffect(() => {
        if (triggerAd === 4) {
            adsHandlerRef.current.showIntersitialAd();
            setTriggerAd(0)
        } else if (triggerAd === 3) {
            askForReview();
        }
    }, [triggerAd])

    return (
        <>
            <AdsHandler ref={adsHandlerRef} adType={[0]} />
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center", width: "100%", gap: 40, position: "relative" }}>
                {!premium && <BannerAd unitId={TestIds.BANNER} size={BannerAdSize.LARGE_BANNER} requestOptions={{ requestNonPersonalizedAdsOnly: false }} />}
                <View style={styles.questionsWrapper}>
                    <View style={styles.inner}></View>
                    {questions.map((element, index) => {
                        let rotation = 0;
                        if (index === questions.length - 1 && hasToRotate) {
                            rotation = Math.random() * 10 - 15;
                        }
                        return <Question question={element["question"]} rotation={rotation} setReaded={setReaded} key={element["id"]} user={players[index]} />
                    })}
                </View>
                {!premium && <BannerAd unitId={TestIds.BANNER} size={BannerAdSize.BANNER} requestOptions={{}} />}
            </View>
        </>

    )
}

const styles = StyleSheet.create({

    questionsWrapper: {
        position: "relative",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
    },

    inner: {
        position: "absolute",
        width: 270,
        height: 270,
        borderRadius: 250,
        backgroundColor: "rgba(0,0,0,.4)",
    },

    img: {
        aspectRatio: 1,
        width: 150,
        height: 150,
    },
});