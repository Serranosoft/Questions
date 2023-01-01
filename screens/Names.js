import { ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import * as Font from "expo-font";
import { useEffect, useState } from "react";
import Questions from "./Questions";

export default function Names({ navigation, route }) {

    Font.loadAsync({
        heading: require("../assets/fonts/Source_Code_Pro/static/SourceCodePro-SemiBold.ttf"),
        subtitle: require("../assets/fonts/Pragati_Narrow/PragatiNarrow-Regular.ttf"),
        text: require("../assets/fonts/Nunito_Sans/NunitoSans-Regular.ttf")
    });

    const { mode } = route.params;
    
    const [users, setUser] = useState([]);
    const [userName, setUserName] = useState("");

    return (
        <View style={styles.container}>

            <Text>Escribe el nombre de los participantes</Text>

            <View style={styles.usersWrapper}>
                <TextInput
                    style={{
                        width: "70%",
                        height: 49,
                        padding: 10,
                        backgroundColor: "white"
                    }}
                    placeholder="Paula"
                    onChangeText={text => setUserName(text)}
                />
                <TouchableOpacity style={styles.addBtn} onPress={() => setUser([...users, userName])}>
                    <Text>
                        Añadir
                    </Text>
                </TouchableOpacity>
            </View>

            <View>
                <TouchableOpacity>
                    <Text>Borrar todos</Text>
                </TouchableOpacity>
            </View>

            <View style={{
                justifyContent: "center",
                alignItems: "center",
                marginTop: 8,
                flex: 3
            }}>
                <Text style={{ color: "white" }}>Lista de participantes</Text>
                <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={{
                    paddingHorizontal: 32,
                    marginVertical: 16,
                }}>
                    {users.map((user, index) => (
                        <View style={{ flexDirection: "row", alignItems: "center", marginVertical: 16 }}>
                            <Text style={{ fontSize: 23, color: "white" }}>{user}</Text>
                            <TouchableOpacity onPress={() => {
                                let usersAux = users.filter((el, i) => i !== index);
                                setUser(usersAux);
                            }}>
                                <Text style={{ marginLeft: 16 }}>Eliminar</Text>
                            </TouchableOpacity>
                        </View>
                    ))

                    }
                </ScrollView>
            </View>

            <View style={{
                flex: 1,
            }}>
                <TouchableOpacity onPress={() =>
                    navigation.navigate("Questions", { mode: mode })
                }>
                    <Text style={{
                        paddingHorizontal: 16,
                        paddingVertical: 16,
                        backgroundColor: "green"
                    }}>Jugar</Text>
                </TouchableOpacity>
            </View>

        </View>
    )



}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        marginTop: StatusBar.currentHeight,
        backgroundColor: "#F1285F",
        paddingVertical: 80,
        paddingHorizontal: 50
    },
    usersWrapper: {
        flexDirection: "row",
        alignItems: "center"
    },
    addBtn: {
        width: "30%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
        height: 50,
        borderWidth: 1
    }
})