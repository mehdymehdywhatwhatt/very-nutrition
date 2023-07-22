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

export default function MealDetailsScreen() {

  const { params : meal_name } = useRoute();
  const [mealEntity, set_mealEntity] = useState({});
  const [spoonacularEntitys, set_spoonacularEntitys] = useState([]);

  const fetchMeal = async () => {
    const data = await findMealByName(meal_name);
    if (data) {
      set_mealEntity(data);
    }
    return data;
  }

  const fetch = async () => {
    const await_mealEntity = await fetchMeal();

    const loading_spoonacularEntitys = [];

    for (each_spoonacular_id of await_mealEntity.spoonacular_ids) {
      const await_foodProductDetails = await getFoodProductDetails(each_spoonacular_id);
      loading_spoonacularEntitys.push(await_foodProductDetails);
    }

    set_spoonacularEntitys(loading_spoonacularEntitys);
  }

  useEffect(() => {
    fetch();
  }, []);

  return (
  <View style={{ flex : 1, backgroundColor : 'white' }}>
  <BackRibbon/>
  <Text style={ commonStyles.ribbon }>{`meal '${mealEntity.meal_name}'`}</Text>

  <FlatList
  data={spoonacularEntitys}
  renderItem={ ({item}) => {
    return <Text style={{backgroundColor : 'red', fontSize : 16}}>{item.title}</Text>
  }}/>

  </View>
  );
}


