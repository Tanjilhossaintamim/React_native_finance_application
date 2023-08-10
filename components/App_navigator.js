import React from 'react';
import Add_AccountScreen from '../screens/Add_AccountScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icons from "react-native-vector-icons/Ionicons"
import ShowAccountScreen from '../screens/ShowAccountScreen';
import { connect } from 'react-redux';
import { logout } from '../redux/actionCreators';
import Icon from './Icon';

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(logout())
    }
}

const BottomTab = createBottomTabNavigator();


const App_navigator = (props) => {
    return (
        <BottomTab.Navigator screenOptions={{ headerStyle: { backgroundColor: '#FC4F00' }, headerTintColor: '#fff', tabBarStyle: { backgroundColor: '#FC4F00' }, tabBarActiveTintColor: '#1D5D9B', tabBarInactiveTintColor: '#fff', headerRight: () => (<Icon name='power' size={25} color={'#fff'} action={() => props.logout()} />) }}>



            <BottomTab.Screen name='Account' component={ShowAccountScreen} options={{
                tabBarIcon: ({ color, size }) => (<Icons name='podium' color={color} size={size} />)
            }} />
            <BottomTab.Screen name='Add Account' component={Add_AccountScreen} options={{
                tabBarIcon: ({ color, size }) => (<Icons name='add' color={color} size={size} />)
            }} />
        </BottomTab.Navigator>
    )
}

export default connect(null, mapDispatchToProps)(App_navigator);