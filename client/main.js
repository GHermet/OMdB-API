import React, {StyleSheet, Dimensions} from "react-native";
const {width, height, scale} = Dimensions.get("window"),
    vw = width / 100,
    vh = height / 100,
    vmin = Math.min(vw, vh),
    vmax = Math.max(vw, vh);

export default StyleSheet.create({
    "container": {
        "display": "grid",
        "gridTemplateColumns": "repeat(2, 1fr)",
        "gridTemplateRows": "100px 100px 100px",
        "gridAutoFlow": "column"
    }
});