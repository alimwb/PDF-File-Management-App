import React from "react";
import LoginScreen from "./LoginScreen";
import MainScreen from "./MainScreen";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

const App: React.FC = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={LoginScreen}  />
      <Stack.Screen options={{
        headerShown: false,
    }} name="Main" component={MainScreen} />
    </Stack.Navigator>
  );
};

export default App;
