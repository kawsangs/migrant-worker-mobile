import React, { Component } from 'react';
import { TouchableOpacity, View, Modal, Text, StyleSheet } from 'react-native';

import { Color } from '../assets/stylesheets/base_style';
import OutlineInfoIcon from './OutlineInfoIcon';

class ConfirmModal extends Component {
  render() {
    return (
      <Modal
        transparent={true}
        visible={this.props.showModal}
      >
        <View style={{flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: 'rgba(0,0,0,0.3)'}}>
          <View style={styles.modalView}>
            <View style={{flexDirection: 'row', alignContent: 'flex-start'}}>
              <OutlineInfoIcon/>
              <Text style={{flex: 1}}>{this.props.message}</Text>
            </View>

            <View style={{flexDirection: 'row', paddingTop: 20, paddingBottom: 0, alignSelf: 'flex-end'}}>
              <TouchableOpacity onPress={() => this.props.cancel()} style={{paddingHorizontal: 5, marginRight: 5}}>
                <Text style={{color: Color.primary, fontSize: 14}}>បោះបង់</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.props.confirm()} style={{paddingLeft: 5, paddingRight: 0}}>
                <Text style={{color: Color.primary, fontSize: 14}}>បាទ/ចាស</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    )
  }
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 2,
    paddingVertical: 20,
    paddingHorizontal: 16,
    paddingBottom: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    maxWidth: '85%'
  }
});

export default ConfirmModal;