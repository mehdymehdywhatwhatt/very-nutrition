import { View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Platform,
  FlatList,
  ActivityIndicator,
  StyleSheet } from 'react-native';

import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';

import BackRibbon from '../components/BackRibbon';
import MealBlurb from '../components/MealBlurb';
import FoodProductBlurb from '../components/FoodProductBlurb';
import { getFoodProducts, getFoodProductDetails } from '../api/Spoonacular';
import { createMeal, deleteMeal, findAllMeals, findMealByName } from '../api/MongoDB';
import { commonStyles } from '../constants';

const styles = StyleSheet.create({
  foodProduct : {
    backgroundColor : 'white',
    fontSize : 16,
    borderColor : 'black',
    borderWidth : 1,
    borderRadius : 5,
    margin : 2,
    padding : 2,
    width : '80%',
  },
  touchableDelete : {
    backgroundColor : 'white',
    borderColor : 'black',
    borderWidth : 1,
    borderRadius : 5,
    margin : 2,
    padding : 2,
    flex : 1,
  },
  iconDelete : {
    flex : 1,
    fontSize : 16,
    fontWeight : '400',
    alignSelf : 'center',
    textAlign : 'center',
    textAlignVertical : 'center',
  },
});

export default function MealDetailsScreen() {

  const { params : meal_name } = useRoute();

  const [isLoadingMealEntity, set_isLoadingMealEntity] = useState(false);
  const [mealEntity, set_mealEntity] = useState({});

  const [isLoadingSpoonacularEntitys, set_isLoadingSpoonacularEntitys] = useState(false);
  const [spoonacularEntitys, set_spoonacularEntitys] = useState([]);

  const fetchMeal = async () => {
    set_isLoadingMealEntity(true);
    const data = await findMealByName(meal_name);
    if (data) {
      set_mealEntity(data);
    }
    set_isLoadingMealEntity(false);
    return data;
  }

  const fetch = async () => {
    set_isLoadingSpoonacularEntitys(true);
    const await_mealEntity = await fetchMeal();
    const loading_spoonacularEntitys = [];

    for (each_spoonacular_id of await_mealEntity.spoonacular_ids) {
      const await_foodProductDetails = await getFoodProductDetails(each_spoonacular_id);
      loading_spoonacularEntitys.push(await_foodProductDetails);
    }

    set_spoonacularEntitys(loading_spoonacularEntitys);
    set_isLoadingSpoonacularEntitys(false);
  }

  useEffect(() => {
    fetch();
  }, []);

  return (
  <View style={{ flex : 1, backgroundColor : 'white' }}>
  <BackRibbon/>
  <Text style={ commonStyles.ribbon }>{`meal "${meal_name}"`}</Text>

  <View style={{ flex : 1, backgroundColor : 'lightgray' }}>
  <Text style={ commonStyles.ribbon }>contents</Text>
  {
  isLoadingSpoonacularEntitys ? (
    <ActivityIndicator style={commonStyles.activityIndicator}/>
  ) : (
    <FlatList
    data={spoonacularEntitys}
    renderItem={ ({item}) => {
      return (
      <View style={{ flexDirection : 'row' }}>
      <Text style={styles.foodProduct}>{item.title}</Text>
      <TouchableOpacity style={styles.touchableDelete}>
        <Text style={styles.iconDelete}>-</Text>
      </TouchableOpacity>
      </View>
      )
    }}
    keyExtractor={ (item, index) => { return item.id + "-" + index.toString() } }/>
  )
  }
  </View>

  <View style={{ flex : 1, backgroundColor : 'white' }}>
  <Text style={ commonStyles.ribbon }>aggregate nutrition</Text>
  </View>

  </View>
  );
}

// basic reqs:
//   be able to delete foods from the meal, from the MealDetailsScreen
//   provide aggregate meal nutrition data.
//   repair the FlatList issue for duplicates-- provide a uniquefying key extractor-done
//
