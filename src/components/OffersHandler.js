import { useEffect, useState } from "react";
import Purchases from "react-native-purchases";

const APIKeys = {
    google: "goog_zvROqTiSImJzqprBYYCbmlPXOIF",
};

export default function OffersHandler() {

    const [offers, setOffers] = useState(null);
    const [customer, setCustomer] = useState(null);
    const [premium, setPremium] = useState(false);

    useEffect(() => {
        // Purchases.setDebugLogsEnabled(true);
        configure();
        getCustomer();
    }, [])

    async function configure() {
        await Purchases.configure({ apiKey: APIKeys.google });
        getOffers();
    }

    async function getOffers() {
        const offerings = await Purchases.getOfferings();
        setOffers(offerings.current);
    }

    async function getCustomer() {
        try {
            const customerInfo = await Purchases.getCustomerInfo();
            if (Object.keys(customerInfo.entitlements.active).length === 0) {
                setPremium(false)
            } else {
                setPremium(true);
            }
        } catch (e) {}
    }

    async function buyProduct() {
        try {
            const { customerInfo, productIdentifier } = await Purchases.purchasePackage(offers.availablePackages[0]);
            if (typeof customerInfo.entitlements.active.my_entitlement_identifier !== "undefined") {
                setPremium(true);
            }
        } catch (e) {
            if (!e.userCancelled) {
                console.log(e)
            }
        }
    }

    return {
        buyProduct: buyProduct,
        premium: premium,
        offers: offers,
    }
}