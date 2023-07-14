import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Platform } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';

import { AppColors, AppFonts, AppSizes, SafePadding } from '../constants';

export default function HomeScreenRibbon() {
  return (
  <View style={{ backgroundColor : 'white', paddingTop : SafePadding }}>
    <Text style={{ fontSize : AppSizes.RibbonTextSize, color : 'black', fontWeight : 'bold', textAlign : 'center', textAlignVertical : 'center' }}>very nutrition</Text>
  </View>
  );
}

