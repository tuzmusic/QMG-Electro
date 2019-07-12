import { createAppContainer, createSwitchNavigator } from "react-navigation";
import MainTabNavigator from "./MainTabNavigator";
import AuthStack from "./AuthNavigator";

const AppNavigator = createSwitchNavigator({
  Auth: AuthStack,
  Main: MainTabNavigator
});

export default createAppContainer(AppNavigator);
