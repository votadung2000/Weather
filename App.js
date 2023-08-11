import React from 'react';
import {StyleSheet, StatusBar, View} from 'react-native';

import HomeScreen from './src/screen/home/HomeScreen';

const App = () => {
  return (
    <View style={styles.container}>
      <StatusBar
        animated
        barStyle="light-content"
        backgroundColor={'#09343A'}
      />
      <HomeScreen />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
