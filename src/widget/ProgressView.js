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

export default class ProgressView extends Component {

    static propTypes = {
        loading: PropTypes.bool.isRequired,
        title: PropTypes.string.isRequired,
    };

    static defaultProps = {
        loading: true,
        title: ''
    };

    render() {
        let {loading, title} = this.props;
        return (
            loading &&
            <View style={styles.overlay}>
                <View style={styles.overlay_div}>
                    {ProgressView.getIndicator()}
                    <Text style={styles.overlay_text}>{title}</Text>
                </View>
            </View>
        )
    }

    static getIndicator() {
        return (
            <ActivityIndicator
                size="large"
                color={color.colorPrimary}/>
        );
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
        backgroundColor: '#000000',
        width:size.screen_width,
        height:size.screen_height,
        zIndex: 1
    },
    overlay_div: {
        flex: 1,
        justifyContent: 'center',
    },
    overlay_text: {
        color: color.white,
        textAlign: 'center',
        fontSize: size.text_size_medium
    }
});