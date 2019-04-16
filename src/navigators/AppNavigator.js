import { createAppContainer, createSwitchNavigator } from "react-navigation";
import MainTabNavigator from "./MainTabNavigator";

const AppNavigator = createSwitchNavigator({
  // Auth: AuthStack,
  Main: MainTabNavigator // "This screen renders a navigator!"
});

export default createAppContainer(AppNavigator);
// export default AppNavigator;
