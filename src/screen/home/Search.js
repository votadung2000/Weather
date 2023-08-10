import React, {useRef, useState} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity,
  Animated,
  Dimensions,
  Easing,
} from 'react-native';
import {scale} from 'react-native-size-matters';
import AntDesign from 'react-native-vector-icons/AntDesign';

const {width} = Dimensions.get('screen');

const SEARCH_WIDTH = width * 0.7;

const Search = () => {
  const refSO = useRef(new Animated.Value(0)).current;
  const refSW = useRef(new Animated.Value(0)).current;

  const [isFade, setFade] = useState(true);

  const clickOpenSearch = () => {
    if (isFade) {
      fadeSO(1);
      fadeSW(SEARCH_WIDTH);
    } else {
      fadeSO(0);
      fadeSW(0);
    }
    setFade(prev => !prev);
  };

  const fadeSO = value => {
    Animated.timing(refSO, {
      toValue: value,
      duration: 300,
      easing: Easing.circle,
      useNativeDriver: false,
    }).start();
  };

  const fadeSW = value => {
    Animated.timing(refSW, {
      toValue: value,
      duration: 300,
      easing: Easing.circle,
      useNativeDriver: false,
    }).start();
  };

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.vwInput,
          {
            opacity: refSO,
            width: refSW,
          },
        ]}>
        <TextInput
          // onChangeText={onChangeNumber}
          // value={number}
          placeholder="Search"
          placeholderTextColor={'rgba(255, 255, 255, .5)'}
          style={styles.input}
        />
      </Animated.View>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={clickOpenSearch}
        style={styles.btnSearch}>
        <AntDesign name="search1" size={scale(18)} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: scale(25),
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginRight: scale(20),
  },
  btnSearch: {
    position: 'absolute',
    top: scale(5),
    right: 0,
    width: scale(36),
    height: scale(36),
    borderRadius: scale(36),
    backgroundColor: 'rgba(255, 255, 255, .5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
  },
  vwInput: {
    height: scale(46),
    borderRadius: scale(46),
    backgroundColor: 'rgba(255, 255, 255, .3)',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  input: {
    marginLeft: scale(10),
    width: '80%',
    color: 'white',
    fontSize: 16,
  },
});

export default Search;
