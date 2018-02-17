/**
 * @author : Hemraj Lodha
 * */
import React, {Component} from 'react';
import {
    TextInput,
} from 'react-native';
import PropTypes from "prop-types";

class StateTextInput extends Component {

    static propTypes = {
        input_key: PropTypes.string.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            text: this.props.value
        }
    }


    componentWillReceiveProps(nextProps) {
        this.setState({text: nextProps.value});
    }


    onChangeText = (text) => {
        this.setState({text: text});
        this.props.onChangeText(this.props.input_key, text);
    };

    render() {
        let {style, placeholder, keyboardType, editable, autoCapitalize, placeholderTextColor, underlineColorAndroid} = this.props;
        let {text} = this.state;
        return (
            <TextInput
                style={style}
                placeholder={placeholder}
                autoCapitalize={autoCapitalize}
                underlineColorAndroid={underlineColorAndroid}
                placeholderTextColor={placeholderTextColor}
                editable={editable}
                value={text}
                onChangeText={this.onChangeText}
            >
            </TextInput>
        );
    }

}

export default StateTextInput;