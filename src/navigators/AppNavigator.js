import { createAppContainer, createSwitchNavigator } from "react-navigation";
import MainTabNavigator from "./MainTabNavigator";
import AuthStack from "./AuthNavigator";

const AppNavigator = createSwitchNavigator({
  Main: MainTabNavigator,
  Auth: AuthStack,
});

export default createAppContainer(AppNavigator);
