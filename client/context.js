import React from 'react';


export const AppContext = React.createContext({
    name: null,
    address: null, 
    coordinates: [null],
    reviews: [null]
})