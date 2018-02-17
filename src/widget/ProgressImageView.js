import React, {Component} from 'react';
import {
    View,
    Image,
    Animated
} from 'react-native';

class ProgressImageView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            thumbnailOpacity: new Animated.Value(0)
        }
    }

    onLoad() {
        Animated.timing(this.state.thumbnailOpacity, {
            toValue: 0,
            duration: 250
        }).start()
    }

    onThumbnailLoad() {
        Animated.timing(this.state.thumbnailOpacity, {
            toValue: 1,
            duration: 250
        }).start();
    }

    render() {
        let imageSource = {
            ...this.props.source,
            method: 'POST',
            headers: {
                Pragma: 'force-cache',
            },
        };
        return (
            <View
                width={this.props.style.width}
                height={this.props.style.height}
                backgroundColor={'#ffffff'}>
                <Animated.Image
                    resizeMode={this.props.resizeMode || 'cover'}
                    key={this.props.key}
                    style={[
                        {
                            opacity: this.state.thumbnailOpacity,
                        },
                        this.props.style
                    ]}
                    source={this.props.thumbnail}
                    onLoad={(event) => this.onThumbnailLoad(event)}
                />
                <Animated.Image
                    resizeMode={this.props.resizeMode || 'cover'}
                    key={this.props.key}
                    style={[
                        {
                            position: 'absolute',
                            zIndex: 101
                        },
                        this.props.style
                    ]}
                    source={imageSource}
                    onLoad={(event) => this.onLoad(event)}
                />
            </View>
        )
    }
}

export default ProgressImageView;