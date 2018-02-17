import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {TouchableOpacity} from "react-native";

export default class BaseItemView extends PureComponent {

    static propTypes = {
        children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
    };

    static defaultProps = {
        children: '<View/>'
    };

    onPressItem = () => {
        this.props.onPressItem && this.props.onPressItem(this.props.item, this.props.index);
    };

    render() {
        let {children} = this.props;
        return (
            <TouchableOpacity
                style={this.props.style}
                onPress={this.onPressItem}>
                {children}
            </TouchableOpacity>
        );
    }

}
