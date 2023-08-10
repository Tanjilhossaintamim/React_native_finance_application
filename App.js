import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import Store from "./redux/Store";
import React from "react";
import MainNavigator from "./components/MainNavigator";



const navigationRef = React.createRef();

export const navigate = (name) => {
  navigationRef.current && navigationRef.current.navigate(name)
}




export default function App() {
  return (
    <Provider store={Store}>
      <NavigationContainer ref={navigationRef}>
        <MainNavigator />
      </NavigationContainer>

    </Provider>
  );
}
