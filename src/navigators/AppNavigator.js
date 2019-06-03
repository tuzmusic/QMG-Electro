import { createAppContainer, createSwitchNavigator } from "react-navigation";
import MainTabNavigator from "./MainTabNavigator";
import AuthStack from "./AuthNavigator";
import WelcomeScreen from "../screens/DevelopmentWelcomeView";
const AppNavigator = createSwitchNavigator({
  // Welcome: WelcomeScreen,
  Main: MainTabNavigator,
  Auth: AuthStack
});

export default createAppContainer(AppNavigator);
