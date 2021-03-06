import {StyleSheet, Platform} from 'react-native';
import size, {actual_height, isMobile} from "../../../assets/values/dimens";
import font from "../../../assets/values/font";
import color from "../../../assets/values/color";


const fontFamily = {
    fontFamily: font.LatoRegular
};

const styles = StyleSheet.create(
    {
        container: {
            height: actual_height,
            width: size.screen_width,
            backgroundColor: '#FFFFFF'
        },
        map_view: {
            flex: 1
        },
        list_item_container: {
            width: size.screen_width,
            paddingVertical: size.size_8,
            paddingHorizontal: size.size_16
        },
        list_item_title_cnt: {
            flexDirection: "row",
        },
        list_item_fav: {
            fontSize: size.text_size_v_medium,
            marginRight: size.size_8
        },
        list_item_title: {
            fontFamily: font.LatoHeavy,
            fontSize: size.text_size_v_medium
        },
        list_item_distance: {
            ...fontFamily,
            fontSize: size.text_size_vv_small
        },
        list_item_address: {
            flex: 0.8,
            ...fontFamily,
            fontSize: size.text_size_v_small
        },
        list_item_angle_r: {
            flex: 0.2,
            textAlign: "right",
            fontSize: size.text_size_v_small
        },
        list_item_tag_cnt: {
            flexDirection: "row"
        },
        list_item_tag: {
            paddingHorizontal: size.size_8,
            paddingVertical: size.size_2,
            marginVertical: size.size_6,
            marginHorizontal: size.size_2,
            borderRadius: size.size_20,
            borderColor: color.gray_600,
            borderWidth: size.size_1,
            justifyContent: "center",
            alignItems: "center"
        },
        list_item_tag_text: {
            ...fontFamily,
            fontSize: size.text_size_vv_small,
        },
        list_item_store_hour_cnt: {
            paddingVertical: size.size_8,
            paddingHorizontal: size.size_16
        },
        store_hour_title: {
            fontFamily: font.LatoBold,
            fontSize: size.text_size_medium
        },
        store_hour_open_status: {
            ...fontFamily,
            fontSize: size.text_size_v_small,
            marginBottom: size.size_16
        },
        store_time_item_cnt: {
            padding: size.size_16,
            marginHorizontal: size.size_4,
            borderRadius: size.size_10,
            backgroundColor: color.gray_200,
            alignItems: "center",
            justifyContent: "center"
        },
        store_time_item_day: {
            fontFamily: font.LatoBold,
            fontSize: size.text_size_small
        },
        store_time_item_time: {
            ...fontFamily,
            fontSize: size.text_size_v_small
        },
        list_item_review_cnt: {
            padding: size.size_16,
            marginHorizontal: size.size_4,
        },
        review_quote: {
            ...fontFamily,
            fontSize: size.text_size_small
        },
        review_quote_icon: {
            fontSize: size.text_size_small,
            color: color.gray_400
        },
        review_author: {
            ...fontFamily,
            textAlign: "right",
            color: color.gray_800,
            fontSize: size.text_size_v_small,
        },
        direction_button: {
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 101,
            position: 'absolute',
            flexDirection: "row",
            padding: size.size_16,
            marginHorizontal: size.size_4,
        },
    });

export default styles;