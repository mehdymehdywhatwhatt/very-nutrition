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
import FoodProductBlurb from '../components/FoodProductBlurb';

import { getFoodProductDetails, FoodNutrientsArrayIndex } from '../api/Spoonacular';

export default function FoodProductDetailsScreen() {

  const { params : id } = useRoute();
  [foundNutrients, set_foundNutrients] = useState([]);
  [isLoadingNutrients, set_isLoadingNutrients] = useState(false);

  useEffect( () => {
    set_isLoadingNutrients(true);
    fetchNutrients(id);
  }, [id]);

  const fetchNutrients = async (id) => {
    const data = await getFoodProductDetails(id);
    if (data && data.nutrition && data.nutrition.nutrients) {
      set_foundNutrients(data.nutrition.nutrients);
      set_isLoadingNutrients(false);
      console.log(data.nutrition.nutrients);
    }
  }

  return (
    <View style={{ flex : 1, backgroundColor : 'white' }}>
    <BackRibbon/>
    {
      isLoadingNutrients ? (
        <ActivityIndicator style={{ flex : 1, alignSelf : 'center' }}/>
      ) : (
      <FlatList
      style={styles.nutritionLabelContainer}
      data={foundNutrients}
      renderItem={ ({item, index}) => { return (
        <View style={index !== foundNutrients.length - 1 ? styles.nutritionLabelRecord : styles.nutritionLabelRecordBottom }>
          <Text style={styles.nutritionLabelText}>{foundNutrients[index].name}</Text>
          <Text style={styles.nutritionLabelText}>
            {`${foundNutrients[index].amount} [${foundNutrients[index].unit}]`}</Text>
          <Text style={styles.nutritionLabelText}>{`${foundNutrients[index].percentOfDailyNeeds} %`}</Text>
        </View>
      )}}/>
      )
    }
    </View>
  )
}

const styles = StyleSheet.create({
  nutritionLabelContainer : {
    borderColor : 'black',
  },
  nutritionLabelRecord : {
    borderColor : 'black',
    borderTopWidth : 2,
    borderLeftWidth : 2,
    borderRightWidth : 2,
  },
  nutritionLabelRecordBottom : {
    borderTopWidth : 2,
    borderLeftWidth : 2,
    borderRightWidth : 2,
    borderBottomWidth : 2
  },
  nutritionLabelText : {
    color : 'black',
    fontSize : 12,
  }
});

