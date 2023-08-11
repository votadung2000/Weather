import React from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {scale} from 'react-native-size-matters';
import AntDesign from 'react-native-vector-icons/AntDesign';

import CardDailyForecast from './CardDailyForecast';

const DailyForecast = ({dataForecast}) => {
  const keyExtractor = (_, index) => index?.toString();

  const renderItem = ({item}) => {
    return <CardDailyForecast data={item} />;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <AntDesign name="calendar" size={scale(18)} color="white" />
        <Text style={styles.title}>Daily Forecast</Text>
      </View>
      <FlatList
        horizontal
        data={dataForecast?.forecastday}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        style={styles.stList}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginBottom: scale(30),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: scale(10),
    paddingHorizontal: scale(20),
  },
  title: {
    fontSize: 16,
    color: 'white',
    marginLeft: scale(5),
  },
  stList: {
    marginStart: scale(20),
  },
});

export default DailyForecast;
