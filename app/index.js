import { ui, app } from "../src/utils/styles";
import { TouchableOpacity, View, Image } from "react-native";
import { Stack, router } from "expo-router";

export default function App() {

    return (
        <View style={{ flex: 1 }}>
            <Stack.Screen options={{ headerShown: false }} />
            <View style={{ justifyContent: "center", alignItems: "center", flex: 1, gap: 48 }}>
                <Image source={require("../assets/logo-new.jpg")} style={app.logo} />
                <TouchableOpacity onPress={() => router.push({ pathname: "auxiliar-menu", params: { mode: "couple" } })}>
                    <Image source={require("../assets/boton-parejas.png")} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => router.push({ pathname: "auxiliar-menu", params: { mode: "friends" } })}>
                    <Image source={require("../assets/boton-amigos.png")} style={ui.menuImg} contentFit={'contain'} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => router.push({ pathname: "auxiliar-menu", params: { mode: "i_never" } })}>
                    <Image source={require("../assets/boton-yo-nunca.png")} style={ui.menuImg} contentFit={'contain'} />
                </TouchableOpacity>
            </View>
        </View>
    )
}