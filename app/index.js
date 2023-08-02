import { ui, app } from "../src/utils/styles";
import { View, Image, TouchableOpacity } from "react-native";
import { Stack, router } from "expo-router";

export default function App() {

    return (
        <View style={{ flex: 1 }}>
            <Stack.Screen options={{ headerShown: false }} />
            <View style={{ justifyContent: "center", alignItems: "center", flex: 1, gap: 55  }}>
                <Image source={require("../assets/logo-new.jpg")} style={app.logo} />
                <TouchableOpacity onPress={() => router.push({ pathname: "auxiliar-menu", params: { mode: "questions" } })}>
                    <Image source={require("../assets/boton-parejas.png")} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => router.push({ pathname: "auxiliar-menu", params: { mode: "challenges" } })}>
                    <Image source={require("../assets/boton-retos.png")} style={ui.menuImg} contentFit={'contain'} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => router.push({ pathname: "names", params: { mode: "i_never" } })}>
                    <Image source={require("../assets/boton-yo-nunca.png")} style={ui.menuImg} contentFit={'contain'} />
                </TouchableOpacity>
            </View>
        </View>
    )
}