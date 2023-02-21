import { StyleSheet, Text, View } from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default function Question({question}) {

    
    return (
        <View style={styles.container/* {
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            backgroundColor: "#e9eaec",
            paddingVertical: 16,
            paddingHorizontal: 16,
            borderRadius: 8,
        } */}>
            <Text style={styles.question}>
                {question}
            </Text>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: wp("85%"),
        height: hp("30%"),
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