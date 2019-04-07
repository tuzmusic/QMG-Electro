import React from "react";
import { shallow, mount } from "enzyme";
import "./setup-tests";
import TabNavigator from "../navigation/MainTabNavigator";
import TabBarIcon from "../components/TabBarIcon";

import { combineReducers, createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import mainReducer from "../reducers/mainReducer";
import ReduxThunk from "redux-thunk";
import AppNavigator from "../navigation/AppNavigator";

const combinedReducer = combineReducers({ main: mainReducer });
const store = createStore(combinedReducer, {}, applyMiddleware(ReduxThunk));

/* describe("AppNavigator", () => {
  it("should render tab bar icons", () => {
    const component = (
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    );
    const wrapper = mount(component);
    expect(wrapper.find(<TabBarIcon />).length).toEqual(2);
  });
});
 */