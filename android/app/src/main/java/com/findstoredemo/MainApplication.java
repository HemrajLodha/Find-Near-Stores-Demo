package com.findstoredemo;

import android.app.Application;

import android.support.annotation.Nullable;
import com.facebook.react.ReactPackage;
import com.reactnativenavigation.NavigationApplication;
import com.airbnb.android.react.maps.MapsPackage;
import java.util.Arrays;
import java.util.List;

public class MainApplication extends NavigationApplication {

    @Override
    public void onCreate() {
        super.onCreate();
    }

    @Override
    public boolean isDebug() {
        return BuildConfig.DEBUG;
    }

    protected List<ReactPackage> getPackages() {
        return Arrays.<ReactPackage>asList(
            new MapsPackage()
        );
    }

    @Nullable
    @Override
    public List<ReactPackage> createAdditionalReactPackages() {
        return getPackages();
    }

    @Nullable
    @Override
    public String getJSMainModuleName() {
        return "index";
    }
}
