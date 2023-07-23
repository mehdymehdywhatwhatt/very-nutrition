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
import { createMeal, deleteMeal, updateMeal, findAllMeals, findMealByName } from '../api/MongoDB';
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
  caloriesHeader : {
    textAlign : 'center',
    textAlignVertical : 'center',
    fontSize : 26,
    fontWeight : '400',
  },
  caloriesNumber : {
    textAlign : 'center',
    textAlignVertical : 'center',
    fontSize : 26,
    fontWeight : '400',
  },
  macronutrientHeader : {
    textAlign : 'center',
    textAlignVertical : 'center',
    fontSize : 18,
    fontWeight : '400',
  },
  macronutrientNumber : {
    textAlign : 'center',
    textAlignVertical : 'center',
    fontSize : 18,
    fontWeight : '400',
  },
  calculatingWait : {
    textAlign : 'center',
    textAlignVertical : 'center',
    fontSize : 12,
    fontWeight : '300',
  },
});

/*
 * Helper to perform an "add" on string, suffixed numerics.
 *
 * Arguments arg_1 and arg_2 are strings in the form '[number][suffix]',
 *   for example 4g or 1234g or 314mg.
 *
 * Returned value is the arithmetic sum, as a string.
 *   for example, 4g + 8g (with suffix argument 'g') will return 12g.
 *
 * */
function addSuffixed(arg_1, arg_2, arg_suffix) {
  const n_1 = Number(arg_1.replace(arg_suffix, ''));
  const n_2 = Number(arg_2.replace(arg_suffix, ''));
  const sum = n_1 + n_2;
  return sum.toString() + arg_suffix;
}

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

  const fetchSpoonacularEntitys = async () => {
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

  const getAggregateMacros = () => {

    const rtn_aggregateMacros = { calories : 0, fat : '0g', protein : '0g', carbs : '0g' };

    for (eachEntity of spoonacularEntitys) {
      rtn_aggregateMacros.calories += eachEntity.nutrition.calories;
      rtn_aggregateMacros.fat      = addSuffixed(rtn_aggregateMacros.fat, eachEntity.nutrition.fat, 'g');
      rtn_aggregateMacros.protein  = addSuffixed(rtn_aggregateMacros.protein, eachEntity.nutrition.protein, 'g');
      rtn_aggregateMacros.carbs    = addSuffixed(rtn_aggregateMacros.carbs, eachEntity.nutrition.carbs, 'g');
    }

    return rtn_aggregateMacros;
  }

  const aggregateMacros = getAggregateMacros();

  useEffect(() => {
    const fetch = async () => {
      fetchSpoonacularEntitys();
    }
    fetch();
  }, []);

  const deleteSpoonacularEntityAndRefresh = async (arg_remove_spoonacular_id) => {
    const l = mealEntity.spoonacular_ids;
    l.splice(l.indexOf(arg_remove_spoonacular_id), 1);
    await updateMeal(mealEntity.meal_name, l);
    await fetchSpoonacularEntitys();
  }

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
      <TouchableOpacity style={styles.touchableDelete}
        onPress={() => { deleteSpoonacularEntityAndRefresh(item.id) }}>
        <Text style={styles.iconDelete}>-</Text>
      </TouchableOpacity>
      </View>
    )}}
    keyExtractor={ (item, index) => { return item.id + "-" + index.toString() } }/>
  )
  }
  </View>

  <View style={{ flex : 1, backgroundColor : 'white' }}>
  <Text style={ commonStyles.ribbon }>macronutrients</Text>
  <View>
    <View>
    <Text style={styles.caloriesHeader}>calories</Text>
    {
    isLoadingSpoonacularEntitys ? ( <Text style={styles.calculatingWait}>{'(calculating...)'}</Text>
      ) : ( <Text style={styles.caloriesNumber}>{aggregateMacros.calories}</Text> )
    }
    </View>
    <View style={{ flexDirection : 'row' }}>
      <View style={{ flex : 1 }}>
        <Text style={styles.macronutrientHeader}>carbohydrates</Text>
        {
        isLoadingSpoonacularEntitys ? ( <Text style={styles.calculatingWait}>{'(calculating...)'}</Text>
          ) : ( <Text style={styles.macronutrientNumber}>{aggregateMacros.carbs}</Text> )
        }
      </View>
      <View style={{ flex : 1 }}>
        <Text style={styles.macronutrientHeader}>protein</Text>
        {
        isLoadingSpoonacularEntitys ? ( <Text style={styles.calculatingWait}>{'(calculating...)'}</Text>
          ) : ( <Text style={styles.macronutrientNumber}>{aggregateMacros.protein}</Text> )
        }
      </View>
      <View style={{ flex : 1 }}>
        <Text style={styles.macronutrientHeader}>fat</Text>
        {
        isLoadingSpoonacularEntitys ? ( <Text style={styles.calculatingWait}>{'(calculating...)'}</Text>
          ) : ( <Text style={styles.macronutrientNumber}>{aggregateMacros.fat}</Text> )
        }
      </View>
    </View>
  </View>
  </View>

  </View>
  );
}

