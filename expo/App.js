import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableHighlight,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import Expo from 'expo';
import {observer} from 'mobx-react/native';
import {observable, runInAction, toJS} from 'mobx';

import {DoubleTapArea} from './Components/DoubleTapArea';
import {PlaylistComponent} from './Components/Playlist';

// @todo: extract to a config
const NPR_URL = 'https://api.npr.org';
const NPR_ACCESS_TOKEN_KEY = 'NPR_ACCESS_TOKEN_KEY';
const NPR_CLIENT_ID = 'nprone_trial_vNlQ3IUlacqy';
const SERVER_URL = 'https://ciasom-28b9e.appspot.com';

const LOADING_PAGE = 'LOADING_PAGE';
const LOGGED_IN_PAGE = 'LOGGED_IN_PAGE';
const LOGGED_OUT_PAGE = 'LOGGED_OUT_PAGE';

const makeEmptyPlaylist = () => ({
  index: -1,
  items: [],
  playing: false,
});

StatusBar.setBarStyle('light-content');

import SortableListView from 'react-native-sortable-listview';

class RowComponent extends React.Component {
  render() {
    return (
      <TouchableHighlight
        underlayColor={'#eee'}
        style={{
          padding: 25,
          backgroundColor: '#F8F8F8',
          borderBottomWidth: 1,
          borderColor: '#eee',
        }}
        {...this.props.sortHandlers}
      >
        <Text>{this.props.data.text}</Text>
      </TouchableHighlight>
    );
  }
}
let data = {
  hello: {text: 'world'},
  how: {text: 'are you'},
  test: {text: 123},
  this: {text: 'is'},
  a: {text: 'a'},
  real: {text: 'real'},
  drag: {text: 'drag and drop'},
  bb: {text: 'bb'},
  cc: {text: 'cc'},
  dd: {text: 'dd'},
  ee: {text: 'ee'},
  ff: {text: 'ff'},
  gg: {text: 'gg'},
  hh: {text: 'hh'},
  ii: {text: 'ii'},
  jj: {text: 'jj'},
  kk: {text: 'kk'},
};
const order = Object.keys(data);

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

  checkScroller = () => {
    return;
    const {scroller} = this;
    if (!scroller) return;
    const {scrollValue, scrollContainerHeight, moveY, direction, dy} = scroller;

    const itemHeight =
      (scroller.state &&
        scroller.state.active &&
        scroller.state.active.layout &&
        scroller.state.active.layout.frameHeight) ||
      null;
    const listLayoutHeight =
      (scroller.listLayout && scroller.listLayout.height) || null;
    if (itemHeight == null || listLayoutHeight == null) return;

    // const itemHeight = this.state.active.layout.frameHeight

    const diff = listLayoutHeight - itemHeight;
    if (moveY > diff) {
      console.log('moveTo', moveY + itemHeight);
      scroller.scrollTo({y: moveY + itemHeight});
    }

    // const MAX_HEIGHT = Math.max(
    //   0,
    //   scrollContainerHeight - listLayoutHeight + itemHeight
    // )
    // if (scrollValue > MAX_HEIGHT) {
    //   scroller.scrollTo({ y: MAX_HEIGHT })
    // }

    console.log('checking', {
      scrollValue,
      scrollContainerHeight,
      itemHeight,
      listLayoutHeight,
      moveY,
      direction,
      dy,
    });

    // checking Object {
    //   "direction": "down",
    //   "dy": 201,
    //   "itemHeight": 68,
    //   "listLayoutHeight": 627,
    //   "moveY": 595,
    //   "scrollContainerHeight": 1156,
    //   "scrollValue": 0,
    // }
  };

  renderExperiment = () => {
    return (
      <View style={{flex: 1, paddingVertical: 100}}>
        <SortableListView
          ref={x => (this.scroller = x)}
          style={{flex: 1}}
          data={data}
          order={order}
          onRowMoved={e => {
            order.splice(e.to, 0, order.splice(e.from, 1)[0]);
            this.forceUpdate();
          }}
          disableAnimatedScrolling
          onScroll={this.checkScroller}
          renderRow={row => <RowComponent data={row} />}
        />
      </View>
    );
  };

  render() {
    return this.renderExperiment();
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
