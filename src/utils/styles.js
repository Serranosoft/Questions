import { Dimensions } from "react-native"

const win = Dimensions.get('window');
 
export const ui = {
    text: {
        fontFamily: "Nunito",
        color: "#000",
        fontSize: 20,
    },
    menuImg: {
        // width: win.width * 0.85,
        // height: 114 * (win.width / 322),
        
    }
}

export const app = {
    logo: {
        width: "100%",
        height: 180,
        aspectRatio: 1,
        borderRadius: 100,
    }
}