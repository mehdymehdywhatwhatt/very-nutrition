import { Image,
StyleSheet,
View,
Text,
TouchableOpacity,
ScrollView,
Platform,
Dimensions,
ImageBackground } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';

const maxProductTitleLength = 32;
const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container : {
    borderRadius : 10,
    borderColor : 'black',
    borderStyle : 'solid',
    borderWidth : 3,
    backgroundColor : 'white',
    height : 200,

    margin : 10,
    padding : 2,
  },
  containerChildren : {
    position : 'absolute',
    right : '2%',
    bottom : '2%',
  },
  containerDetails : {
    direction : 'rtl',
  },
  productTitle : {
    fontSize : 16,
    color : 'black',
    textAlignVertical : 'bottom',
    textAlign : 'right',
    fontWeight : '600',
    marginTop : 'auto',
  },
  image : {
    flex : 1,
    opacity : 0.8,
  },
  foodChevron : {
    fontSize : 16,
    fontWeight : '600',
    textAlign : 'right',
    textAlignVertical : 'center',
  }
});

export default function FoodProductBlurb({
  id, image, imageType, title, onAddFoodToSelectedMeals, onDeleteFoodFromSelectedMeals}) {

  const navigation = useNavigation();

  return (
  <View style={styles.container}>
  <ImageBackground style={ styles.image } resizeMode='cover' src={image}>
  </ImageBackground>

  <View style={ styles.containerChildren }>
  <Text style={ styles.productTitle }>
  {
  title.length < maxProductTitleLength ? title.toLowerCase()
    : title.slice(0, maxProductTitleLength).toLowerCase() + '...'
  }
  </Text>

  <TouchableOpacity style={ styles.containerDetails }
    onPress={() => {navigation.push('FoodProductDetails', id)}}>
    <Text style={ styles.foodChevron }>{'details >'}</Text>
  </TouchableOpacity>

  <TouchableOpacity style={ styles.containerDetails }
    onPress={() => { onAddFoodToSelectedMeals(spoonacular_id) }}>
    <Text style={ styles.foodChevron }>{'add to selected meals >'}</Text>
  </TouchableOpacity>

  <TouchableOpacity style={ styles.containerDetails }
    onPress={() => { onDeleteFoodFromSelectedMeals(spoonacular_id) }}>
    <Text style={ styles.foodChevron }>{'delete from selected meals >'}</Text>
  </TouchableOpacity>

  </View>
  </View>
  );
}
