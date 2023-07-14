import { View, Text, TouchableOpacity, ScrollView, Platform } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';

import { AppColors, AppFonts, AppSizes } from '../constants';

export default function ToDefineMeal() {
  const navigation = useNavigation();

  return (
  <View style={{ flex : 1, backgroundColor : 'white', borderColor : 'black', borderRadius : AppSizes.HomeScreenElementBorderRadius, borderWidth : AppSizes.HomeScreenElementBorderWidth, height : AppSizes.HomeScreenElementHeight, padding : AppSizes.HomeScreenElementPadding }}>
    <TouchableOpacity style={{ flex : 1 }} onPress={() => navigation.push('DefineMeal')}>
      <Text style={{ flex : 1, fontSize : AppSizes.HomeScreenElementTextSize, textAlign : 'center', textAlignVertical : 'center' }}>ToDefineMeal</Text>
    </TouchableOpacity>
  </View>
  );
}
