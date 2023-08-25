import React, { Component } from 'react';
import { View, Modal, Text, StyleSheet } from 'react-native';

import OutlineInfoIcon from './OutlineInfoIcon';
import AlertActionButtonsComponent from './shared/AlertActionButtonsComponent';

class ConfirmModal extends Component {
  render() {
    return (
      <Modal
        transparent={true}
        visible={this.props.showModal}
      >
        <View style={{flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: 'rgba(0,0,0,0.3)', borderWidth: 1}}>
          <View style={styles.modalView}>
            <View style={{flexDirection: 'row', alignContent: 'flex-start'}}>
              <OutlineInfoIcon/>
              <Text style={{flex: 1}}>{this.props.message}</Text>
            </View>

            <AlertActionButtonsComponent
              leftLabel='បោះបង់' onPressLeft={() => this.props.cancel()}
              rightLabel='បាទ/ចាស' onPressRight={() => this.props.confirm()}
              containerStyle={{alignSelf: 'flex-end', paddingTop: 16, paddingRight: 0, paddingBottom: 0}}
            />
          </View>
        </View>
      </Modal>
    )
  }
}

const styles = StyleSheet.create({
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