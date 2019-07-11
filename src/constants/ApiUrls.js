import { GoogleMapsApiKey } from "../../secrets";

export default {
  mapsSearch: address =>
    `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${GoogleMapsApiKey}&input=${address}`,
  mapsDetails: placeId =>
    `https://maps.googleapis.com/maps/api/place/details/json?key=${GoogleMapsApiKey}&placeid=${placeId}&fields=geometry`
};
