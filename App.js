import React from 'react';
import {StyleSheet, SafeAreaView, Platform, StatusBar} from 'react-native';

import HomeScreen from './src/screen/home/HomeScreen';

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      {Platform.OS === 'android' && (
        <StatusBar animated barStyle="light-content" />
      )}
      <HomeScreen />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default App;
