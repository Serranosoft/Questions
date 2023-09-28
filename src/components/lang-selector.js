import { Image, StyleSheet, TouchableOpacity } from "react-native";
import { useContext } from "react";
import { DataContext } from "../utils/DataContext";

export default function LangSelector() {

    const { lang, setLocale } = useContext(DataContext);

    return (
        <TouchableOpacity style={styles.container} onPress={() => lang.locale == "es-ES" ? setLocale("en") : setLocale("es-ES")}>
            {lang.locale == "es-ES" ? <Image source={require("../../assets/gb.png")} style={styles.img} /> : <Image source={require("../../assets/es.png")} style={styles.img} />}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        top: -10,
        left: -20,
        // padding: 4,
        paddingHorizontal: 16,
        paddingVertical: 4,
        borderTopRightRadius: 100,
        borderBottomRightRadius: 100,
        backgroundColor: "rgba(0, 0, 0, 0.75)",
    },
    img : {
        width: 40,
        height: 40,
        borderRadius: 100,
    }
})