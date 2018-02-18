import React, {Component} from 'react';
import PropTypes from "prop-types";
import dimens from './../../assets/values/dimens';
import color from './../../assets/values/color';
import font from './../../assets/values/font';
import {
    View,
    Image,
    Text,
    StyleSheet,
    TouchableOpacity,
    Platform,
} from 'react-native';


export default class RoundedButton extends Component {

    static propTypes = {
        text: PropTypes.string.isRequired
    };

    render() {
        const {text} = this.props;
        return (
            <View style={styles.buttonCircle}>
                <Text style={styles.button_text}>{text.toUpperCase()}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    buttonCircle: {
        flex: 1,
        width: dimens.screen_width * 0.4,
        height: dimens.size_40,
        borderRadius: dimens.size_20,
        backgroundColor: color.colorPrimary,
        alignSelf: 'center',
        justifyContent: 'center'
    },
    button_text: {
        textAlign: 'center',
        color: '#FFFFFF',
        fontFamily: font.LatoRegular,
        fontSize: dimens.text_size_v_small,
        justifyContent: 'center',
        marginHorizontal: dimens.size_5,
    }
});