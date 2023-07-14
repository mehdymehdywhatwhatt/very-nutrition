import { View, Text, TouchableOpacity, ScrollView, Platform } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';

import WorkScreenRibbon from '../components/WorkScreenRibbon';

export default function MealCalendarScreen() {
  return (
  <View style={{ flex : 1, backgroundColor : 'white' }}>
  <WorkScreenRibbon/>
  <Text>
    MealCalendarScreen. Use this screen to log meals that you ate, and when you ate them.
  </Text>
  </View>
  );
}

