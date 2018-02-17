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


class LocationDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {data: this.props.data};

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
        })

    }

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

    onNavigatorEvent = (event) => {
        if (event.type === 'NavBarButtonPress') {
            switch (event.id) {
                case 'action_toggle_menu':
                    this.toggleShowState();
                    break;
            }
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

    render() {
        let {data} = this.state;
        return (
            <View style={styles.container}>
                <View style={styles.list_item_container}>
                    <View style={styles.list_item_title_cnt}>
                        <FontAwesome style={styles.list_item_fav}>{Icons.starO}</FontAwesome>
                        <Text style={styles.list_item_title}>{data.name}</Text>
                    </View>
                    <Text style={styles.list_item_distance}>8 miles away</Text>
                    <View style={styles.list_item_title_cnt}>
                        <Text
                            numberOfLines={1}
                            style={styles.list_item_address}>{data.address}</Text>
                        <FontAwesome style={styles.list_item_angle_r}>{Icons.angleDoubleRight}</FontAwesome>
                    </View>
                    <View style={styles.list_item_tag_cnt}>
                        {this.getTagViews(data.store_tags.split(","))}
                    </View>
                </View>
                <MessageView
                    ref='messageView'
                />
            </View>
        );
    };
}

export default LocationDetail;