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
import ProgressImageView from "../../widget/ProgressImageView";
import styles from './styles'
import color from "../../../assets/values/color";
import size from "../../../assets/values/dimens";
import BaseFlatList from "../../base/BaseFlatList";
import FontAwesome, {Icons} from 'react-native-fontawesome';

export default class LocationsList extends Component {

    constructor(props) {
        super(props);
        const data = [];
        this.state = {data: data, loading: true};
    }

    keyExtractor = (item, index) => item.id;

    getTagViews = (tags) => {
        return tags.map((item, index) => {
            return (
                <View
                    key={`tag${index}`}
                    style={styles.list_item_tag}>
                    <Text style={styles.list_item_tag_text}>{item}</Text>
                </View>
            );
        })
    };

    renderItem = ({item, index}) => {
        return (
            <BaseItemView
                key={`item${index}`}
                onPressItem={this.onPressItem}
                item={item}
                index={index}>
                <View style={styles.list_item_container}>
                    <View style={styles.list_item_title_cnt}>
                        <FontAwesome style={styles.list_item_fav}>{Icons.starO}</FontAwesome>
                        <Text style={styles.list_item_title}>{item.name}</Text>
                    </View>
                    <Text style={styles.list_item_distance}>8 miles away</Text>
                    <View style={styles.list_item_title_cnt}>
                        <Text
                            numberOfLines={1}
                            style={styles.list_item_address}>{item.address}</Text>
                        <FontAwesome style={styles.list_item_angle_r}>{Icons.angleDoubleRight}</FontAwesome>
                    </View>
                    <View style={styles.list_item_tag_cnt}>
                        {this.getTagViews(item.store_tags.split(","))}
                    </View>
                </View>
            </BaseItemView>
        );
    };


    onPressItem = (id: string) => {

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
                loading={loading}
                renderItem={this.renderItem}
                keyExtractor={this.keyExtractor}
                ListFooterComponent={this.loadingFooter}
            />
        );
    };
}