import { Dimensions, Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import "../src/fonts";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default function Home({ navigation }) {

    return (
        <ImageBackground source={require("../assets/background2.jpg")} resizeMode="cover" style={styles.container}>
            <View style={styles.menu}>
                <Image source={require("../assets/logo-new.jpg")} style={styles.logo} 
                />
                <TouchableOpacity
                    onPress={() =>
                        navigation.navigate("Names", { mode: 'friends' })
                    }>
                    <Image source={require("../assets/boton-parejas.png")} style={styles.button} />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() =>
                        navigation.navigate("Names", { mode: 'couple' })
                    }>
                    <Image source={require("../assets/boton-amigos.png")} style={styles.button} />
                </TouchableOpacity>
            </View>

            <View style={styles.version}>
                <Text style={styles.versionText}>v1.1.0</Text>
            </View>

        </ImageBackground>
    )
}

const win = Dimensions.get('window');
const logoRatio = win.width/512;

const styles = StyleSheet.create({
    container: {
        width: wp("100%"),
        height: hp("100%")
    },
    menu: {
        width: wp("100%"),
        height: hp("95%"),
        justifyContent: "center",
        alignItems: "center",
    },
    logo: {
        width: win.width / 2,
        height: (512 * logoRatio) / 2,
        borderRadius: 100,
        marginBottom: "20%",
    },
    button: {
        width: wp("75%"),
        resizeMode: "contain",
        marginBottom: "10%",
    },
    version: {
        width: wp("100%"),
        height: hp("5%"),
        alignItems: "flex-end"
    },
    versionText: {
        fontWeight: "bold"
    }

})