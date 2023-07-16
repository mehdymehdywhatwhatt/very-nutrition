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

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container : {
    borderRadius : 10,
    borderColor : 'black',
    borderStyle : 'solid',
    borderWidth : 3,
    backgroundColor : 'white',
    height : 20,

    margin : 10,
    padding : 2,
  },
  containerDetails : {
    flex : 1,
    direction : 'rtl',
  },
  mealName : {
    fontSize : 16,
    fontWeight : '600',
    textAlign : 'left',
    textAlignVertical : 'center',
  }
  foodDetailsChevron : {
    fontSize : 16,
    fontWeight : '600',
    textAlign : 'right',
    textAlignVertical : 'center',
  }
});

export default function Meal({mealName}) {

  return (
  <View style={styles.container}>
  <Text style={styles.mealName}>{mealName}</Text>
  <TouchableOpacity style={ styles.containerDetails }
    onPress={() => {navigation.push('MealDetails', mealName)}}>
    <Text style={ styles.foodDetailsChevron }>{'details >'}</Text>
  </TouchableOpacity>
  </View>
  );
}
