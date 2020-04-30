import React from 'react';
import { StyleSheet, Dimensions, View } from 'react-native';
import Pdf from 'react-native-pdf';

export default class PdfView extends React.Component {
  render() {
    let source = { uri: this.props.route.params.pdfFilepath };

    return (
      <View style={styles.container}>
        <Pdf
          source={source}
          onLoadComplete={(numberOfPages,filePath) => {
            console.log(`number of pages: ${numberOfPages}`);
          }}
          onPageChanged={ (page,numberOfPages) => {
            console.log(`current page: ${page}`);
          }}
          onError={ (error) => {
            console.log(error);
          }}
          onPressLink={ (uri) => {
            console.log(`Link presse: ${uri}`)
          }}
          style={styles.pdf} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  pdf: {
    flex:1,
    width:Dimensions.get('window').width,
    height:Dimensions.get('window').height,
  }
});
