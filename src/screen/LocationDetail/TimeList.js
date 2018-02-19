import React, {Component, PureComponent} from 'react';
import {
    View,
    Text,
    FlatList,
    Image,
    Platform,
    Switch,
    TouchableOpacity,
    TextInput, Alert, ActivityIndicator, SectionList
} from 'react-native';


import BaseItemView from "../../base/BaseItemView";
import styles from './styles'
import color from "../../../assets/values/color";
import size from "../../../assets/values/dimens";
import BaseFlatList from "../../base/BaseFlatList";
import FontAwesome, {Icons} from 'react-native-fontawesome';
import {Utils} from "../../utils/Utils";

export default class TimeList extends PureComponent {

    constructor(props) {
        super(props);
        const data = [];
        this.state = {data: props.data || [], loading: props.loading || false};
    }

    keyExtractor = (item, index) => item.id;

    renderItem = ({item, index}) => {
        return (
            <BaseItemView
                onPressItem={this.onPressItem}
                item={item}
                index={index}>
                <View style={styles.store_time_item_cnt}>
                    <Text style={styles.store_time_item_day}>{item.day}</Text>
                    <View style={{
                        width: size.size_100,
                        height: size.size_1,
                        marginVertical: size.size_8,
                        backgroundColor: color.gray_600
                    }}/>
                    <Text style={styles.store_time_item_time}>{`${item.start_time}-${item.end_time}`}</Text>
                </View>
            </BaseItemView>
        );
    };


    onPressItem = (item, index) => {
        this.props.onPressItem && this.props.onPressItem(item, index);
    };

    componentWillReceiveProps(nextProps) {
        this.setState({
            data: nextProps.data,
            loading: nextProps.loading
        });
    }

    render() {
        let {data, loading} = this.state;
        return (
            <BaseFlatList
                style={{flex: 1}}
                data={data}
                horizontal={true}
                loading={loading}
                renderItem={this.renderItem}
                divider={false}
                keyExtractor={this.keyExtractor}
            />
        );
    };
}