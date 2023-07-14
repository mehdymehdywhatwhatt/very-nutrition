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
