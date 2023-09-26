import { StyleSheet, Text, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, { Easing, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { ui } from "../utils/styles";

export default function Question({ question, rotation, setReaded, user }) {

    const offset = useSharedValue({ x: 0, y: 0 });
    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);
    const rotateZ = useSharedValue(rotation);

    const gesture = Gesture.Pan().runOnJS(true)
        .onStart(() => {
            offset.value = { x: translateX.value, y: translateY.value };
            rotateZ.value = withTiming(0);
        })
        .onUpdate(({ translationX, translationY }) => {
            translateX.value = offset.value.x + translationX;
            translateY.value = offset.value.y + translationY;
        })
        .onEnd(({ translationX }) => {
            if (translationX > 50 || translationX < -50) {
                translateX.value = withTiming(translateX.value * 10, { duration: 400, easing: Easing.ease });
                setTimeout(() => setReaded((readed) => readed + 1), 1);
            }
        });

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [
            { translateX: translateX.value },
            { translateY: translateY.value },
            { rotateY: `${rotateZ.value / 10}deg` },
            { rotateZ: `${rotateZ.value}deg` },
        ],
    }));

    return (
        <View style={styles.container} pointerEvents="box-none">
            <GestureDetector gesture={gesture}>
                <Animated.View style={[styles.card, animatedStyle]}>

                    <Text style={[ui.text, styles.name]} numberOfLines={2}>{user}</Text>

                    <View style={styles.inner}></View>
                    <Text style={[ui.text, styles.question]}>
                        {question}
                    </Text>

                </Animated.View>
            </GestureDetector>
        </View>
    )
}

const styles = StyleSheet.create({

    container: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: "center",
        alignItems: "center",
    },

    card: {
        position: "relative",
        backgroundColor: "white",
        borderRadius: 10,
        width: 320,
        height: 240,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 3,
        borderColor: "#9362A3",
        gap: 24
    },

    inner: {
        width: "97%",
        height: "97%",
        borderRadius: 15,
        borderWidth: 2,
        borderColor: "#9362A3",
        position: "absolute",
    },

    question: {
        fontSize: 24,
        paddingHorizontal: 24,
        textAlign: "center",
    },

    user: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
    },

    name: {
        fontSize: 30,
        color: "#000",
        fontWeight: "bold",
        textAlign: "center",
    },
})