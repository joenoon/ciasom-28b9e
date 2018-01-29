import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Text, View, FlatList, Image} from 'react-native';
import {observer} from 'mobx-react/native';
import {toJS} from 'mobx';

import {Player} from './Player';

export const PlaylistComponent = @observer
class PlaylistComponent extends React.Component {
  static propTypes = {
    playlist: PropTypes.any.isRequired,
  };

  renderSeparator = () => <View style={styles.separator} />;
  keyExtractor = (item: Item, index: number) => item.uid;

  renderItem = ({item, index}) => {
    const isActive = index === this.props.playlist.index;
    return (
      <View style={{padding: 10}}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View
            style={{width: 10, alignItems: 'center', justifyContent: 'center'}}
          >
            {isActive && (
              <View
                style={{
                  backgroundColor: 'red',
                  width: 6,
                  height: 6,
                  borderRadius: 3,
                }}
              />
            )}
          </View>
          <View>
            <Image
              source={{
                uri:
                  item.image ||
                  'http://www.clker.com/cliparts/c/6/d/2/11949947191260635121playsound.svg.med.png',
              }}
              style={{
                backgroundColor: '#ccc',
                width: 60,
                height: 60,
                resizeMode: 'contain',
              }}
            />
          </View>
          <View style={{width: 10}} />
          <View style={{flex: 1}}>
            <Text style={{color: '#fff'}}>{item.title}</Text>
          </View>
        </View>
      </View>
    );
  };

  render() {
    const {playlist} = this.props;
    const data = toJS(playlist.items);

    if (data.length === 0) {
      return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{color: '#fff'}}>Double-tap to play</Text>
        </View>
      );
    }

    return (
      <View style={{flex: 1}}>
        <Player
          key={playlist.index}
          playlist={playlist}
          playing={playlist.playing}
        />
        <FlatList
          ref={x => (this._listView = x)}
          style={[{flex: 1}, this.props.style]}
          renderItem={this.renderItem}
          keyExtractor={this.keyExtractor}
          ItemSeparatorComponent={this.renderSeparator}
          data={data}
        />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: 'red',
  },
});
