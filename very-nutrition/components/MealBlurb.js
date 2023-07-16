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
    borderWidth : 2,
    backgroundColor : 'white',
    height : 80,

    margin : 5,
    padding : 1,
  },
  containerTouchable : {
    flex : 1,
    direction : 'rtl',
  },
  mealName : {
    fontSize : 16,
    fontWeight : '600',
    textAlign : 'left',
    textAlignVertical : 'center',
  },
  foodChevron : {
    fontSize : 16,
    fontWeight : '600',
    textAlign : 'right',
    textAlignVertical : 'center',
  },
});

export default function MealBlurb({mealName}) {

  const navigation = useNavigation();

  [isSelected, set_isSelected] = useState(false);

  return (
  <View style={styles.container}>
  <Text style={styles.mealName}>{mealName}</Text>

  <TouchableOpacity style={ styles.containerTouchable }
    onPress={() => {navigation.push('MealDetails', mealName)}}>
    <Text style={ styles.foodChevron }>{'details >'}</Text>
  </TouchableOpacity>

  <TouchableOpacity style={ styles.containerTouchable }
    onPress={() => { set_isSelected(!isSelected); }}>
    <Text style={ styles.foodChevron }>{'select >'}</Text>
  </TouchableOpacity>

  </View>
  );
}
