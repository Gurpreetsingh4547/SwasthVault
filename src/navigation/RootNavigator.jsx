import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/Home';
import Splash from '../screens/Splash';

const Stack = createNativeStackNavigator();

/**
 * Root Navigator component
 * @returns Root navigator for the app
 */
const RootNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Splash" screenOptions={{
      headerShown: false
    }}>
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
};

export default RootNavigator;
