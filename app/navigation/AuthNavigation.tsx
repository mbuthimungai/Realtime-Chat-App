import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/Login";
import RegisterScreen from "../screens/Register";
const stack = createNativeStackNavigator();
const AuthNavigation = () => {
  return (
    <stack.Navigator initialRouteName="Register">
      <stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{ headerShown: false }}
      />
      <stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
    </stack.Navigator>
  );
};
export type AuthStackParamList = {
  Register: undefined;
  Login: undefined;
};
export default AuthNavigation;
