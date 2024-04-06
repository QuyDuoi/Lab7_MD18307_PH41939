import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginB1 from './Screen/LoginB1';
import SignUpB1 from './Screen/SignUpB1';
import Home from './Screen/Home';
import HomeGoogle from './Screen/HomeGoogle';
import {PermissionsAndroid} from 'react-native';
import messaging from '@react-native-firebase/messaging';

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  useEffect(() => {
    PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    );
    const getToken = async () => {
      const token = await messaging().getToken();
      console.log('Token: ', token);
    };
    getToken();
  });
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="SignUp"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Login" component={LoginB1} />
        <Stack.Screen name="SignUp" component={SignUpB1} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Google" component={HomeGoogle} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
