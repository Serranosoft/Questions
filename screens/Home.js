import { Dimensions, Image, ImageBackground, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import "../src/fonts";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import LottieView from 'lottie-react-native';

export default function Home({ navigation }) {

    return (
        <View style={styles.container}>
            <LottieView source={require("../assets/lottie/background-color2.json")} style={styles.lottieBg} loop={true} autoPlay={true} />
            <View style={styles.menu}>
                <Image source={require("../assets/logo-new.jpg")} style={styles.logo} 
                />
                <TouchableOpacity
                    onPress={() =>
                        navigation.navigate("Names", { mode: 'couple' })
                    }>
                    <Image source={require("../assets/boton-parejas.png")} style={styles.button} />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() =>
                        navigation.navigate("Names", { mode: 'friends' })
                    }>
                    <Image source={require("../assets/boton-amigos.png")} style={styles.button} />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() =>
                        navigation.navigate("Names", { mode: 'i_never' })
                    }>
                    <Image source={require("../assets/boton-yo-nunca.png")} style={styles.button} />
                </TouchableOpacity>
            </View>

            <View style={styles.version}>
                <Text style={styles.versionText}>v1.1.0</Text>
            </View>
        </View>
    )
}

const win = Dimensions.get('window');
const logoRatio = win.width/512;

const btnRatio = win.width/322;

const styles = StyleSheet.create({
    container: {
        width: wp("100%"),
        height: hp("100%"),
    },
    lottieBg: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        resizeMode: "cover",
        zIndex: -1
    },
    menu: {
        width: "100%",
        height: "95%",
        justifyContent: "center",
        alignItems: "center",
    },
    logo: {
        width: win.width / 2,
        height: (512 * logoRatio) / 2,
        borderRadius: 100,
        marginBottom: "25%",
    },
    button: {
        width: win.width / 1.5,
        height: (114 * btnRatio) / 1.5,
        resizeMode: "contain",
        marginBottom: "8%",
    },
    version: {
        width: "100%",
        height: "5%",
        alignItems: "flex-end",
        justifyContent: "flex-end",
        paddingHorizontal: 8,
    },
    versionText: {
        fontWeight: "bold"
    }

})