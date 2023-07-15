import { View, Text, TouchableOpacity, ScrollView, Platform } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';

import WorkScreenRibbon from '../components/WorkScreenRibbon';

export default function DefineMealScreen() {
  return (
  <View style={{ flex : 1, backgroundColor : 'white' }}>
  <WorkScreenRibbon/>
  <Text>
    DefineMealScreen. Use this screen to define a meal by searching the nutrition API.
  </Text>
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
