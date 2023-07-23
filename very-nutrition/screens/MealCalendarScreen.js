import { FlatList,
View,
Text,
TouchableOpacity,
ScrollView,
Platform } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { Calendar, LocaleConfig } from 'react-native-calendars';

import BackRibbon from '../components/BackRibbon';
import { findAllMeals, findMealByName } from '../api/MongoDB';
import { commonStyles } from '../constants';

export default function MealCalendarScreen() {

  const [selectedDay, set_selectedDay] = useState({});

  return (
  <View style={{ flex : 1, backgroundColor : 'white' }}>
  <BackRibbon/>

  <View style={{ flex : 1 }}>
  <Text style={ commonStyles.ribbon }>meal calendar</Text>
  <ScrollView style={{ flex : 1 }}>
  <Calendar style={{ color : 'black', }}
    onDayPress={day => {
      set_selectedDay(day);
      console.log(day);
    }}
    markedDates={{
      [selectedDay.dateString]: {
        selected: true, disableTouchEvent: true, selectedDotColor: 'black'
      },
    }}/>
  </ScrollView>
  </View>

  <View style={{ flex : 1 }}>
    <Text style={ commonStyles.ribbon }>meals</Text>
    <Text>{'yet uncompleted-- load meals; create a meal-day entity; allow assocation of a day with a group of meals'}</Text>
  </View>

  </View>
  );
}

// schema of Calendar day object
//   {"dateString": "2023-07-17", "day": 17, "month": 7, "timestamp": 1689552000000, "year": 2023}
//
// define entity 'dayfood'
//   dayfood has a date
//   dayfood has an array of meal_name's
//

// bottom pane has a selectable group of MealBlurb's,
//   but delete is invisible,
//   and on select, adds to selected array
// 
