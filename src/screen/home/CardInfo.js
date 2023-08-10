import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {scale} from 'react-native-size-matters';
import FastImage from 'react-native-fast-image';

const CardInfo = ({uri, value}) => {
  return (
    <View style={styles.container}>
      <View style={styles.vwImg}>
        <FastImage
          style={styles.img}
          source={uri}
          resizeMode={FastImage.resizeMode.contain}
        />
      </View>
      <Text style={styles.txtValue}>{value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  vwImg: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    width: scale(18),
    height: scale(18),
  },
  txtValue: {
    color: 'white',
    marginLeft: scale(5),
    fontSize: 16,
  },
});

export default CardInfo;
