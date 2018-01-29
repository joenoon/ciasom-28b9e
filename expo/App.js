import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { AuthSession } from 'expo';
import {observer} from "mobx-react/native"
import {observable} from 'mobx';

// @todo: extract to a config
const NPR_CLIENT_ID = 'nprone_trial_vNlQ3IUlacqy';

@observer
export default class App extends React.Component {

  @observable result = null;

  onLoginPress = async () => {
    const redirectUrl = AuthSession.getRedirectUrl();
    const result = await AuthSession.startAsync({
      authUrl: `https://api.npr.org/authorization/v2/authorize?client_id=${NPR_CLIENT_ID}&redirect_uri=${encodeURIComponent(redirectUrl)}&response_type=code&scope=identity.readonly%20identity.write%20listening.readonly%20listening.write%20localactivation&state=CSRFTOKEN`
    });
    console.log('result', result);
    this.result = result;
  };

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.onLoginPress}>
          <View style={{backgroundColor:'#fff', borderRadius: 8,paddingHorizontal:40,paddingVertical:20}}>
            <Text style={{color: '#4285f4', fontSize: 20}}>Log in to NPR</Text>
          </View>
        </TouchableOpacity>
        <Text style={{color:'#fff'}}>{this.result ? 'yes' : 'none'}</Text>
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
