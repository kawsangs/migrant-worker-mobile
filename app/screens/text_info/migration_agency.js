import React from 'react';
import { Icon, Toolbar } from 'react-native-material-ui';
import { Color, FontFamily, FontSize, Style } from '../../assets/stylesheets/base_style';
import pdfList from '../../data/json/pdf_list';
import PdfCards from '../../components/pdf_cards';
import CollapsibleNavbar from '../../components/collapsible_navbar';

export default class MigrationAgency extends React.Component {
  listData = (!!this.props.route && !!this.props.route.params && this.props.route.params.list) || pdfList[0].subList;
  state = {
    agencyList: this.listData
  };

  _onChangeText(val) {
    if (!val) {
      return this._onRefresh();
    }

    if (val.length > 1) {
      let list = this.listData.filter((agency) => {
        return agency.title.toLowerCase().indexOf(val.toLowerCase()) > -1
      })
      this.setState({agencyList: list});
    }
  }

  _onRefresh() {
    this.setState({agencyList: this.listData});
  }

  _renderToolbar() {
    return (
      <Toolbar
        leftElement={ 'arrow-back' }
        centerElement={'ភ្នាក់ងារចំណាកស្រុក'}
        searchable={{
          autoFocus: true,
          placeholder: 'ស្វែងរក',
          onChangeText: this._onChangeText.bind(this),
          onSearchClosed: this._onRefresh.bind(this)
        }}
        onLeftElementPress={() => this.props.navigation.goBack()}
        style={{titleText: {fontFamily: FontFamily.title}, container: {width: '100%'}}}
      />
    );
  }

  _renderContent() {
    return (
      <PdfCards
        statisticKey={'migration_agency_view_pdf'}
        navigation={this.props.navigation}
        list={this.state.agencyList}
        onDownload={() => this.setState({loading: true})}
        onFinishDownload={() => this.setState({loading: false})}
      />
    )
  }

  render() {
    return (
      <CollapsibleNavbar
        options={{
          loading: this.state.loading,
          bodyContent: this._renderContent(),
          header: this._renderToolbar()
        }}
      />
    );
  }
}
