import React, {createContext } from 'react';

interface cards {
  name: string;
  address: string;
  coordinates: Array<number>
  reviews: Array<string>
}

interface ITheme {
  closestPlaces: Array<cards>;
    geoLocatedCoordinates: Array<number>;
  }

export const AppContext = createContext<ITheme>({
  closestPlaces: null,
  geoLocatedCoordinates: null
})