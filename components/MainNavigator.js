import React from 'react';
import LoginScreen from '../screens/LoginScreen';
import App_navigator from './App_navigator';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { connect } from 'react-redux';

const mapStateToProps = state => {
    return {
        token: state.token
    }
}

const ScreenStack = createNativeStackNavigator();

const MainNavigator = (props) => {
    return (

        <ScreenStack.Navigator screenOptions={{
            headerShown: false
        }}>
            {props.token === null && <ScreenStack.Screen name="Login" component={LoginScreen}
                options={{ headerShown: true, headerStyle: { backgroundColor: '#FC4F00' }, headerTintColor: '#fff' }} />}


            {props.token && <ScreenStack.Screen name="Home" component={App_navigator} />}


        </ScreenStack.Navigator>


    )
}

export default connect(mapStateToProps)(MainNavigator);