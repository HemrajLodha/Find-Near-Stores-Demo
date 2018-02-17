import {Platform} from "react-native";

export const isCompatible = (feature) => {
    const version = Platform.Version;

    switch (feature) {
        case 'TouchableNativeFeedback':
            return version >= 21;
        case 'elevation':
            return version >= 21;
        default:
            return true;
    }
};


