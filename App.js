import React from 'react';
import {StyleSheet, StatusBar, View} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

import HomeScreen from './src/screen/home/HomeScreen';

const App = () => {
  return (
    <GestureHandlerRootView style={styles.gesture}>
      <View style={styles.container}>
        <StatusBar
          animated
          barStyle="light-content"
          backgroundColor={'#09343A'}
        />
        <HomeScreen />
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  gesture: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
});

export default App;
