import { Image, ImageBackground, ScrollView, StatusBar, Text, TextInput, TouchableOpacity, View, Dimensions, Button } from "react-native";
import { createRef, useRef, useState } from "react";
import { Keyboard } from 'react-native'
import "../src/fonts";
import AdsHandler from "../src/components/AdsHandler";

export default function Names({ navigation, route }) {
    const { mode } = route.params;

    const [users, setUser] = useState([]);
    const [userName, setUserName] = useState("");

    let textInput = useRef();

    const adsHandlerRef = createRef();

    function closedIntersitialCallback() {
        navigation.navigate("Questions", { mode: mode, users: users })
    }

    return (
        <>
            <AdsHandler ref={adsHandlerRef} adType={[0]} closedIntersitialCallback={() => {closedIntersitialCallback()} }/>
            <ImageBackground source={require("../assets/background2.jpg")} resizeMode="cover"
                style={{
                    width: '100%',
                    height: '100%',
                    flex: 1
                }}>
                <View style={{
                    flex: 1,
                    alignItems: "space-between",
                    justifyContent: "space-between",
                    marginTop: StatusBar.currentHeight,
                    paddingVertical: 8,
                    paddingHorizontal: 50,
                }}>

                    <View style={{ marginBottom: 45 }}>
                        <Text style={{ fontSize: 42.5, fontFamily: "heading", textAlign: "center", color: "#e9eaec" }}>Escribe el nombre de los {"\n"}participantes</Text>
                    </View>

                    <View style={{
                        flex: 1,
                        width: "100%",
                    }}>

                        <View style={{
                            flexDirection: "row",
                            alignItems: "center",
                            marginBottom: 30,
                        }}>
                            <TextInput
                                style={{
                                    height: 60,
                                    backgroundColor: "#e9eaec",
                                    borderRadius: 10,
                                    fontSize: 20,
                                    borderColor: "F8DEFF",
                                    paddingHorizontal: 20,
                                    flex: 1,
                                }}
                                placeholder="Añadid a los jugadores"
                                onChangeText={text => setUserName(text)}
                                ref={textInput}
                                clearButtonMode="always"
                            />
                            <TouchableOpacity style={{
                                justifyContent: "center",
                                alignItems: "center",
                                marginLeft: 10,
                                // padding: 20,
                            }}
                                onPress={() => {
                                    if (userName.length > 0) {
                                        setUser([...users, userName]);
                                        Keyboard.dismiss();
                                        textInput.current.clear();
                                        setUserName("");
                                    }
                                }}>
                                <Image
                                    source={require("../assets/mas.png")}
                                    style={{
                                        width: 50,
                                        resizeMode: "contain",
                                        flex: 1
                                    }} />

                            </TouchableOpacity>
                        </View>

                        <View style={{
                            marginTop: 8,
                            flex: 1,
                            width: "100%",
                            height: "100%",
                            backgroundColor: "#e9eaec",
                            borderRadius: 30,
                            marginBottom: 30,
                        }}>
                            <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={{
                                paddingHorizontal: 24,
                                marginVertical: 16,
                            }}>
                                {users.map((user, index) => (
                                    <View style={{ flexDirection: "row", alignItems: "center", marginVertical: 16 }}>
                                        <Text numberOfLines={1} style={{ fontSize: 23, color: "black", flex: 1 }}>{user}</Text>
                                        <TouchableOpacity style={{
                                            justifyContent: "center",
                                            alignItems: "center",
                                            marginLeft: 10
                                        }} onPress={() => {
                                            let usersAux = users.filter((el, i) => i !== index);
                                            setUser(usersAux);
                                        }}>
                                            <Image
                                                source={require("../assets/equis.png")}
                                                resizeMode="contain"
                                                style={{
                                                    width: 35,
                                                    height: 35,
                                                    marginLeft: 16,
                                                }} />
                                        </TouchableOpacity>
                                    </View>
                                ))

                                }
                            </ScrollView>
                        </View>


                    </View>

                    <View style={{
                        width: "100%",
                    }}>
                        <TouchableOpacity style={{ alignItems: "center" }} onPress={() => {
                            if (adsHandlerRef.current.isLoadedIntersitial()) {
                                adsHandlerRef.current.showIntersitialAd()
                            } else {
                                navigation.navigate("Questions", { mode: mode, users: users })
                            }
                        }
                        }>
                            <Image
                                source={require("../assets/play.png")}
                                style={{
                                    width: "75%",
                                    resizeMode: "contain",
                                    padding: 0,
                                }} />
                        </TouchableOpacity>
                    </View>

                </View>

                <View style={{ paddingHorizontal: 8, alignItems: "flex-end" }}>
                    <Text style={{ fontWeight: "bold" }}>v1.0.1</Text>
                </View>

            </ImageBackground>
        </>
    )
}