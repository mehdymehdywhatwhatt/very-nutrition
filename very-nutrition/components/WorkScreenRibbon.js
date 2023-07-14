import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Platform } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';

import { AppColors, AppFonts, AppSizes, SafePadding } from '../constants';

export default function WorkScreenRibbon() {
  const navigation = useNavigation();

  return (
  <View style={{ backgroundColor : 'white', paddingTop : SafePadding }}>
    <TouchableOpacity onPress={() => navigation.goBack()}>
    <Text style={{ fontSize : AppSizes.RibbonTextSize, color : 'black', fontWeight : 'bold', textAlign : 'left', textAlignVertical : 'center' }}>back</Text>
    </TouchableOpacity>
  </View>
  );
}

//    <TouchableOpacity style={{ flex : 1 }} >
//    </TouchableOpacity>
