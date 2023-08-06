import { StyleSheet, Text } from "react-native";
import { GestureDetector, GestureHandlerRootView } from "react-native-gesture-handler";
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
})