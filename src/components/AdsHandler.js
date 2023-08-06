import React, { forwardRef, useEffect, useImperativeHandle } from "react"
import { TestIds, useInterstitialAd } from "react-native-google-mobile-ads";
import OffersHandler from "./OffersHandler";

const AdsHandler = forwardRef((props, ref) => {

    const {
        isLoaded: isLoadedIntersitial,
        isClosed: isClosedIntersitial,
        load: loadIntersitial,
        show: showIntersitial } = useInterstitialAd(/* intersitialId */TestIds.INTERSTITIAL);

    const { premium } = OffersHandler();


    useEffect(() => {
        { !premium && loadIntersitial(); }
    }, [loadIntersitial])

    useImperativeHandle(ref, () => ({
        loadIntersitialAd() {
            loadIntersitial();
        },
        showIntersitialAd() {
            showIntersitialAd();
        },
        isClosedIntersitial() {
            return isClosedIntersitial;
        },
        isLoadedIntersitial() {
            return isLoadedIntersitial;
        },
    }))

    useEffect(() => {
        if (isClosedIntersitial) {
            if (props.closedIntersitialCallback) {
                props.closedIntersitialCallback();
            }
        } else {
            { !premium && loadIntersitial(); }
        }

    }, [isClosedIntersitial, props.closedIntersitialCallback])


    function showIntersitialAd() {
        if (isLoadedIntersitial) {
            showIntersitial();
        } else {
            {! premium && loadIntersitial(); }
        }
    }

    return <></>
})

export default AdsHandler