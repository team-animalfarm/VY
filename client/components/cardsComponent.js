import React, {useState, useContext, useEffect} from 'react';
import Card from './Card'
import { AppContext } from '../context';


const CardGrid = (props) => {
   
    const value = useContext(AppContext);

    if (!value.closestPlaces) {
        return (
            <div className="cards-grid">
            </div>
        )
    }

    const membersArray = [];
    for(let i = 0; i < value.closestPlaces.length; i++){
        membersArray.push(<Card name={value.closestPlaces[i].name} address={value.closestPlaces[i].address} 
            reviews={value.closestPlaces[i].reviews} key={i}/>)
    }

    return (
        <div className="cards-grid">
          {membersArray}
        </div>
    )
}

export default CardGrid;