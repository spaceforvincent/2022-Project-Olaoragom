import React, { useEffect, useState, useRef } from 'react'

import { View, StyleSheet, Text, Modal, Animated, TouchableWithoutFeedback, Dimensions, PanResponder, Image, TouchableOpacity } from 'react-native';
import { TextLight, TextMedium, TextBold, TextExtraBold } from '../../components/common/TextFont';
import { getMountainDetail } from '../../apis/Map';

import { useNavigation } from '@react-navigation/native';

const MountainSemiDetail = (props) => {

  const navigation = useNavigation()

  const { modalVisible, setModalVisible, mountainId, mountainName, mountainRegion, mountainImage } = props

  const screenHeight = Dimensions.get('screen').height;
  const panY = useRef(new Animated.Value(screenHeight)).current;

  const [ mountainData, setMountainData ] = useState([])

  const translateY = panY.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: [0, 0, 1],
  });

  const resetBottomSheet = Animated.timing(panY, {
    toValue: 0,
    duration: 300,
    useNativeDriver: true,
  });

  const closeBottomSheet = Animated.timing(panY, {
    toValue: screenHeight,
    duration: 300,
    useNativeDriver: true,
  });

  const panResponders = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => false,
      onPanResponderMove: (event, gestureState) => {
        panY.setValue(gestureState.dy);
      },
      onPanResponderRelease: (event, gestureState) => {
        if (gestureState.dy > 0 && gestureState.vy > 1.5) {
          closeModal();
        } else {
          resetBottomSheet.start();
        }
      },
    }),
  ).current;

  useEffect(() => {
    if (props.modalVisible) {
      resetBottomSheet.start();
    }
  }, [props.modalVisible]);

  const closeModal = () => {
    closeBottomSheet.start(() => {
      setModalVisible(false);
    });
  };


  return (
    <Modal
      visible={modalVisible}
      animationType={'fade'}
      transparent
      statusBarTranslucent>
      <View style={styles.overlay}>
        <TouchableWithoutFeedback onPress={closeModal}>
          <View style={styles.background} />
        </TouchableWithoutFeedback>
        <Animated.View
          style={{
            ...styles.bottomSheetContainer,
            transform: [{translateY: translateY}],
          }}
          {...panResponders.panHandlers}>
          <TouchableOpacity onPress={() => navigation.navigate('MountainDetail', {mountainId: mountainId})}>
            <TextExtraBold style={styles.title}>{mountainName}</TextExtraBold>
          </TouchableOpacity>
          
          <Image style={styles.image} source={{ uri: mountainImage}}></Image>

          <TextBold>{mountainRegion}</TextBold>

        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({

  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },

  background: {
    flex: 1,
  },

  bottomSheetContainer: {
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },

  title: {
    fontSize: 50,
  },

  image: {
    width: 500,
    height: 300,
  }
});

export default MountainSemiDetail;
