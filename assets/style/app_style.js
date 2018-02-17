import color from "../values/color";
import font from "../values/font";
import size, {isMobile} from "../values/dimens";

let AppStyle = {
    navBarTextFontFamily: font.app,
    navBarTextFontSize: size.text_size_medium,
    navBarButtonColor: 'white',
    navBarTextColor: 'white',
    navigationBarColor: '#2DAEC6',
    navBarBackgroundColor: '#2DAEC6',
    statusBarColor: '206c81',
    disabledBackGesture:true,
    orientation: 'portrait',
};

let NavigatorStyle = {
    navBarHidden: true,
    statusBarColor: color.colorAccent,
};

let NavDrawerStyle = {
    statusBarColor: color.colorAccent,
};

let NavLeftDrawer = {
    left: {
        screen: 'wikicare.NavDrawer'
    }
};

export {AppStyle, NavigatorStyle, NavDrawerStyle, NavLeftDrawer};
