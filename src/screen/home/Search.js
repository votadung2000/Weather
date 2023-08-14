import React, {useCallback, useRef, useState} from 'react';
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
import {debounce} from 'lodash';
import {FlatList} from 'react-native-gesture-handler';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import {ApiSearchWeather} from '../../actions/Api';

const {width} = Dimensions.get('screen');

const SEARCH_WIDTH = width - scale(40);
const SUGGEST_HEIGHT = scale(150);

const Search = ({handleChangeWithSearch}) => {
  const refSO = useRef(new Animated.Value(0)).current;
  const refSW = useRef(new Animated.Value(0)).current;
  const refSuggestH = useRef(new Animated.Value(0)).current;

  const [isFade, setFade] = useState(true);
  const [heightVS, setHeightVS] = useState(0);
  const [valueSearch, setValueSearch] = useState(null);
  const [dataSuggest, setDataSuggest] = useState(null);

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

  const displaySuggest = () => {
    if (valueSearch?.length > 0 && dataSuggest?.length > 0) {
      let convertH = 0;
      switch (dataSuggest?.length) {
        case 1:
          convertH = Number.parseFloat(SUGGEST_HEIGHT / 3).toFixed(2);
          break;
        case 2:
          convertH = Number.parseFloat(SUGGEST_HEIGHT / 2).toFixed(2);
          break;
        default:
          convertH = SUGGEST_HEIGHT;
          break;
      }
      Animated.timing(refSuggestH, {
        toValue: convertH,
        duration: 300,
        easing: Easing.circle,
        useNativeDriver: false,
      }).start();
      return true;
    } else {
      Animated.timing(refSuggestH, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
      setTimeout(() => {
        return false;
      }, 300);
    }
  };

  const fetchApiSearchWeather = useCallback(
    debounce(async text => {
      try {
        let response = await ApiSearchWeather({
          q: text,
        });
        setDataSuggest(response?.data);
      } catch (error) {}
    }, 400),
    [],
  );

  const onChangeSearch = text => {
    setValueSearch(text);
    if (text?.length > 0) {
      fetchApiSearchWeather(text);
    }
  };

  const clickCardSearch = item => {
    handleChangeWithSearch({
      lat: item?.lat,
      lon: item?.lon,
    });
    setValueSearch(null);
    setDataSuggest(null);
  };

  const keyExtractor = (_, index) => index?.toString();

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.stItem}
        onPress={() => clickCardSearch(item)}>
        <Entypo name="location-pin" size={scale(18)} color="#818181" />
        <Text style={styles.txtCard}>{`${item?.name}, ${item?.country}`}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View
        onLayout={event => {
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
            value={valueSearch}
            onChangeText={onChangeSearch}
            placeholder="Search"
            placeholderTextColor={'rgba(255, 255, 255, .5)'}
            style={styles.input}
          />
        </Animated.View>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={clickOpenSearch}
          style={styles.btnSearch}>
          <AntDesign
            name={isFade ? 'search1' : 'close'}
            size={scale(18)}
            color="white"
          />
        </TouchableOpacity>
      </View>
      {displaySuggest() && (
        <Animated.View
          style={[
            styles.vwSuggest,
            {
              top: heightVS,
              height: refSuggestH,
            },
          ]}>
          <FlatList
            data={dataSuggest}
            keyExtractor={keyExtractor}
            renderItem={renderItem}
            style={styles.stFl}
            contentContainerStyle={styles.stContentFl}
            showsVerticalScrollIndicator={false}
          />
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: scale(10),
    justifyContent: 'center',
    alignItems: 'flex-end',
    zIndex: 9999,
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
  vwSuggest: {
    width: '100%',
    position: 'absolute',
    paddingHorizontal: scale(20),
    zIndex: 9999,
  },
  stFl: {
    height: SUGGEST_HEIGHT,
    backgroundColor: '#D0D4DA',
    borderRadius: scale(20),
    paddingHorizontal: scale(15),
    paddingVertical: scale(10),
  },
  stContentFl: {
    flexGrow: 1,
    borderColor: 'transparent',
    paddingBottom: scale(15),
  },
  stItem: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#818181',
    paddingBottom: scale(5),
    marginBottom: scale(10),
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  txtCard: {
    color: '#818181',
  },
});

export default Search;
