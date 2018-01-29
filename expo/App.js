import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import Expo from 'expo';
import {observer} from 'mobx-react/native';
import {observable, runInAction} from 'mobx';

import {DoubleTapArea} from './Components/DoubleTapArea';
import {PlaylistComponent} from './Components/Playlist';

// @todo: extract to a config
const NPR_URL = 'https://api.npr.org';
const NPR_ACCESS_TOKEN_KEY = 'NPR_ACCESS_TOKEN_KEY';
const NPR_CLIENT_ID = 'nprone_trial_vNlQ3IUlacqy';
const SERVER_URL = 'https://ciasom-28b9e.firebaseapp.com';

const LOADING_PAGE = 'LOADING_PAGE';
const LOGGED_IN_PAGE = 'LOGGED_IN_PAGE';
const LOGGED_OUT_PAGE = 'LOGGED_OUT_PAGE';

const makeEmptyPlaylist = () => ({
  index: -1,
  items: [],
  playing: false,
});

StatusBar.setBarStyle('light-content');

@observer
export default class App extends React.Component {
  @observable accessToken = null;
  @observable page = LOADING_PAGE;
  @observable playlist = makeEmptyPlaylist();

  componentDidMount() {
    this.loadAccessToken();
  }

  loadAccessToken = async () => {
    this.page = LOADING_PAGE;
    const accessToken = await Expo.SecureStore.getItemAsync(
      NPR_ACCESS_TOKEN_KEY
    ).catch(console.error);
    runInAction(() => {
      this.accessToken = accessToken;
      this.page = accessToken ? LOGGED_IN_PAGE : LOGGED_OUT_PAGE;
    });
  };

  onLogoutPress = async () => {
    await Expo.SecureStore.deleteItemAsync(NPR_ACCESS_TOKEN_KEY).catch(
      console.error
    );
    await this.loadAccessToken();
  };

  onLoginPress = async () => {
    this.page = LOADING_PAGE;
    try {
      const redirectUrl = Expo.AuthSession.getRedirectUrl();
      const auth = await Expo.AuthSession.startAsync({
        authUrl: `${NPR_URL}/authorization/v2/authorize?client_id=${NPR_CLIENT_ID}&redirect_uri=${encodeURIComponent(
          redirectUrl
        )}&response_type=code&scope=identity.readonly%20identity.write%20listening.readonly%20listening.write%20localactivation&state=CSRFTOKEN`,
      });

      if (auth && auth.params && auth.params.code) {
        const access = await fetch(`${SERVER_URL}/nprauth`, {
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
          body: JSON.stringify({
            redirect_uri: auth.url,
            code: auth.params.code,
          }),
        });
        const json = await access.json();
        await Expo.SecureStore.setItemAsync(
          NPR_ACCESS_TOKEN_KEY,
          (json && json.access_token) || null
        );
      }

      await this.loadAccessToken();
    } catch (err) {
      console.error(err);
      await this.loadAccessToken();
    }
  };

  onDoubleTap = async () => {
    const {accessToken, playlist} = this;

    if (playlist.items.length === 0) {
      const result = await fetch(`${NPR_URL}/listening/v2/recommendations`, {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        method: 'GET',
      });
      const json = await result.json();

      const items = [];

      // just deal with the first 5

      for (const item of json.items.slice(0, 5)) {
        const {type, title, uid} = item.attributes;
        const {audio, image} = item.links;
        const firstAudio = (audio && audio[0] && audio[0].href) || null;
        const firstImage = (image && image[0] && image[0].href) || null;
        if (type && title && firstAudio) {
          items.push({
            uid,
            type,
            title,
            audio: firstAudio,
            image: firstImage,
          });
        }
      }

      runInAction(() => {
        this.playlist = makeEmptyPlaylist();
        this.playlist.items = items;
        this.playlist.index = items[0] ? 0 : -1;
        if (this.playlist.index >= 0) {
          this.playlist.playing = true;
        }
      });
    } else {
      playlist.playing = !playlist.playing;
    }
  };

  renderPage = () => {
    const {accessToken, page, playlist} = this;
    if (page === LOADING_PAGE) {
      return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <ActivityIndicator size="large" color="red" />
        </View>
      );
    } else if (page === LOGGED_IN_PAGE) {
      return (
        <View style={{flex: 1}}>
          <DoubleTapArea
            underlayColor={'#333'}
            onDoubleTap={this.onDoubleTap}
            style={{flex: 1}}
          >
            <View style={{flex: 1}}>
              <View style={{height: 20}} />
              <PlaylistComponent playlist={playlist} style={{flex: 1}} />
            </View>
          </DoubleTapArea>
          <View style={{padding: 5}}>
            <TouchableOpacity onPress={this.onLogoutPress}>
              <View
                style={{
                  backgroundColor: '#fff',
                  borderRadius: 8,
                  paddingHorizontal: 40,
                  paddingVertical: 20,
                }}
              >
                <Text style={{color: 'red', fontSize: 20, textAlign: 'center'}}>
                  Log out
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      );
    } else if (page === LOGGED_OUT_PAGE) {
      return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <TouchableOpacity onPress={this.onLoginPress}>
            <View
              style={{
                backgroundColor: '#fff',
                borderRadius: 8,
                paddingHorizontal: 40,
                paddingVertical: 20,
              }}
            >
              <Text style={{color: 'red', fontSize: 20}}>Log in to NPR</Text>
            </View>
          </TouchableOpacity>
        </View>
      );
    }
  };

  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#000'}}>
        {this.renderPage()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
