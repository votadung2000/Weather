import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {scale} from 'react-native-size-matters';
import FastImage from 'react-native-fast-image';
import moment from 'moment';

import {weatherImages} from '../../constants/weatherImages';

const CardDailyForecast = ({data}) => {
  const shortString = value => {
    if (value?.length > 7) {
      return value?.slice(0, 7) + '..';
    }
    return value;
  };

  return (
    <View style={styles.container}>
      <View style={styles.vwImg}>
        <FastImage
          style={styles.img}
          source={weatherImages[data?.day?.condition?.text]}
          resizeMode={FastImage.resizeMode.contain}
        />
      </View>
      <Text style={styles.txtDay}>
        {shortString(moment(data?.date).format('dddd'))}
      </Text>
      <Text style={styles.temperature}>{data?.day?.avgtemp_c}&#176;</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: scale(70),
    marginEnd: scale(20),
    backgroundColor: 'rgba(255, 255, 255, .3)',
    padding: scale(10),
    paddingHorizontal: scale(10),
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
