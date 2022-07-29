import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home } from '../screens/Home';
import { CarDetails } from '../screens/CarDetails';
import { Scheduling } from '../screens/Scheduling';
import { ShedulingDetails } from '../screens/ShedulingDetails';
import { ShedulingComplete } from '../screens/ShedulingComplete';
import { MyCars } from '../screens/MyCars';

const { Navigator, Screen} = createNativeStackNavigator();

export function StackRoutes(){
    return(
        <Navigator screenOptions={{headerShown: false}}>
            <Screen name="home" component={Home}  />
            <Screen name="carDetails" component={CarDetails}  />
            <Screen name="myCars" component={MyCars}  />
            <Screen name="scheduling" component={Scheduling}  />
            <Screen name="schedulingDetails" component={ShedulingDetails}  />
            <Screen name="schedulingComplete" component={ShedulingComplete}  />
        </Navigator>
    )
}