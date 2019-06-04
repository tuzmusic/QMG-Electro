import React from "react";
import { Platform, StatusBar, StyleSheet, View } from "react-native";
import { AppLoading, Asset, Font, Icon } from "expo";
import AppContainer from "./src/navigators/AppNavigator";
import { combineReducers, createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import mainReducer from "./src/redux/reducers/mainReducer";
import authReducer from "./src/redux/reducers/authReducer";
import thunk from "redux-thunk";
import createSagaMiddleware from "redux-saga";
import authSaga from "./src/redux/actions/authActions";
import GlobalFont from "react-native-global-font";
import AppStyles from "./src/constants/Styles";
import { setupAuthMockAdapter } from "./tests/__mocks__/axiosMocks";

const combinedReducer = combineReducers({
  main: mainReducer,
  auth: authReducer
});
const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  combinedReducer,
  {},
  applyMiddleware(thunk, sagaMiddleware)
);
sagaMiddleware.run(authSaga);
export default class App extends React.Component {
  state = {
    isLoadingComplete: false
  };

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._handleLoading}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <Provider store={store}>
          <View style={styles.container}>
            {Platform.OS === "ios" && <StatusBar barStyle="default" />}
            <AppContainer />
          </View>
        </Provider>
      );
    }
  }

  _handleLoading = async () => {
    await this._loadResourcesAsync();
    setupAuthMockAdapter();
  };

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        // require("./assets/images/robot-dev.png"),
        // require("./assets/images/robot-prod.png")
      ]),
      Font.loadAsync({
        din1451alt: require("./assets/fonts/din1451alt.ttf"),
        ...Icon.Ionicons.font
      }).then(() => GlobalFont.applyGlobal(AppStyles.font))
    ]);
  };

  _handleLoadingError = error => {
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});
