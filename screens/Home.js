import { StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import "../src/fonts";

export default function Home({ navigation }) {

    const Button = ({ text }) => <Text style={{ fontSize: 25, fontFamily: "text" }}>{text}</Text>

    return (
        <View style={{
            flex: 1,
            alignItems: "center",
            marginTop: StatusBar.currentHeight,
            backgroundColor: "#F1285F",
            paddingVertical: 80,
        }}>

            <View style={{
                width: 75,
                height: 75,
                borderRadius: 100,
                backgroundColor: "white"
            }}>

            </View>
            <View style={{
                width: "100%",
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
            }}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() =>
                        navigation.navigate("Names", {mode: 'friends'})
                    }>
                    <Button text="CON AMIGOS" />
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() =>
                        navigation.navigate("Names", {mode: 'couple'})
                    }>
                    <Button text="PICANTE" />
                </TouchableOpacity>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 8,
        paddingVertical: 16,
        backgroundColor: "white",
        marginVertical: 16,
        borderRadius: 100,
        width: "75%",
        textAlign: "center"
    }
})