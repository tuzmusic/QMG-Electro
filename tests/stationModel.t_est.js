import Station from '../src/models/Station'

describe('Station', () => {
  it('can initialize with an id', () => {
    const newWithID = new Station({id: 1})
    expect(newWithID.id).toEqual(1)
  });

  it('creates a unique ID if none is provided', () => {
    const newWithoutID = new Station({name: "Cool station"})
    expect(newWithoutID.id).toBeTruthy
  });
})
