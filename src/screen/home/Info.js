import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {scale} from 'react-native-size-matters';
import FastImage from 'react-native-fast-image';
import moment from 'moment';

import {weatherImages} from '../../constants/weatherImages';

import CardInfo from './CardInfo';

const Info = ({dataLocation, dataCurrent}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.txtLocation}>
        {`${dataLocation?.name}, ${dataLocation?.country}`}
      </Text>
      <View style={styles.vwImg}>
        <FastImage
          style={styles.img}
          source={weatherImages[dataCurrent?.condition?.text]}
          resizeMode={FastImage.resizeMode.contain}
        />
      </View>
      <Text style={styles.temperature}>{dataCurrent?.temp_c}&#176;</Text>
      <Text style={styles.type}>{dataCurrent?.condition?.text}</Text>
      <View style={styles.infoOther}>
        <CardInfo
          value={dataCurrent?.wind_kph}
          uri={require('../../../assets/images/wind.png')}
        />
        <CardInfo
          value={dataCurrent?.humidity}
          uri={require('../../../assets/images/drop.png')}
        />
        <CardInfo
          value={moment(dataCurrent?.last_updated).format('LT')}
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
