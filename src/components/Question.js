import { Dimensions, StyleSheet, Text } from "react-native";
import { Gesture, GestureDetector, GestureHandlerRootView } from "react-native-gesture-handler";
import Animated from "react-native-reanimated";
import { ui } from "../utils/styles";

export default function Question({ question, tap, animatedStyle }) {
    

    return (
        <GestureHandlerRootView style={{ width: "100%"}}>
            <GestureDetector gesture={tap}>
                <Animated.View style={[styles.card, animatedStyle]}>
                    <Text style={[ui.text, styles.question]}>
                        {question}
                    </Text>
                </Animated.View>
            </GestureDetector>
        </GestureHandlerRootView>
    )
}

const styles = StyleSheet.create({

    card: {
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        borderRadius: 20,
        backgroundColor: "white",
    },

    question: {
        fontSize: 27,
    }
    // container: {
    //     width: wp("85%"),
    //     height: hp("40%"),
    //     backgroundColor: "white",
    //     padding: 20,
    //     marginBottom: hp("5%"),
    //     justifyContent: "center",
    //     alignItems: "center",
    //     marginTop: hp("5%"),
    //     borderRadius: 10,
    //     position: "relative",
    // },
    // question: {
    //     fontSize: 30,
    //     fontFamily: "text",
    //     letterSpacing: -1.5,
    // },
    // avatar: {
    //     width: 45,
    //     height: 45,
    //     position: "absolute",
    //     bottom: 0,
    //     right: 0,
    // },
})