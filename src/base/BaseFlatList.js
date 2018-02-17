import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {ActivityIndicator, FlatList, StyleSheet, View} from "react-native";
import color from "../../assets/values/color";
import size from "../../assets/values/dimens";
import {Alert} from "react-native";

const styles = StyleSheet.create(
    {
        list_style: {
            flex: 1,
            backgroundColor: 'transparent',
        }
    }
);

export default class BaseFlatList extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {data: this.props.data, loading: this.props.loading};
    }

    static propTypes = {
        data: PropTypes.array.isRequired,
        keyExtractor: PropTypes.func.isRequired,
        renderItem: PropTypes.func.isRequired,
    };

    static defaultProps = {
        style: styles.list_style,
    };

    loadingFooter = () => {
        let {loading} = this.state;
        if (loading) {
            return (
                <ActivityIndicator
                    style={{marginVertical: size.size_16}}
                    size="large"
                    color={color.colorPrimary}/>
            );
        } else {
            return (
                <View/>
            );
        }
    };

    separatorComponent = () => {
        return (
            <View style={{width: size.screen_width, height: size.size_0_5, backgroundColor: color.gray_400}}/>
        );
    };

    componentWillReceiveProps(nextProps) {
        this.setState({
            data: nextProps.data,
            loading: nextProps.loading
        });
    }

    render() {
        let {keyExtractor, style} = this.props;
        let {data} = this.state;
        return (
            <FlatList
                data={data}
                extraData={this.state}
                keyExtractor={keyExtractor}
                renderItem={this.props.renderItem}
                style={style}
                ListFooterComponent={this.props.loadingFooter || this.loadingFooter}
                ItemSeparatorComponent={this.separatorComponent}
            />
        );
    }
}

