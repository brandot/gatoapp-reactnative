import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Strings from '../constants/Strings';
import Colors from '../constants/Colors';
import HomeScreen from '../screens/HomeScreen';
import GameScreen from '../screens/GameScreen';

const Stack = createNativeStackNavigator();

const StackNavigators = () => {
  return (
    <Stack.Navigator
        screenOptions={{
            headerTitle: Strings.title,
            headerTitleStyle: { color: Colors.textColor },
            headerStyle: { backgroundColor: Colors.primaryColor },
        }}
    >
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="GameScreen" component={GameScreen} />
    </Stack.Navigator>
  );
};

export default StackNavigators;
