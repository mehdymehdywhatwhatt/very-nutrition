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

export default function HomeScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <HomeScreenRibbon />

      <ScrollView style={{ flex: 1, backgroundColor: "lightgray" }}>
        <ToWorkScreen
          destinationScreen={"DefineMeal"}
          userHint={"define meals"}
        />
        <ToWorkScreen
          destinationScreen={"MealCalendar"}
          userHint={"meal calendar"}
        />
      </ScrollView>

      <ScrollView style={{ flex: 1, backgroundColor: "lightgray" }}>
        <NewsScreen />
      </ScrollView>
    </View>
  );
}
