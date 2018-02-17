import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    ActivityIndicator
} from 'react-native';
import color from "../../assets/values/color";
import PropTypes from "prop-types";
import size from "../../assets/values/dimens";

export class MessageType {
    static TYPE_MESSAGE = 0;
    static TYPE_ERROR = 1;
}

export default class ResponseView extends Component {

    static propTypes = {
        type: PropTypes.number.isRequired,
        message: PropTypes.string.isRequired,
        show: PropTypes.bool.isRequired,
    };


    static defaultProps = {
        type: MessageType.TYPE_MESSAGE,
        message: "",
        show: false
    };

    componentWillReceiveProps(nextProps) {
        this.setState(nextProps);
    }

    render() {
        let {type, message, show} = this.props;
        if (show) {
            return (
                <View style={styles.overlay}>
                    <View style={styles.overlay_div}>
                        <Text
                            style={[styles.overlay_text, type === MessageType.TYPE_ERROR && {color: color.light_red}]}>{message}</Text>
                    </View>
                </View>
            )
        } else {
            return (
                <View/>
            )
        }
    }
}

export const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        position: 'absolute',
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        opacity: 0.8,
        backgroundColor: '#FFFFFF',
        width: size.screen_width,
        height: size.screen_height,
        zIndex: 1
    },
    overlay_div: {
        flex: 1,
        justifyContent: 'center',
    },
    overlay_text: {
        color: color.colorPrimary,
        textAlign: 'center',
        fontSize: size.text_size_medium
    }
});