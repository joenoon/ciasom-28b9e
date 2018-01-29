import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import {observer} from 'mobx-react/native';
import {toJS, observable, runInAction} from 'mobx';
import Expo from 'expo';

export const Player = @observer
class Player extends React.Component {
  static propTypes = {
    playlist: PropTypes.any.isRequired,
    playing: PropTypes.bool.isRequired,
  };

  width = Dimensions.get('window').width;

  @observable audio = null;
  @observable playbackStatus = null;

  componentDidMount() {
    this.loadAudio();
  }

  componentWillUnmount() {
    this.clearAudio(this.audio);
  }

  componentWillReceiveProps(nextProps) {
    const wasPlaying = this.props.playing;
    const nowPlaying = nextProps.playing;
    if (wasPlaying && !nowPlaying) {
      this.pauseAudio();
    } else if (!wasPlaying && nowPlaying) {
      this.playAudio();
    }
  }

  clearAudio = async audio => {
    if (!audio) return;
    runInAction(() => {
      this.audio = null;
      this.playbackStatus = null;
    });
    return await audio.unloadAsync().catch(console.warn);
  };

  loadAudio = async () => {
    const {playlist} = this.props;
    const data = toJS(playlist.items);
    const active = data[playlist.index];
    if (!active) return;

    const audio = new Expo.Audio.Sound();
    this.audio = audio;
    audio.setOnPlaybackStatusUpdate(this.onPlaybackStatusUpdate);
    await audio.loadAsync({uri: active.audio}, {}, false);

    // audio could have gone away if unmounted
    if (!this.audio) return;

    if (playlist.playing) {
      audio
        .setStatusAsync({shouldPlay: true, positionMillis: 0})
        .catch(console.warn);
    }
  };

  pauseAudio = async () => {
    const {audio} = this;
    if (!audio) return;
    return await audio.setStatusAsync({shouldPlay: false}).catch(console.warn);
  };

  playAudio = async () => {
    const {audio} = this;
    if (!audio) return;
    return await audio.setStatusAsync({shouldPlay: true}).catch(console.warn);
  };

  onPlaybackStatusUpdate = async status => {
    // console.log('onPlaybackStatusUpdate', status);
    const {playlist} = this.props;
    this.playbackStatus = status;
    if (status && status.didJustFinish) {
      playlist.index += 1;
    }
  };

  statusText = () => {
    const {playbackStatus} = this;
    if (!playbackStatus) return '';
    if (playbackStatus.isPlaying) return 'Playing';
    if (!playbackStatus.isLoaded) return 'Loading';
    if (playbackStatus.Buffering) return 'Buffering';
    return 'Paused';
  };

  progressWidth = () => {
    const {playbackStatus} = this;
    if (!playbackStatus) return 0;
    const {playableDurationMillis, positionMillis} = playbackStatus;
    if (playableDurationMillis == null || positionMillis == null) return 0;
    const progress = positionMillis / (1.0 * playableDurationMillis);
    const progressWidth = Math.floor(progress * this.width);
    return progressWidth;
  };

  render() {
    return (
      <View
        style={{
          position: 'relative',
          height: 50,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            width: this.progressWidth(),
            backgroundColor: 'red',
          }}
        />
        <Text
          style={{backgroundColor: 'transparent', color: '#fff', fontSize: 20}}
        >
          {this.statusText()}
        </Text>
      </View>
    );
  }
};
