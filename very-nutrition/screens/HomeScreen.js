import { FlatList, StyleSheet, View, Text, TouchableOpacity, ScrollView, Platform } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';

import HomeScreenRibbon from '../components/HomeScreenRibbon';
import BackRibbon from '../components/BackRibbon';
import ToWorkScreen from '../components/ToWorkScreen';
import SafePadding from '../constants';

export default function HomeScreen() {
  return (
  <View style={{ flex : 1, backgroundColor : 'white' }}>
  <HomeScreenRibbon/>

  <ScrollView style={{ flex : 1, backgroundColor : 'lightgray' }}>
    <ToWorkScreen destinationScreen={'DefineMeal'}/>
    <ToWorkScreen destinationScreen={'MealCalendar'}/>
  </ScrollView>

  <ScrollView>
    <Text>maybe some generic news feed content here, loaded from a separate API.</Text>
  </ScrollView>

  </View>
  );
}

