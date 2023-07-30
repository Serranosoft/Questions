import { TouchableOpacity, View } from "react-native";
import { Link, Stack } from "expo-router";
import { ui, app } from "../src/utils/styles";
import { Image } from 'expo-image';

export default function AuxiliarMenu() {


    return (
        <View style={{ flex: 1 }}>
            <Stack.Screen options={{ headerShown: false }} />
            <View style={{ justifyContent: "center", alignItems: "center", flex: 1, gap: 24 }}>
                <Image source={require("../assets/logo-new.jpg")} style={app.logo} />
                <TouchableOpacity>
                    <Link href={{ pathname: "/names", params: { mode: "couple" } }}>
                        <Image contentFit="contain" source={require("../assets/boton-parejas.png")} style={ui.menuImg} />
                    </Link>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Link href={{ pathname: "/names", params: { mode: "friends" } }}>
                        <Image source={require("../assets/boton-amigos.png")} style={ui.menuImg} contentFit={'contain'} />
                    </Link>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Link href={{ pathname: "/names", params: { mode: "i_never" } }}>
                        <Image source={require("../assets/boton-yo-nunca.png")} style={ui.menuImg} contentFit={'contain'} />
                    </Link>
                </TouchableOpacity>
            </View>
        </View>
    )
}