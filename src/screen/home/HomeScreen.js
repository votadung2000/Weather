import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  ImageBackground,
  SafeAreaView,
  Platform,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {
  PERMISSIONS,
  RESULTS,
  openSettings,
  request,
} from 'react-native-permissions';
import Geolocation from '@react-native-community/geolocation';

import {ApiGetForecastWeather} from '../../actions/Api';

import Search from './Search';
import Info from './Info';
import DailyForecast from './DailyForecast';

const HomeScreen = () => {
  const [dataWeather, setDataWeather] = useState(null);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    checkPermission();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleConfirm = () => {
    openSettings();
  };

  const handleOpenSetting = () => {
    Alert.alert('Warning', 'Confirm permission to use the location!!', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {text: 'OK', onPress: () => handleConfirm()},
    ]);
  };

  const handleRecheckPermission = () => {
    request(
      Platform.OS === 'ios'
        ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
        : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
    ).then(result => {
      if (result === RESULTS.GRANTED) {
        handleGetGeoLocation();
      } else {
        handleOpenSetting();
      }
    });
  };

  const checkPermission = () => {
    request(
      Platform.OS === 'ios'
        ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
        : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
    )
      .then(result => {
        switch (result) {
          case RESULTS.GRANTED:
            handleGetGeoLocation();
            break;
          case RESULTS.UNAVAILABLE:
          case RESULTS.DENIED:
          case RESULTS.LIMITED:
            handleRecheckPermission();
            break;
          case RESULTS.BLOCKED:
            handleOpenSetting();
            break;
        }
      })
      .catch(error => console.log(error));
  };

  const handleGetGeoLocation = () => {
    Geolocation.getCurrentPosition(
      result => {
        handleCallApiCurrentWeather({
          lat: result?.coords?.latitude,
          lon: result?.coords?.longitude,
        });
      },
      error => {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            console.log('Người dùng đã từ chối cấp quyền truy cập vị trí.');
            break;
          case error.POSITION_UNAVAILABLE:
            console.log('Thông tin vị trí không khả dụng.');
            break;
          case error.TIMEOUT:
            console.log('Quá thời gian để lấy vị trí.');
            break;
          default:
            console.log('Lỗi không xác định:', error.message);
        }
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };

  const handleCallApiCurrentWeather = async body => {
    setLoading(true);
    try {
      let response = await ApiGetForecastWeather({
        q: `${body?.lat},${body?.lon}`,
      });

      setDataWeather(response?.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log('Home ApiGetForecastWeather', error);
    }
  };

  return (
    <ImageBackground
      blurRadius={70}
      source={require('../../../assets/images/bg.png')}
      style={styles.bgImg}>
      <SafeAreaView />
      <View style={styles.container}>
        <View style={styles.layout}>
          <Search dataSuggest={[1, 2, 3, 4, 5, 6, 7, 8]} />
          <Info
            dataLocation={dataWeather?.location}
            dataCurrent={dataWeather?.current}
          />
        </View>
        <DailyForecast dataForecast={dataWeather?.forecast} />
      </View>
      {isLoading && (
        <View style={styles.vwLoading}>
          <ActivityIndicator size="large" color={'white'} />
        </View>
      )}
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
  vwLoading: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(9, 52, 58, .3)',
  },
});
