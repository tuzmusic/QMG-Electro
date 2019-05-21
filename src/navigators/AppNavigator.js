import { createAppContainer, createSwitchNavigator } from "react-navigation";
import MainTabNavigator from "./MainTabNavigator";
import AuthStack from "./AuthNavigator";
import WelcomeScreen from "../screens/DevelopmentWelcomeView";
const AppNavigator = createSwitchNavigator({
  Welcome: WelcomeScreen,
  Auth: AuthStack,
  Main: MainTabNavigator
});

export default createAppContainer(AppNavigator);
