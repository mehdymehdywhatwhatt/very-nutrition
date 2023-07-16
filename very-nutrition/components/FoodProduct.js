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

const maxProductTitleLength = 24;
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
  containerImage : {
    flex : 9,
  },
  containerDetails : {
    flex : 1,
    direction : 'rtl',
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
  foodDetailsChevron : {
    fontSize : 16,
    fontWeight : '600',
    textAlign : 'right',
    textAlignVertical : 'center',
  }
});

export default function FoodProduct({id, image, imageType, title}) {

  const navigation = useNavigation();

  return (
  <View style={styles.container}>
  <TouchableOpacity style={ styles.containerImage }>
    <Image style={ styles.image } resizeMode='cover' src={image}/>
    <Text style={ styles.productTitle }>
    {
    title.length < maxProductTitleLength ? title.toLowerCase()
      : title.slice(0, maxProductTitleLength).toLowerCase() + '...'
    }
    </Text>
  </TouchableOpacity>
  <TouchableOpacity style={ styles.containerDetails }
    onPress={() => {navigation.push('FoodProductDetails', id)}}>
    <Text style={ styles.foodDetailsChevron }>{'details >'}</Text>
  </TouchableOpacity>
  </View>
  );
}
