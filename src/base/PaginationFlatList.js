import React from "react";
import PropTypes from "prop-types";
import {ActivityIndicator, FlatList, Platform, StyleSheet, View} from "react-native";
import BaseFlatList from "./BaseFlatList";
import styles from "../screen/SearchDoctor/styles";
import color from "../../assets/values/color";
import size, {actual_height, isMobile} from "../../assets/values/dimens";
import font from "../../assets/values/font";

export default class PaginationFlatList extends BaseFlatList {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loading: false
        }
    }

    actionOnEndReached = (data) => {
        this.props.onScrollToEnd && this.props.onScrollToEnd();
    };

    componentWillReceiveProps(nextProps) {
        this.setState({
            data: nextProps.data,
            loading: nextProps.loading
        });
    }

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

    getItemLayout = (data, index) => (
        {
            length: this.props.item_height || size.size_120,
            offset: this.props.item_height || size.size_120 * index,
            index
        }
    );

    render() {
        let {keyExtractor, style} = this.props;
        let {data} = this.state;
        return (
            <FlatList
                data={data}
                extraData={this.state}
                keyExtractor={keyExtractor}
                renderItem={this.props.renderItem}
                onEndReached={this.actionOnEndReached}
                style={style}
                ListFooterComponent={this.loadingFooter}
                //getItemLayout={this.getItemLayout}
            />
        );
    }
}

