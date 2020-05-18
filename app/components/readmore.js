import React from 'react';
import {
  Text,
} from 'react-native';

export default class Readmore extends React.Component {
  state = {
    hidden: true
  };

  render() {
    if (!this.props.text.length) {
      return (null)
    }

    let maxlimit = this.props.maxlimit || 70;
    let shouldTruncate = this.props.text.length > maxlimit && this.state.hidden;
    let desc = shouldTruncate ? (this.props.text.substring(0, maxlimit-3) + '...') : this.props.text;

    return (
      <Text style={{fontSize: 15}}>
        { desc }
        { shouldTruncate && <Text style={{color: 'gray'}} onPress={() => this.setState({hidden: false})}> មើលច្រើនទៀត</Text> }
      </Text>
    )
  }
}
