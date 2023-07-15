import { View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Platform,
  FlatList, } from 'react-native';

import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';

import WorkScreenRibbon from '../components/WorkScreenRibbon';
import FoodProduct from '../components/FoodProduct';

import { getFoodProducts, getFoodProductDetails } from '../api/Spoonacular';

const textInputHeight = 30;

export default function DefineMealScreen() {

  [searchedFood, set_searchedFood] = useState('');
  [foundFoodProducts, set_foundFoodProducts] = useState([]);

  const fetchFoodIds = async () => {
    const data = await getFoodProducts(searchedFood);
    if (data && data.products) {
      set_foundFoodProducts(data.products);
      console.log(data.products);
    }
  }

  useEffect( () => {
    fetchFoodIds();
  }, [searchedFood]);

  return (

  <View style={{ flex : 1, backgroundColor : 'white' }}>
  <WorkScreenRibbon/>

  <TextInput style={{ height : textInputHeight, backgroundColor : 'lightgray' }}
    onChangeText={(text) => {set_searchedFood(text)}}/>

  <FlatList
  data={foundFoodProducts}
  renderItem={ ({item}) => {
    return <FoodProduct id={item.id} image={item.image} imageType={item.imageType} title={item.title}/>;
  }}/>

  </View>

  );
}


  // this textinput says, search for this food.

  // {displayFoodIds('banana')}
  // this scrollview says, here's all the foods that your search brought up
  // each element will have a touchableopacity to put that food, into this meal

  // // this scrollview is the foods you have in this meal so far
  // <ScrollView style={{ flex : 1 }}>
  // </ScrollView>

  // // this scrollview is the meals you have so far (its own component?)
  // <ScrollView>
  // </ScrollView>


// how i want to go about defining a meal:
//   access a nutrition api of selectable foods
//   display a
// nutrition api i can use for individual selectable foods
// https://fdc.nal.usda.gov/api-guide.html
//
// basics of interfacing
//   but, no images
// URL             Verb       Purpose
// /food/{fdcId}   GET        Fetches one food item by FDC ID
// /foods          GET | POST Fetches multiple food items using input FDC IDs
// /foods/list     GET | POST Fetches paged list of foods, 'abridged' format
// /foods/search   GET | POST Returns a list of foods that matched search (query) keywords
