import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from './app/screens/welcomeScreen';
import LoginScreen from './app/screens/Login';
import Registration from './app/screens/Registration';
import Dashboard from './app/screens/dashboard';
const Stack = createNativeStackNavigator();

export default function App () {
  return(
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Welcome'>
        <Stack.Screen name="Welcome" component ={WelcomeScreen} options={{title: 'Welcome'}}/>
        <Stack.Screen name="Login" component ={LoginScreen} options={{title: 'Login'}}/>
        <Stack.Screen name="Registration" component={Registration} options={{title: 'Sign Up'}} /> 
        <Stack.Screen name="Dashboard" component={Dashboard} options={{title: 'Dashboard'}} /> 
      </Stack.Navigator>
    </NavigationContainer>
  )
}
