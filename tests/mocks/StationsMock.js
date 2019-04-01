export default (StationMocks = {stations:[
  {
    address: "1600 Pennsylvania Ave NW, Washington, DC 20500, USA",
    location: {
      lat: 38.8976763,
      lng: -77.0365298
    },
    name: "Tesla Pad",
    owner: {
      username: "tesladude",
      firstName: "Elon",
      lastName: "Musk",
    },
    price: 0,
    availableNow: false
  },
  {
    address: "4550 Connecticut Ave NW, Washington, DC 20008, USA",
    location: {
      lat: 38.8976763,
      lng: -77.0365298
    },
    name: "Charging Station",
    owner: {
      username: "punnyname",
      firstName: "Phil",
      lastName: "McKarr"
    },
    price: 100,
    availableNow: true
  }
]});
