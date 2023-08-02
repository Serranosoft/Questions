import { Dimensions } from "react-native";
import { Gesture } from "react-native-gesture-handler";
import { Easing, useAnimatedStyle, useSharedValue, withDelay, withTiming } from "react-native-reanimated";

export default function QuestionsAnimationHandler({ fetchQuestion }) {


    const position = useSharedValue(0);
    const scale = useSharedValue(1);
    const tap = Gesture.Pan().runOnJS(true)
        .activeOffsetX([60, 60])
        .onUpdate((e) => {
            position.value = e.translationX;
            if (e.translationX < 0) {
                scale.value = 1 + e.translationX / 250;
            }
        })
        .onEnd((e) => {
            if (e.translationX > -60) {
                position.value = withTiming(0, { duration: 400, easing: Easing.ease });
                scale.value = withTiming(1, { duration: 400, easing: Easing.ease });
            } else {
                position.value = withTiming(position.value * 10, { duration: 400, easing: Easing.ease });
                scale.value = withTiming(scale.value / 10, { duration: 400, easing: Easing.ease });
            }

            setTimeout(() => {
                if (e.translationX < -60) {
                    position.value = Dimensions.get("screen").width;
                    position.value = withDelay(25, withTiming(0, { duration: 300, easing: Easing.ease }))
                    scale.value = withDelay(25, withTiming(1, { duration: 400, easing: Easing.ease }));
                    fetchQuestion();
                }
            }, 250)
        })

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: position.value }],
    }));

    const animatedScale = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }]
    }))


    return {
        tap: tap,
        position: position,
        scale: scale,
        animatedScale: animatedScale,
        animatedStyle: animatedStyle
    }

}