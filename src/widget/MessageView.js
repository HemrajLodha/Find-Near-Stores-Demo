import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Animated,
} from 'react-native';
import size from "../../assets/values/dimens";
import font from "../../assets/values/font";
import color from "../../assets/values/color";


export default class MessageView extends Component {

    async showError(message) {
        await this.setStateAsync({error: true});
        this.animateView(message);
    };

    async showMessage(message) {
        await this.setStateAsync({error: false});
        this.animateView(message);
    };

    async animateView(message) {
        await this.setStateAsync({message: message});
        if (!this.animating) {
            this.animating = true;
            this.slide(true);
        }
    }

    setStateAsync(state) {
        return new Promise(resolve => {
            this.setState(state, resolve);
        })
    }


    constructor(props) {
        super(props);
        this.state = {
            slideValue: new Animated.Value(-size.size_48),
            message: '',
            error: false
        };
    }

    slide = (show) => {
        let self = this;
        this.state.slideValue.setValue(show ? -size.size_48 : 0);
        Animated.spring(
            this.state.slideValue,
            {
                toValue: show ? 0 : -size.size_48,
                duration: 5000
            }
        ).start(function () {
            if (!show) {
                self.animating = false;
            }
        });

        setTimeout(function () {
            if (show) {
                self.slide(false);
            }
        }, 5000);
    };

    render() {
        let {slideValue, message, error} = this.state;
        let slideTop = [{translateY: slideValue}];
        return (
            <Animated.View
                style={[styles.container, {
                    transform: slideTop,
                    backgroundColor: error ? '#d03300' : color.colorPrimary
                }]}>
                <Text style={styles.message}>{message}</Text>
            </Animated.View>
        );
    };
}


const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: size.size_48,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1001
    },
    message: {
        fontFamily: font.LatoRegular,
        fontSize: size.text_size_small,
        color: '#FFFFFF'
    }
});