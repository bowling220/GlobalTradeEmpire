import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './HomeScreen';
import { View } from 'react-native';



const Stack = createStackNavigator();
const EmptyHeader = () => {
  return <View style={{ height: 50 }} />; // Adjust height as needed
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            header: () => <EmptyHeader />,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};



export default App;
