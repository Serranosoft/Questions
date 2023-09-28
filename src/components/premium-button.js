import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import LottieView from 'lottie-react-native';
import { ui } from "../utils/styles";

export default function PremiumButton() {

    return (
        <TouchableOpacity style={{marginBottom: 64}} onPress={() => router.push({ pathname: "buy-premium" })}>
            <View style={styles.container}>
                <LottieView
                    source={require("../../assets/lottie/15.json")}
                    style={{ width: 40, height: 40, aspectRatio: 1, }}
                    loop={true}
                    autoPlay={true}
                />
                <Text style={[ui.text, { color: "white", fontWeight: "bold" }]}>ShotAsk Premium</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        top: -10,
        right: -20,
        flexDirection: "row", 
        alignItems: "center", 
        gap: 8, 
        borderTopLeftRadius: 100,
        borderBottomLeftRadius: 100,
        paddingHorizontal: 16,
        paddingVertical: 4,
        backgroundColor: "rgba(0, 0, 0, 0.75)", 
    },
})