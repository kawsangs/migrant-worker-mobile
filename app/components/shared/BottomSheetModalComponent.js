import React, { useCallback, useState } from 'react'
import { StyleSheet, Keyboard, View, Text } from 'react-native'
import {
  BottomSheetModal,
  BottomSheetBackdrop,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet'

import {defaultSnapPoints} from '../../constants/modal_constant'

const {useImperativeHandle} = React

const BottomSheetModalComponent = (props, ref) => {
  const modalRef = React.useRef()
  const [content, setContent] = useState(null)
  const [snapPoints, setSnapPoints] = useState(props.snapPoints || defaultSnapPoints)

  const present = () => {
    Keyboard.dismiss()
    modalRef.current?.present()
  }

  const dismiss = () => {
    modalRef.current?.dismiss()
  }

  const expand = () => {
    modalRef.current?.expand()
  }

  const collapse = () => {
    modalRef.current?.collapse()
  }

  useImperativeHandle(ref, () => ({
    setContent,
    setSnapPoints,
    present,
    dismiss,
    expand,
    collapse
  }))

  const renderBackdrop = useCallback( props => (
    <BottomSheetBackdrop
      {...props}
      disappearsOnIndex={-1}
      appearsOnIndex={0}
    />
  ), []);

  return (
    <BottomSheetModal
      ref={modalRef}
      enablePanDownToClose={true}
      backdropComponent={renderBackdrop}
      backgroundStyle={{backgroundColor: '#ffffff'}}
      snapPoints={snapPoints}
      onDismiss={() => !!props.onDismiss && props.onDismiss()}
      onChange={(index) => !!props.onChange && props.onChange(index)}
      // handleIndicatorStyle={{backgroundColor: color.pewter}}
    >
      <BottomSheetScrollView style={styles.contentContainer}>
        { content }
      </BottomSheetScrollView>
    </BottomSheetModal>
  )
};

const styles = StyleSheet.create({
  contentContainer: {
    width: '100%',
    flexGrow: 1,
  },
});

export default  React.forwardRef(BottomSheetModalComponent);