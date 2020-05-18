import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import NetInfo from "@react-native-community/netinfo";
import { Icon } from 'react-native-material-ui';
import { Color, FontFamily, FontSize, Style } from '../assets/stylesheets/base_style';
import PlaySound from '../components/play_sound';
import uuidv4 from '../utils/uuidv4';
import realm from '../schemas/schema';
import pdfList from '../data/json/pdf_list';
import LoadingIndicator from '../components/loading_indicator';
import { ApiBlob } from '../utils/api';
import { addStatistic } from '../utils/statistic';

export default class TextInfo extends React.Component {
  state = {};

  _onPress(item) {
    if (item.routeName != 'PdfViewScreen' ) {
      addStatistic(`goTo${item.routeName.split('Screen')[0]}`);
      return this.props.navigation.navigate(item.routeName, { title: item.title, hint: item.hint, list: item.subList });
    }

    addStatistic('text_info_view_pdf', { pdfFile: item.pdfFile});

    let pdf = realm.objects('Pdf').filtered('name="' + item.pdfFile + '"')[0];
    if (!!pdf) {
      return this.props.navigation.navigate(item.routeName, {title: item.title, pdfFilepath: pdf.uri});
    }

    NetInfo.fetch().then(state => {
      if(!state.isConnected) {
        return alert('សូមភ្ជាប់បណ្តាញអ៊ីនធឺណេតជាមុនសិន!');
      }

      this._downloadFile(item);
    });
  }

  _downloadFile(item) {
    this.setState({loading: true});

    ApiBlob.downloadPdf(item.pdfFile).then((res) => {
      if (res.respInfo.status != 200) {
        this.setState({loading: false});
        return alert('ការទាញយកមិនជោគជ័យ');
      }

      realm.write(() => {
        realm.create('Pdf', {code: uuidv4(), name: item.pdfFile, uri: res.data}, true);
        this.setState({loading: false});
      });

      this.props.navigation.navigate(item.routeName, {title: item.title, pdfFilepath: res.data});
    });
  }

  _isPdfExist(pdfFile) {
    return !!realm.objects('Pdf').filtered('name="' + pdfFile + '"').length;
  }

  _renderCard(screen) {
    let label = 'ចូលមើល';
    let textStyle = {};
    let icon = 'visibility';
    let iconColor = Color.primary;

    if (screen.routeName == 'PdfViewScreen' && !this._isPdfExist(screen.pdfFile)) {
      label = 'ទាញយក';
      textStyle = { color: Color.red };
      icon = 'cloud-download';
      iconColor = Color.red;
    }

    return (
      <TouchableOpacity
        key={ uuidv4() }
        style={Style.card}
        onPress={() => this._onPress(screen)}
        >
        <View style={Style.cardContent}>
          <View style={{flex: 1, marginRight: 16, justifyContent: 'center'}}>
            <Text>{screen.title}</Text>
          </View>

          <PlaySound
            style={{paddingLeft: 10}}
            fileName={screen.audioFilename || 'register'}
            activePlaying={this.state.activePlaying}
            onPress={(fileName) => this.setState({activePlaying: fileName})}/>
        </View>

        <View style={{flexDirection: 'row'}}>
          <Icon name={icon} size={24} color={iconColor} style={{marginRight: 5}} />
          <Text style={[styles.goDetailText, textStyle]}>{label}</Text>
          <Icon name='keyboard-arrow-right' size={24} />
        </View>
      </TouchableOpacity>
    );
  }

  _renderCardList() {
    let { route } = this.props;
    let list = (!!route && !!route.params && route.params.list) || pdfList;

    return list.map(item => this._renderCard(item));
  }

  _renderHint() {
    let { route } = this.props;
    let hint = (!!route && !!route.params && route.params.hint);

    if(!hint) { return(null); }

    return(<Text>{hint}</Text>);
  }

  _renderLoading() {
    return (
      <View style={styles.loadingLayer}>
        <LoadingIndicator loading={true}/>
      </View>
    );
  }

  render() {
    return (
      <View style={{flex: 1}}>
        { this.state.loading && this._renderLoading() }

        <ScrollView style={{flex: 1}}>
          <View style={Style.container}>
            { this._renderHint() }
            { this._renderCardList() }
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  goDetailText: {
    flex: 1,
    fontFamily: FontFamily.title,
    color: Color.primary
  },
  loadingLayer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    zIndex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)'
  }
});
