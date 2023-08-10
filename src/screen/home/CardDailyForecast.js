import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {scale} from 'react-native-size-matters';
import FastImage from 'react-native-fast-image';

const CardDailyForecast = () => {
  return (
    <View style={styles.container}>
      <View style={styles.vwImg}>
        <FastImage
          style={styles.img}
          source={require('../../../assets/images/heavyrain.png')}
          resizeMode={FastImage.resizeMode.contain}
        />
      </View>
      <Text style={styles.txtDay}>Monday</Text>
      <Text style={styles.temperature}>23&#176;</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginEnd: scale(20),
    backgroundColor: 'rgba(255, 255, 255, .3)',
    padding: scale(10),
    borderRadius: scale(10),
  },
  vwImg: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    width: scale(32),
    height: scale(32),
  },
  txtDay: {
    color: 'white',
    textAlign: 'center',
    fontSize: 12,
    marginTop: scale(5),
    marginBottom: scale(2),
  },
  temperature: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '700',
  },
});

export default CardDailyForecast;
