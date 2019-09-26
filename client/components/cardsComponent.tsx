import React, {useState, useContext, useEffect} from 'react';
import Card from './Card'
import { AppContext } from '../context';

interface cards {
    name: string;
    address: string;
    coordinates: Array<number>
    reviews: Array<string>
  }

interface value {
    closestPlaces: Array<cards>;
    geoLocatedCoordinates: Array<number>;
}


const CardGrid = (props) => {
   
    const value : value = useContext(AppContext);

    if (!value.closestPlaces) {
        return (
            <div className="cards-grid">
            </div>
        )
    }

    const membersArray = [];
    for(let i = 0; i < value.closestPlaces.length; i++){
        membersArray.push(<Card name={value.closestPlaces[i].name} address={value.closestPlaces[i].location} 
            reviews={value.closestPlaces[i].reviews} rating={value.closestPlaces[i].rating} key={i} img={value.closestPlaces[i].img_src} phone={value.closestPlaces[i].phone}/>)
    }

    return (
        <div className="cards-grid">
          {membersArray}
        </div>
    )
}

export default CardGrid;