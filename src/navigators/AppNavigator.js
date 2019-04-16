import { createAppContainer, createSwitchNavigator } from "react-navigation";
import MainTabNavigator from "./MainTabNavigator";
import AuthStack from "./AuthNavigator";

const AppNavigator = createSwitchNavigator({
  // Auth: AuthStack,
  Main: MainTabNavigator // "This screen renders a navigator!"
});

export default createAppContainer(AppNavigator);
