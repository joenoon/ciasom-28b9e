import React from 'react';
import PropTypes from 'prop-types';
import {TouchableHighlight} from 'react-native';
import {observer} from 'mobx-react/native';
import {observable, runInAction} from 'mobx';

export const DoubleTapArea = @observer
class DoubleTapArea extends React.Component {
  static propTypes = {
    onDoubleTap: PropTypes.func.isRequired,
  };

  @observable pressedAt = 0;

  onPressIn = () => {
    const now = Date.now();
    const {pressedAt} = this;
    const diff = now - pressedAt;
    if (diff < 250) {
      this.pressedAt = 0;
      this.props.onDoubleTap();
    } else {
      this.pressedAt = now;
    }
  };

  render() {
    return <TouchableHighlight {...this.props} onPressIn={this.onPressIn} />;
  }
};
