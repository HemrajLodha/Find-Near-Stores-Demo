import React from 'react';
import {
    AsyncStorage
} from 'react-native';
import {Navigation} from 'react-native-navigation';

import {registerScreens} from './screen';
import {Provider} from 'react-redux';
import Strings, {fontFace} from "../assets/strings/strings";

import configureStore from './store/configureStore'
import {AppStyle} from "../assets/style/app_style";

const store = configureStore();

registerScreens(store, Provider);

Navigation.startSingleScreenApp(
    {
        screen: {
            screen: 'findstoredemo.Locations',
            title: 'Find Stores Demo',
            navigatorButtons: AppStyle,
            interactivePopGestureEnabled: true,
        },
        appStyle: {
            navBarButtonColor: 'white',
            navBarTextColor: 'white',
            navigationBarColor: '#2DAEC6',
            navBarBackgroundColor: '#2DAEC6',
            statusBarColor: '206c81',
            orientation: 'portrait'
        }
    }
);
