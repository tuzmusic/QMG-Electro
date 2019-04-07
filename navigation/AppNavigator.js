import { createAppContainer, createSwitchNavigator } from "react-navigation";
import MainTabNavigator from "./MainTabNavigator";

const switchNavigator = createSwitchNavigator({
  Main: MainTabNavigator // Auth: AuthStack,
});

export default createAppContainer(switchNavigator);
