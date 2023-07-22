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
import { createMeal, deleteMeal, findAllMeals } from '../api/MongoDB';
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
    borderColor : 'black',
    fontSize : 16,
    width : '80%',
    backgroundColor : 'red',
  },
});

export default function DefineMealScreen() {

  const [searchedFood, set_searchedFood] = useState('');
  const [foundFoodProducts, set_foundFoodProducts] = useState([]);
  const [userMeals, set_userMeals] = useState([]);

  const [mealAddName, set_mealAddName] = useState('');
  const [mealDeleteName, set_mealDeleteName] = useState('');
  const [isMealListDirty, set_isMealListDirty] = useState(false);

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
  }, [isMealListDirty]);

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

    <View style={{ flex : 1 }}>
    <TouchableOpacity style={{ width : '20%' }}
      onPress={() => createMeal(mealAddname)}>
    </TouchableOpacity>
    <TextInput style={styles.addDeleteMealTextInput} placeholder={'add a meal'}
      onChangeText={(text) =>
      {
        set_mealAddName(text);
        set_isMealListDirty(true);
      }}/>
    </View>

    <View style={{ flex : 1 }}>
    <TouchableOpacity style={{ width : '20%' }}
      onPress={() => deleteMeal(mealDeleteName)}>
    </TouchableOpacity>
    <TextInput style={styles.addDeleteMealTextInput} placeholder={'delete a meal'}
      onChangeText={(text) =>
      {
        set_mealDeleteName(text);
        set_isMealListDirty(true);
      }}/>
    </View>

  </View>

  </View>

  );
}


