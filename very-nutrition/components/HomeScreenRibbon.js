import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Platform } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';

import { SafePadding, commonStyles } from '../constants';

export default function HomeScreenRibbon() {
  return (
  <View style={{ backgroundColor : 'white', paddingTop : SafePadding }}>
    <Text style={ commonStyles.ribbon }>very nutrition</Text>
  </View>
  );
}

