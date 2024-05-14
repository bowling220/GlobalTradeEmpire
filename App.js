import React from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ProfileProvider } from './ProfileContext';
import HomeScreen from './HomeScreen';
import Gamepass from './Gamepass';
import LoginScreen from './LoginScreen'; // Create your LoginScreen component

const Stack = createStackNavigator();
const EmptyHeader = () => {
  return <View style={{ height: 50 }} />; // Adjust height as needed
};

const App = () => {
  return (
    <ProfileProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{
              header: () => <EmptyHeader />,
            }}
          />
          <Stack.Screen name="Gamepass" component={Gamepass} />
          <Stack.Screen name="Login" component={LoginScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </ProfileProvider>
  );
};

export default App;
