import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './App/screens/home';
import FlightsList from './App/screens/flightsList';
import FlightDetails from './App/screens/flightDetails';

const Stack = createNativeStackNavigator();

function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="FlightsList" component={FlightsList} options={{ title: 'Flight List' }} />
        <Stack.Screen name="FlightDetails" component={FlightDetails} options={{ title: 'Flight Details' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
