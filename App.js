import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainScreen from './client/screens/MainScreen';
import MarketScreen from './client/screens/MarketScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Main" component={MainScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Market" component={MarketScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
