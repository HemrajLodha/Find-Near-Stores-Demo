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
            fontSize: size.text_size_medium,
            marginRight: size.size_8,
            marginTop: size.size_4
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
        }
    });

export default styles;