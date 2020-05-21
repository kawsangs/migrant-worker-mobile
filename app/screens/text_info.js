import React from 'react';
import pdfList from '../data/json/pdf_list';
import PdfCards from '../components/pdf_cards';
import CollapsibleNavbar from '../components/collapsible_navbar';

export default class TextInfo extends React.Component {
  state = {}

  _renderContent() {
    return (
      <PdfCards
        statisticKey={'text_info_view_pdf'}
        navigation={this.props.navigation}
        list={pdfList}
        onDownload={() => this.setState({loading: true})}
        onFinishDownload={() => this.setState({loading: false})}
      />
    )
  }

  render() {
    return (
      <CollapsibleNavbar
        options={{
          title: 'ព័ត៌មានជាអក្សរ',
          loading: this.state.loading,
          bodyContent: this._renderContent()
        }}
      />
    );
  }
}
