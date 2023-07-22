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
import { createMeal, deleteMeal, findAllMeals, findMealByName } from '../api/MongoDB';
import { commonStyles } from '../constants';

const styles = StyleSheet.create({
  searchFoodTextInput : {
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
  addDeleteMealTextInput : {
    flex : 1,
    borderColor : 'black',
    fontSize : 16,
    backgroundColor : 'green',
  },
  addDeleteMealPressable : {
    flex : 1,
    borderColor : 'black',
    backgroundColor : 'blue',
  },
});

export default function DefineMealScreen() {
  
  const [searchedFood, set_searchedFood] = useState('');
  const [foundFoodProducts, set_foundFoodProducts] = useState([]);
  const [userMeals, set_userMeals] = useState([]);

  const [mealAddName, set_mealAddName] = useState('');
  const [mealDeleteName, set_mealDeleteName] = useState('');

  const fetchFoodIds = async () => {
    const data = await getFoodProducts(searchedFood);
    if (data && data.products) {
      set_foundFoodProducts(data.products);
    }
  }

  const fetchUserMeals = async () => {
    const data = await findAllMeals();
    if (data) {
      set_userMeals(data);
    }
  }

  useEffect( () => {
    fetchFoodIds();
  }, [searchedFood]);

  useEffect( () => {
    fetchUserMeals();
  }, []);

  return (

  <View style={{ flex : 1, backgroundColor : 'white' }}>
  <BackRibbon/>

  <View style={{ flex : 1, backgroundColor : 'lightgray' }}>
    <Text style={ commonStyles.ribbon }>search foods</Text>
    <TextInput style={ styles.searchFoodTextInput } onChangeText={(text) => {set_searchedFood(text)}}/>

    <FlatList
    data={foundFoodProducts}
    renderItem={ ({item}) => {
      return <FoodProductBlurb id={item.id} image={item.image} imageType={item.imageType} title={item.title}/>;
    }}/>
  </View>

  <View style={{ flex : 1, backgroundColor : 'white' }}>
    <Text style={ commonStyles.ribbon }>view meals</Text>
    <FlatList
    data={userMeals}
    renderItem={ ({item, index}) => <MealBlurb mealName={item.meal_name}/> }
    style={{ flex : 4 }}
    />

  </View>

  <View style={{ flexDirection : 'row' }}>
    <TextInput style={styles.addDeleteMealTextInput}
      onChangeText={(text) => {set_mealAddName(text)}} placeholder={'create a meal'}/>
    <TouchableOpacity style={styles.addDeleteMealPressable}
      onPress={() => { createMeal(mealAddName); fetchUserMeals(); }}>
    </TouchableOpacity>
  </View>

  <View style={{ flexDirection : 'row' }}>
    <TextInput style={styles.addDeleteMealTextInput}
      onChangeText={(text) => {set_mealDeleteName(text)}} placeholder={'delete a meal'}/>
    <TouchableOpacity style={styles.addDeleteMealPressable}
      onPress={() => { deleteMeal(mealDeleteName); fetchUserMeals(); }}>
    </TouchableOpacity>    
  </View>

  </View>

  );
}

