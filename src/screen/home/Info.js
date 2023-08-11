import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {scale} from 'react-native-size-matters';

import CardInfo from './CardInfo';

const Info = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.txtLocation}>Location</Text>
      <View style={styles.vwImg}>
        <FastImage
          style={styles.img}
          source={require('../../../assets/images/partlycloudy.png')}
          resizeMode={FastImage.resizeMode.contain}
        />
      </View>
      <Text style={styles.temperature}>23&#176;</Text>
      <Text style={styles.type}>Type</Text>
      <View style={styles.infoOther}>
        <CardInfo
          value={'22Km'}
          uri={require('../../../assets/images/wind.png')}
        />
        <CardInfo
          value={'23%'}
          uri={require('../../../assets/images/drop.png')}
        />
        <CardInfo
          value={'6:05 Am'}
          uri={require('../../../assets/images/sun.png')}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: scale(30),
    paddingHorizontal: scale(20),
  },
  txtLocation: {
    fontSize: 24,
    fontWeight: '700',
    color: 'white',
    textAlign: 'center',
  },
  vwImg: {
    marginTop: scale(30),
    marginBottom: scale(30),
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    width: scale(150),
    height: scale(150),
  },
  temperature: {
    fontSize: 56,
    fontWeight: '700',
    color: 'white',
    textAlign: 'center',
  },
  type: {
    marginTop: scale(20),
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
  },
  infoOther: {
    marginTop: scale(30),
    paddingHorizontal: scale(10),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default Info;
