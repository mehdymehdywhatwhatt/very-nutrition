import { StyleSheet } from 'react-native';

const AppColors = {
};

const AppFonts = {
};

const AppSizes = {
  HomeScreenElementHeight : 200,
  HomeScreenElementBorderWidth : 3,
  HomeScreenElementBorderRadius : 10,
  HomeScreenElementTextSize : 18,
  HomeScreenElementPadding : 10,
  HomeScreenElementMargin : 10,
  RibbonTextSize : 24,
};

const commonStyles = StyleSheet.create({
  ribbon : {
    fontSize : 24,
    fontWeight : '800',
    color : 'black',
    textAlign : 'left',
    textAlignVertical : 'center',
  },
  activityIndicator : {
    size : 'large',
    color : 'black',
    flex : 1,
  },
});

const SafePadding = Platform.OS === 'android' ? 20 : 0;

const keyRapidAPI = '08c1ba332emshaf7596048b8cc62p1b16ccjsnfc0793d3c2d0';

export { AppColors,
AppFonts,
AppSizes,
SafePadding,
keyRapidAPI,
commonStyles};

