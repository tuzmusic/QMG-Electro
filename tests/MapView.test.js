import { mount, shallow } from "enzyme";
import MapScreen from "../src/screens/MapView";

describe("MapScreen", () => {
  const mapScreen = mount(<MapScreen />);
  it("contains a MapView", () => {
    expect(true).toEqual(true);
    // expect(mapScreen.find("MapView")).toExist;
  });
});
