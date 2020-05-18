import React from 'react';
import pdfList from '../data/json/pdf_list';
import PdfCards from '../components/pdf_cards';

export default class TextInfo extends React.Component {
  render() {
    return (
      <PdfCards
        statisticKey={'text_info_view_pdf'}
        navigation={this.props.navigation}
        list={pdfList}
      />
    );
  }
}
