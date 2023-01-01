import { Image, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import * as Font from "expo-font";
import { useEffect, useRef, useState } from "react";
import { supabase } from "../src/supabaseClient";

export default function Questions({ route }) {

    const { mode, users } = route.params;

    let questionsArr = useRef([]); // Array de preguntas que ya han visto.
    let questionsCount = useRef(0); // Cantidad de preguntas que hay en la base de datos.
    let usersIndex = useRef(0); // Índice para saber que usuario es el que le toca responder.

    const [question, setQuestion] = useState("");
    const [user, setUser] = useState("");

    Font.loadAsync({
        heading: require("../assets/fonts/Source_Code_Pro/static/SourceCodePro-SemiBold.ttf"),
        subtitle: require("../assets/fonts/Pragati_Narrow/PragatiNarrow-Regular.ttf"),
        text: require("../assets/fonts/Nunito_Sans/NunitoSans-Regular.ttf")
    });
    
    // Calcular cantidad de preguntas que hay en base de datos.
    useEffect(() => {
        if (questionsCount == 0) {
            const fetchCount = async () => {
                const { data, count } = await supabase
                    .from(mode)
                    .select('*', { count: 'exact' })
    
                questionsCount = count;
            }
            fetchCount();
        }
    })

    // Al comenzar el juego, se obtiene una pregunta
    useEffect(() => {
        fetchQuestion();
    }, [])

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
        const { data, error } = await supabase
            .from(`random_${mode}`)
            .select("Question")
            .limit(1)
            .single();

        if (data) {
            setQuestion(data.Question);
            fetchUser();

            // Si el usuario ha visto todas las preguntas entonces se reinicia
            if (questionsArr.current.length === questionsCount) {
                questionsArr = [];
            }

            // Controlar que el usuario no se le repita la misma pregunta dos veces en una misma sesión
            if (questionsArr.current.includes(question)) {
                fetchQuestion();
            } else {
                questionsArr.current.push(data.question);
            }

        }

        if (error) {
            console.error("Error");
            console.log(error);
        }
    }

    return (
        <View style={styles.container}>

            <View
                style={{
                    flex: 1,
                }}>
                <Text
                    style={styles.name}>
                    {user}
                </Text>
            </View>

            <View style={styles.card}>
                <Text
                    style={{
                        fontSize: 27.5,
                        fontFamily: "text",
                    }}>
                    {question}
                </Text>

            </View>

            <View
            style={{
                flex: 1,
                justifyContent: "flex-end",
                alignItems: "flex-end",
            }}>
                <TouchableOpacity
                    onPress={() => fetchQuestion()}>
                    <Image
                        style={styles.nextImg}
                        source={require('../assets/next.png')}
                    />
                </TouchableOpacity>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        marginTop: StatusBar.currentHeight,
        backgroundColor: "#F1285F",
        paddingHorizontal: 40,
        paddingVertical: 80,
    },
    name: {
        fontSize: 55,
        color: "white",
        fontFamily: "heading",
        letterSpacing: -5
    },
    card: {
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        backgroundColor: "white",
        paddingVertical: 16,
        paddingHorizontal: 16,
        borderRadius: 8,
    },
    nextImg: {
        width: 90,
        height: 90
    }
})