import "react-native";
import MockAsyncStorage from "mock-async-storage";
import React from "react";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import renderer from "react-test-renderer";

import * as actions from "../src/redux/actions/stationActions";

const mockStore = configureMockStore([thunk]);
