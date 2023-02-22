import { Dimensions, StyleSheet, Text } from "react-native";
import { Gesture, GestureDetector, GestureHandlerRootView } from "react-native-gesture-handler";
import Animated, { Easing, useAnimatedStyle, useSharedValue, withDelay, withTiming } from "react-native-reanimated";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function Question({ question, fetchQuestion }) {

    const position = useSharedValue(0);

    const tap = Gesture.Pan().runOnJS(true)
        .activeOffsetX([60, 60])
        .onUpdate((e) => {
            position.value = e.translationX;
        })
        .onEnd((e) => {
            if (e.translationX > -60) {
                position.value = withTiming(0, { duration: 400, easing: Easing.ease });
            } else {
                position.value = withTiming(position.value * 10, { duration: 400, easing: Easing.ease });
            }

            if (e.translationX < -60) {
                fetchQuestion();
            }

            setTimeout(() => {
                if (e.translationX < -60) {
                    position.value = Dimensions.get("screen").width;
                    position.value = withDelay(25, withTiming(0, { duration: 300, easing: Easing.ease }))
                }
            }, 250)
        })

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: position.value }],
    }));

    return (
        <GestureHandlerRootView>
            <GestureDetector gesture={tap}>
                <Animated.View style={[styles.container, animatedStyle]}>
                    <Text style={styles.question}>
                        {question}
                    </Text>
                </Animated.View>
            </GestureDetector>
        </GestureHandlerRootView>
    )
}

const styles = StyleSheet.create({
    container: {
        width: wp("85%"),
        height: hp("35%"),
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        marginBottom: hp("5%"),
        marginTop: hp("5%"),
        borderRadius: 10
    },
    question: {
        fontSize: 30,
        fontFamily: "text",
        letterSpacing: -1.5,
    }
})