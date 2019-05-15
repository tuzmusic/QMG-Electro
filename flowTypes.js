// @flow

export type ElectroLocation = {
  latitude: number | string,
  longitude: number | string,
  latitudeDelta?: number | string,
  longitudeDelta?: number | string,
  showMarker?: boolean
};

export type OpenObject = { [key: string]: any };
