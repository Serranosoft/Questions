import { Image, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import * as Font from "expo-font";
import { useEffect, useState } from "react";
import { supabase } from "../src/supabaseClient";

export default function Questions({ route }) {

    const { mode } = route.params;

    let questionsArr = [];
    let questionsCount = 0;

    const [question, setQuestion] = useState("");

    Font.loadAsync({
        heading: require("../assets/fonts/Source_Code_Pro/static/SourceCodePro-SemiBold.ttf"),
        subtitle: require("../assets/fonts/Pragati_Narrow/PragatiNarrow-Regular.ttf"),
        text: require("../assets/fonts/Nunito_Sans/NunitoSans-Regular.ttf")
    });
    

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

    const fetchQuestion = async () => {
        const { data, error } = await supabase
            .from(`random_${mode}`)
            .select("Question")
            .limit(1)
            .single();

        if (data) {
            setQuestion(data.Question);

            // 1. Se comprueba si la longitud de la bdd
            // es la misma que la del array questionsArr
            if (questionsArr.length === questionsCount) {
                questionsArr = [];
            }

            if (questionsArr.includes(question)) {
                fetchQuestion();
            } else {
                questionsArr.push(data.question);
            }

        }

        if (error) {
            console.error("Error");
            console.log(error);
        }
    }

    useEffect(() => {
        fetchQuestion();
    }, [])

    return (
        <View style={styles.container}>

            <View
                style={{
                    flex: 1,
                }}>
                <Text
                    style={styles.name}>
                    JAVIER
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