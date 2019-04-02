const theWorks = {
  address: "42 N Main St, Concord, NH 03301",
  location: {
    lat: 43.20527,
    lng: -71.53581
  },
  name: "The Works",
  owner: {
    username: "tesladude",
    firstName: "Elon",
    lastName: "Musk"
  },
  price: 0,
  availableNow: false
};

const gibsons = {
  address: "45 S Main St, Concord, NH 03301",
  location: {
    lat: 43.202195,
    lng: -71.534382
  },
  name: "Gibson's",
  owner: {
    username: "holly",
    firstName: "Holly",
    lastName: "Shulman"
  },
  price: 0,
  availableNow: true
};

const trueBrew = {
  address: "Odd Fellows Ave, Concord, NH 03301",
  location: {
    lat: 43.2045125,
    lng: -71.5368442
  },
  name: "True Brew Barista",
  owner: {
    username: "tuz",
    firstName: "Jonathan",
    lastName: "Tuzman"
  },
  price: 0,
  availableNow: false
};

const ourHouse = {
  address: "88 North Spring Street, 03301",
  location: {
    lat: 43.208552,
    lng: -71.542526
  },
  name: "Our House",
  owner: {
    username: "tesladude",
    firstName: "Elon",
    lastName: "Musk"
  },
  price: 0,
  availableNow: false
};

export default (StationsMock = {stations: [ourHouse, theWorks, gibsons, trueBrew]});
