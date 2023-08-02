import AsyncStorage from "@react-native-async-storage/async-storage";
import InAppReview from 'react-native-in-app-review';

InAppReview.isAvailable();
export default function InAppReviewHandler() {

    async function askForReview() {

        const dateStorage = await AsyncStorage.getItem("@launch-app-review");
        if (dateStorage) {
            // Si existe asyncStorage, entonces comprobar si cumple la condición y entonces mostrar el rating modal.
            if (new Date().getTime() >= parseInt(JSON.parse(dateStorage))) {
                showRatingModal();
                let date = new Date();
                date.setDate(new Date().getDate() + 5);
                await AsyncStorage.setItem("@launch-app-review", JSON.stringify(date.getTime()));
            }
        } else {
            // Si no existe asyncStorage, entonces implementarlo y mostrar el rating modal.
            showRatingModal();
            let date = new Date();
            date.setDate(new Date().getDate() + 5);
            await AsyncStorage.setItem("@launch-app-review", JSON.stringify(date.getTime()));
        }

    }

    async function showRatingModal() {
        InAppReview.RequestInAppReview().then(async () => {

        }).catch((error) => {
            console.log(error);
        });
    }


    return {
        askForReview: askForReview
    }

}