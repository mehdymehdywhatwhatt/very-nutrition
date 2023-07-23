import {
  FlatList,
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  Platform,
  Text,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";

import HomeScreenRibbon from "../components/HomeScreenRibbon";
import BackRibbon from "../components/BackRibbon";
import ToWorkScreen from "../components/ToWorkScreen";
import NewsScreen from "./NewsScreen";
import { commonStyles } from '../constants';

export default function HomeScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <HomeScreenRibbon />

      <View style={{ flex : 1, backgroundColor: "lightgray" }}>
      <Text style={commonStyles.ribbon}>plan your meals</Text>
      <ScrollView style={{ flex: 1 }}>
        <ToWorkScreen
          destinationScreen={"DefineMeal"}
          userHint={"define meals"}
        />
        <ToWorkScreen
          destinationScreen={"MealCalendar"}
          userHint={"meal calendar"}
        />
      </ScrollView>
      </View>

      <NewsScreen />
    </View>
  );
}
