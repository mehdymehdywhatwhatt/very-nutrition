import { Image,
StyleSheet,
View,
Text,
TouchableOpacity,
ScrollView,
Platform,
Dimensions } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';

import { AppColors, AppFonts, AppSizes } from '../constants';

const maxProductTitleLength = 24;
const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container : {
    borderRadius : 10,
    borderColor : 'black',
    borderStyle : 'solid',
    borderWidth : 3,
    backgroundColor : 'white',
    padding : 10,
    height : 200,
  },
  containerTouchable : {
    flex : 1,
  },
  productTitle : {
    fontSize : 16,
    color : 'black',
    textAlignVertical : 'bottom',
    textAlign : 'right',
    fontWeight : '600',
  },
  image : {
    flex : 1,
  },
  foodChevron : {
    fontSize : 16,
    fontWeight : '600',
  }
});

export default function FoodProduct({id, image, imageType, title}) {

  const navigation = useNavigation();

  return (
  <View style={styles.container}>
  <TouchableOpacity style={ styles.containerTouchable }>
    <Image style={ styles.image } resizeMode='cover' src={image}/>
    <Text style={ styles.productTitle }>
    {
    title.length < maxProductTitleLength ? title.toLowerCase()
      : title.slice(0, maxProductTitleLength).toLowerCase() + '...'
    }
    </Text>
  </TouchableOpacity>
  <TouchableOpacity style={ styles.containerTouchable }
    onPress={() => {navigation.push('FoodProductDetails', id)}} >
    <Text>{'>'}</Text>
  </TouchableOpacity>
  </View>
  );
}
