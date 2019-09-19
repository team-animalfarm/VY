import React, {useState} from 'react';
import Card from './Card'
import { AppContext } from '../context';




const CardGrid = (props) => {
    // const [restaurantsData] = useState(aboutUsData)

    const membersArray = []
 
    for (let i = 0; i < 6; i++) {
      membersArray.push( <Card key={i}/>)
     }
   
  

    return (
        <div className="cards-grid">
       {membersArray}
        </div>
    )
}

export default CardGrid;