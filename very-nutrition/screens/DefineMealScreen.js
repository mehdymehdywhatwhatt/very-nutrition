import { View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Platform,
  FlatList,
  StyleSheet } from 'react-native';

import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';

import BackRibbon from '../components/BackRibbon';
import FoodProductBlurb from '../components/FoodProductBlurb';
import MealBlurb from '../components/MealBlurb';

import { getFoodProducts, getFoodProductDetails } from '../api/Spoonacular';
import { commonStyles } from '../constants';

const styles = StyleSheet.create({
  textInput : {
    height : 30,
    fontSize : 16,
    fontWeight : '400',
    color : 'black',
    borderWidth : 1,
    borderColor : 'black',
    borderRadius : 10,
    backgroundColor : 'white',

    textAlign : 'left',
    textAlignVertical : 'center',
    margin : 10,
    padding : 5,
  },
});

export default function DefineMealScreen() {

  const [searchedFood, set_searchedFood] = useState('');
  const [foundFoodProducts, set_foundFoodProducts] = useState([]);
  const [userMeals, set_userMeals] = useState([0, 1, 2]);

  const fetchFoodIds = async () => {
    const data = await getFoodProducts(searchedFood);
    if (data && data.products) {
      set_foundFoodProducts(data.products);
    }
  }

  useEffect( () => {
    fetchFoodIds();
  }, [searchedFood]);

  return (

  <View style={{ flex : 1, backgroundColor : 'white' }}>
  <BackRibbon/>

  <View style={{ flex : 1, backgroundColor : 'lightgray' }}>
    <Text style={ commonStyles.ribbon }>search foods</Text>
    <TextInput style={ styles.textInput } onChangeText={(text) => {set_searchedFood(text)}}/>

    <FlatList
    data={foundFoodProducts}
    renderItem={ ({item}) => {
      return <FoodProductBlurb id={item.id} image={item.image} imageType={item.imageType} title={item.title}/>;
    }}/>
  </View>

  <View style={{ flex : 1, backgroundColor : 'white' }}>
    <Text style={ commonStyles.ribbon }>view and edit meals</Text>
    <FlatList
    data={userMeals}
    renderItem={ ({item, index}) => <MealBlurb mealName={'meal' + index.toString()}/> }
    />
  </View>

  </View>

  );
}

// Further design notes for the DefineMealScreen.
// HTTP GET:
//   retrieve available food products from Spoonacular
//   retrieve presently-created meals from MongoDB
//
// HTTP POST:
//   create a new meal at MongoDB (must provide unique name)
//     one meal entity is an array (repeat-values allowed) of Spoonacular food product ids
//
// HTTP PUT:
//   update a meal at MongoDB (add food to the meal)
//   update a meal at MongoDB (delete food from the meal)
//
// HTTP DELETE: 
//   delete a meal at MongoDB (wipe all associations to other foods)
//
