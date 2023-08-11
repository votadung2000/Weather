import React, {useRef, useState} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity,
  Animated,
  Dimensions,
  Easing,
  Text,
} from 'react-native';
import {scale} from 'react-native-size-matters';
import AntDesign from 'react-native-vector-icons/AntDesign';

const {width} = Dimensions.get('screen');

const SEARCH_WIDTH = width - scale(40);

const Search = ({dataSuggest}) => {
  const refSO = useRef(new Animated.Value(0)).current;
  const refSW = useRef(new Animated.Value(0)).current;

  const [isFade, setFade] = useState(true);
  const [isSuggest, setSuggest] = useState(false);
  const [heightVS, setHeightVS] = useState(0);

  const clickOpenSearch = () => {
    if (isFade) {
      fadeSO(1);
      fadeSW(SEARCH_WIDTH);
    } else {
      fadeSO(0);
      fadeSW(0);
    }
    setFade(prev => !prev);
    setSuggest(prev => !prev);
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
      <View
        onLayout={event => {
          // refHVS.current = event.nativeEvent.layout?.height
          setHeightVS(event.nativeEvent.layout?.height);
        }}
        style={styles.content}>
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
      {/* {isSuggest && (
        <Animated.View
          style={[styles.vwSuggest, {
            opacity: refSO,
            top: heightVS,
          }]}>
          <View style={styles.vwFooter}>
            {dataSuggest?.map((item, index) => {
              return (
                <TouchableOpacity
                  key={index?.toString()}
                  activeOpacity={0.8}
                  style={styles.stItem}
                >
                  <Text>{'1111'}</Text>
                </TouchableOpacity>
              )
            })}
          </View>
        </Animated.View>
      )} */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: scale(10),
    justifyContent: 'center',
    alignItems: 'flex-end',
    zIndex: 9999,
    // alignItems: 'center',
  },
  content: {
    marginRight: scale(20),
    justifyContent: 'center',
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
  },
  vwInput: {
    height: scale(46),
    borderRadius: scale(46),
    backgroundColor: 'rgba(255, 255, 255, .3)',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  input: {
    marginLeft: scale(15),
    width: '80%',
    color: 'white',
    fontSize: 16,
  },
  vwFooter: {
    flex: 1,
    borderRadius: scale(20),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#D0D4DA',
    zIndex: 9999,
  },
  vwSuggest: {
    position: 'absolute',
    width: '100%',
    aspectRatio: 3,
    paddingHorizontal: scale(20),
  },
  stItem: {
    width: '100%',
    backgroundColor: 'red',
  },
});

export default Search;
