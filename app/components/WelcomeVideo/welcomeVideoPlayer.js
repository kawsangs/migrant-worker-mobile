import React, { Component } from 'react';
import { Dimensions, Text } from 'react-native';
// import Video from 'react-native-video';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

class WelcomeVideoPlayer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isFullScreen: false,
    }
  }

  componentDidMount() {
    Dimensions.addEventListener('change', () => {
      this.setState({
        isFullScreen: Dimensions.get('window').width > Dimensions.get('window').height
      });
    });
  }

  onVideoEnd() {
    this.setState({ isFullScreen: false });
    this.props.onVideoEnd();
  }

  render() {
    return <Text>Welcome video player</Text>

    // return (
    //   <Video
    //     source={require('../../assets/videos/MYJOURNEY_LAUNCH_FILM_small.mp4')}
    //     style={{ width: '100%', height: wp('56%')}}
    //     controls={true}
    //     resizeMode='contain'
    //     fullscreenOrientation='all'
    //     fullscreenAutorotate={true}
    //     onEnd={() => this.onVideoEnd()}
    //     fullscreen={this.state.isFullScreen}
    //     onTouchEnd={() => this.setState({ isFullScreen: true })}
    //     onFullscreenPlayerDidDismiss={() => this.setState({isFullScreen: false})}
    //   />
    // )
  }
}

export default WelcomeVideoPlayer;