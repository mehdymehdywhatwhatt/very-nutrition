import { View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Platform } from 'react-native';

import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';

import WorkScreenRibbon from '../components/WorkScreenRibbon';

const textInputHeight = 30;

export default function DefineMealScreen() {

  [foods, set_foods] = useState([]);

  return (
  <View style={{ flex : 1, backgroundColor : 'white' }}>
  <WorkScreenRibbon/>

  // this textinput says, search for this food.
  <TextInput style={{ height : textInputHeight, backgroundColor : 'lightgray' }}/>

  // this scrollview says, here's all the foods that your search brought up
  // each element will have a touchableopacity to put that food, into this meal
  <ScrollView style={{ flex : 1 }}>
  </ScrollView>

  // this scrollview is the foods you have in this meal so far
  <ScrollView style={{ flex : 1 }}>
  </ScrollView>

  // this scrollview is the meals you have so far (its own component?)
  <ScrollView>
  </ScrollView>

  </View>
  );
}

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
