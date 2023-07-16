import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import DefineMealScreen from '../screens/DefineMealScreen';
import MealCalendarScreen from '../screens/MealCalendarScreen';
import FoodProductDetailsScreen from '../screens/FoodProductDetailsScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigation() {
  return (
    <NavigationContainer>
    <Stack.Navigator>
    <Stack.Screen name='Home' options={{ headerShown : false }} component={HomeScreen} />
    <Stack.Screen name='DefineMeal' options={{ headerShown : false }} component={DefineMealScreen} />
    <Stack.Screen name='MealCalendar' options={{ headerShown : false }} component={MealCalendarScreen} />
    <Stack.Screen name='FoodProductDetails' options={{ headerShown : false }} component={FoodProductDetailsScreen} />
    </Stack.Navigator>
    </NavigationContainer>
  )
}

