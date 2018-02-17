import React, {Component} from 'react'
import PropTypes from 'prop-types';
import {View, findNodeHandle, TouchableOpacity, StyleSheet, NativeModules, ActionSheetIOS, Platform} from 'react-native'
import FontAwesome, {Icons} from 'react-native-fontawesome';
import size, {actual_height, isMobile} from "../../assets/values/dimens";

const UIManager = NativeModules.UIManager;

export default class PopupMenu extends Component {
    static propTypes = {
        actions: PropTypes.arrayOf(PropTypes.string).isRequired,
        onPress: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
    }

    onError = () => {
        console.log('Popup Error')
    };

    onPress = () => {
        console.log('onPress', Platform.OS);
        if (Platform.OS === 'ios') {
            ActionSheetIOS.showActionSheetWithOptions({
                options: this.props.actions,
                //destructiveButtonIndex: 0,
                cancelButtonIndex: 2,
            }, this.props.onPress);
        } else {
            UIManager.showPopupMenu(
                findNodeHandle(this.menu),
                this.props.actions,
                this.onError,
                this.props.onPress,
            );
        }
    };

    onRef = (menu) => {
        this.menu = menu;
    };

    render() {
        return (
            <View>
                <TouchableOpacity onPress={this.onPress}>
                    <FontAwesome
                        ref={this.onRef}
                        style={styles.content_option_menu}>{Icons.ellipsisV}</FontAwesome>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create(
    {
        content_option_menu: {
            fontSize: isMobile ? size.text_size_small : size.text_size_medium,
            justifyContent: 'flex-end',
            textAlign: 'center'
        }
    });