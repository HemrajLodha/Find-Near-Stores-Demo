import React, {Component} from 'react';
import {
    View,
    Text,
    FlatList,
    Image,
    Platform,
    Switch,
    TouchableOpacity,
    TextInput, Alert, ActivityIndicator, SectionList, ScrollView, PermissionsAndroid
} from 'react-native';
import styles from './styles'
import FontAwesome, {Icons} from "react-native-fontawesome";
import MessageView from "../../widget/MessageView";
import AsyncStorageKeys from "../../AsyncStorageKeys";
import BaseFlatList from "../../base/BaseFlatList";
import size from "../../../assets/values/dimens";
import TimeList from "./TimeList";
import {Utils} from "../../utils/Utils";
import RoundedButton from "../../widget/RoundedButton";


class LocationDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {data: props.data};
        this.checkForFavourite();
    }

    checkForFavourite = () => {
        AsyncStorageKeys.getFavouriteItemId().then(id => {
            if (id === this.state.data.id.toString()) {
                this.isFavourite = true;
            } else {
                this.isFavourite = false;
            }
            this.actionSetButton();
        }).catch(err => {
            this.isFavourite = false;
            this.actionSetButton();
        });
    };

    onNavigatorEvent = (event) => {
        switch (event.id) {
            case 'action_toggle_menu':
                this.toggleShowState();
                break;
            case 'willAppear':
                this.checkForFavourite();
                break;
            case 'didAppear':

                break;
            case 'willDisappear':

                break;
            case 'didDisappear':

                break;
            case 'willCommitPreview':
                break;
        }
    };

    actionSetButton = () => {
        this.props.navigator.setButtons({
            rightButtons: [
                {
                    id: 'action_toggle_menu',
                    showAsAction: 'always',
                    icon: this.isFavourite ? require('./../../../assets/images/menu/ic_action_star.png')
                        : require('./../../../assets/images/menu/ic_action_star_border.png')
                }
            ]
        });
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    };


    toggleShowState = () => {
        this.isFavourite = !this.isFavourite;
        if (this.isFavourite) {
            AsyncStorageKeys.setFavouriteItemId(this.state.data.id.toString()).then(() => {
                this.actionSetButton();
            });
        } else {
            AsyncStorageKeys.setFavouriteItemId("").then(() => {
                this.actionSetButton();
            });
        }
    };

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

    getCurrentStoreOpenStatus = (datas = []) => {
        let currentDayIndex = Utils.getCurrentDay();
        let openNow = false;
        for (let i = 0; i < datas.length; i++) {
            let item = datas[i];
            let dayIndex = Utils.getDayIndex(item.day);
            if (currentDayIndex === dayIndex) {
                let startTime = Utils.getTimeIn24Hours(item.start_time);
                let endTime = Utils.getTimeIn24Hours(item.end_time);
                startTime = startTime.split(":");
                endTime = endTime.split(":");
                startTime = Utils.getDateInMilliesFromHours(startTime[0], startTime[1]);
                endTime = Utils.getDateInMilliesFromHours(endTime[0], endTime[1]);
                let time = new Date();
                time = time.getTime();
                if (time >= startTime && time <= endTime) {
                    openNow = true;
                }
                break;
            }
        }
        return openNow;
    };

    getDirection = () => {
        this.props.navigator.push({
            screen: "findstoredemo.StoreDirection",
            title: this.state.data.name,
            passProps: {data: this.state.data}
        })
    };

    render() {
        let {data} = this.state;
        let openNow = this.getCurrentStoreOpenStatus(data.store_times);
        return (
            <View style={styles.container}>
                <ScrollView style={{marginBottom: size.size_65}}>
                    <View style={{flex: 1}}>
                        <View style={styles.list_item_container}>
                            <View style={styles.list_item_title_cnt}>
                                <Text style={styles.list_item_title}>{data.name}</Text>
                            </View>
                            <Text style={styles.list_item_distance}>Not Available</Text>
                            <View style={styles.list_item_title_cnt}>
                                <Text
                                    style={styles.list_item_address}>{data.address}</Text>
                            </View>
                            <View style={styles.list_item_tag_cnt}>
                                {this.getTagViews(data.store_tags.split(","))}
                            </View>
                        </View>
                        <View
                            style={[styles.list_item_store_hour_cnt]}>
                            <Text style={styles.store_hour_title}>Store Hours</Text>
                            <Text style={styles.store_hour_open_status}>{openNow && "Open Now" || "Closed Now"}</Text>
                            <TimeList
                                data={data.store_times || []}
                            />
                        </View>
                        <View style={styles.list_item_review_cnt}>
                            <Text>
                                <FontAwesome style={styles.review_quote_icon}>{Icons.quoteLeft}</FontAwesome>
                                <Text style={styles.review_quote}>This store have amazing products. and employee
                                    behaviour is also very good.
                                </Text>
                                <FontAwesome style={styles.review_quote_icon}>{Icons.quoteRight}</FontAwesome>
                            </Text>
                            <Text style={styles.review_author}>--Rodger Klemin</Text>
                        </View>
                    </View>
                </ScrollView>
                <View
                    style={styles.direction_button}>
                    <TouchableOpacity style={{flex: 1}}>
                        <RoundedButton text={"Call"}/>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={this.getDirection}
                        style={{flex: 1}}>
                        <RoundedButton text={"Get Direction"}/>
                    </TouchableOpacity>
                </View>
                <MessageView
                    ref='messageView'
                    autoHide={true}
                />
            </View>
        );
    };
}

export default LocationDetail;