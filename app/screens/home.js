import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet
} from 'react-native';

import { Button } from 'react-native-material-ui';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  goTo(screenName) {
    this.props.navigation.navigate(screenName);
  }

  render() {
    return (
      <ScrollView style={{flex: 1}}>
        <View style={styles.container}>
          <Text style={styles.title}>ចំណាកស្រុកឆ្លាតវៃ</Text>
          <View style={styles.imgWrapper}>
            <Image
              style={{maxHeight: 200, marginBottom: 30}}
              resizeMode="contain"
              source={require('../assets/images/logo.jpg')}/>
          </View>

          <View>
            <Button raised primary text="ទាក់ទងទៅលេខ ១២៨០" onPress={() => {this.goTo('ChcScreen')}} style={{container: styles.btn}} />
            <Button raised primary text="ព័ត៌មានផ្សេងៗ" onPress={() => {this.goTo('OtherInfoScreen')}} style={{container: styles.btn}} />
            <Button raised primary text="ចុះឈ្មោះ" onPress={() => {this.goTo('RegisterScreen')}} style={{container: styles.btn}} />
            <Button primary text="អំពីកម្មវិធី" onPress={() => {this.goTo('AboutScreen')}} style={{container: styles.btn}} />
          </View>
        </View>

      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 24,
    alignItems: 'center',
    flexDirection: 'column'
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
  },
  imgWrapper: {
    marginTop: 24,
    marginBottom: 24,
    textAlign: 'center'
  },
  footer: {
    marginTop: 20,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    backgroundColor: 'green'
  },
  btn: {
    marginBottom: 16
  }
});
