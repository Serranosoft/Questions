import { Text, View } from "react-native";

export default function Question({question}) {

    
    return (
        <View style={{
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            backgroundColor: "#e9eaec",
            paddingVertical: 16,
            paddingHorizontal: 16,
            borderRadius: 8,
        }}>
            <Text
                style={{
                    fontSize: 30,
                    fontFamily: "text",
                    letterSpacing: -1.5,

                }}>
                {question}
            </Text>

        </View>
    )
}