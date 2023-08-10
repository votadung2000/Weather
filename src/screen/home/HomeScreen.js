import React from 'react';
import {StyleSheet, View, ImageBackground} from 'react-native';

import Search from './Search';
import Info from './Info';
import DailyForecast from './DailyForecast';

const HomeScreen = () => {
  return (
    <ImageBackground
      blurRadius={70}
      source={require('../../../assets/images/bg.png')}
      style={styles.bgImg}>
      <View style={styles.container}>
        <View style={styles.layout}>
          <Search />
          <Info />
        </View>
        <DailyForecast />
      </View>
    </ImageBackground>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  bgImg: {
    flex: 1,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  layout: {},
});
