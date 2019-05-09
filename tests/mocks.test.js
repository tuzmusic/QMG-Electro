import * as actions from "./__mocks__/someMocks";

describe("actions", () => {
  it("calls_f1 should call f1", () => {
    actions.f1 = jest.fn();
    actions.calls_f1();
    expect(actions.f1).toBeCalled(); // Success!
  });
});
