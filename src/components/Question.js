import { Dimensions, StyleSheet, Text } from "react-native";
import { Gesture, GestureDetector, GestureHandlerRootView } from "react-native-gesture-handler";
import Animated, { Easing, useAnimatedStyle, useSharedValue, withDelay, withTiming } from "react-native-reanimated";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import LottieView from 'lottie-react-native';
import { useEffect, useState } from "react";

export default function Question({ question, fetchQuestion, mode }) {
    
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

    const [avatar, setAvatar] = useState(require("../../assets/lottie/smily.json") );

    useEffect(() => {
        if (mode) {
            switch(mode) {
                case "couple":
                    setAvatar(require("../../assets/lottie/kiss.json") );
                    break;
                case "friends":
                    setAvatar(require("../../assets/lottie/smily.json") );
                    break;
                case "i_never":
                    setAvatar(require("../../assets/lottie/crazy-tongue.json") );
                    break;
            }
        }
    }, [mode])

    return (
        <GestureHandlerRootView>
            <GestureDetector gesture={tap}>
                <Animated.View style={[styles.container, animatedStyle]}>
                    <Text style={styles.question}>
                        {question}
                    </Text>
                    <LottieView source={avatar} style={styles.avatar} loop={true} autoPlay={true} />
                </Animated.View>
            </GestureDetector>
        </GestureHandlerRootView>
    )
}

const styles = StyleSheet.create({
    container: {
        width: wp("85%"),
        height: hp("40%"),
        backgroundColor: "white",
        padding: 20,
        marginBottom: hp("5%"),
        justifyContent: "center",
        alignItems: "center",
        marginTop: hp("5%"),
        borderRadius: 10,
        position: "relative",
    },
    question: {
        fontSize: 30,
        fontFamily: "text",
        letterSpacing: -1.5,
    },
    avatar: {
        width: 45,
        height: 45,
        position: "absolute",
        bottom: 0,
        right: 0,
    },
})