import { ImageBackground, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useRef, useState } from "react";
import {Keyboard} from 'react-native'
import "../src/fonts";

export default function Names({ navigation, route }) {
    const { mode } = route.params;

    const [users, setUser] = useState([]);
    const [userName, setUserName] = useState("");

    let textInput = useRef();

    return (

        <ImageBackground source={require("../assets/background2.jpg")} resizeMode="cover"
            style={{
                width: '100%',
                height: '100%',
                flex: 1
            }}>

            <View style={{
                flex: 1,
                alignItems: "center",
                marginTop: StatusBar.currentHeight,
                paddingVertical: 50,
                paddingHorizontal: 50,
            }}>

                <View style={{marginBottom: 45}}>
                    <Text style={{ fontSize: 42.5, fontFamily: "heading", textAlign: "center", color: "white"}}>Escribe el nombre de los {"\n"}participantes</Text>
                </View>

                <View style={{
                    flex: 1,
                    width: "100%"
                }}>

                    <View style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginBottom: 30,
                    }}>
                        <TextInput
                            style={{
                                height: 60,
                                backgroundColor: "white",
                                borderRadius: 10,
                                fontSize: 20,
                                borderColor: "F8DEFF",
                                paddingHorizontal: 20,
                                // alignItems: "stretch",
                                // flex: 1,
                                // width: "100%"
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
                            backgroundColor: "white",
                        }}
                            onPress={() => { 
                                if (userName.length > 0) {
                                    setUser([...users, userName]);
                                    Keyboard.dismiss(); 
                                    textInput.current.clear(); 
                                    setUserName("");
                                }
                            }}>
                            <Text style={{
                                marginTop: -6
                            }}>
                                +
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{
                        justifyContent: "center",
                        alignItems: "center",
                        marginTop: 8,
                        flex: 1,
                        backgroundColor: "white",
                        borderRadius: 30,
                        marginBottom: 30,
                    }}>
                        <ScrollView /* contentContainerStyle={{ flexGrow: 1 }} */ keyboardShouldPersistTaps='handled' style={{
                            width: "100%",
                            paddingHorizontal: 24,
                            marginVertical: 16,
                            // flex: 1,
                        }}>
                            {users.map((user, index) => (
                                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginVertical: 16 }}>
                                    <Text numberOfLines={1} style={{ fontSize: 23, color: "black", flex: 1 }}>{user}</Text>
                                    <TouchableOpacity onPress={() => {
                                        let usersAux = users.filter((el, i) => i !== index);
                                        setUser(usersAux);
                                    }}>
                                        <Text style={{
                                            width: "100%"
                                        }}>Eliminar</Text>
                                    </TouchableOpacity>
                                </View>
                            ))

                            }
                        </ScrollView>
                    </View>


                </View>

                <View style={{
                    backgroundColor: "white",
                    width: "100%"
                }}>
                    <TouchableOpacity onPress={() =>
                        navigation.navigate("Questions", { mode: mode, users: users })
                    }>
                        <Text style={{
                            paddingHorizontal: 16,
                            paddingVertical: 16,
                        }}>Jugar</Text>
                    </TouchableOpacity>
                </View>

            </View>

            </ImageBackground>
    )
}