import React, {useState, useContext, useEffect} from 'react';
import Card from './Card'
import { AppContext } from '../context';




const CardGrid = (props) => {
    // const [restaurantsData] = useState(aboutUsData)
    const value = useContext(AppContext);
    // const [cards, setCards] = useState(null);
    // const [membersArray, setMembersArray] = useState([]);
    const membersArray = [];
    for(let i = 0; i < value.closestPlaces.length; i++){
        membersArray.push(<Card name={value.closestPlaces[i].name} address={value.closestPlaces[i].address} key={i}/>)
    }

    
    
    // useEffect(()=> {
    //     const newArray = [];
    //     async function updateCards(){
    //         let updatedCards = await value.data.closestPlaces;
    //         console.log(updatedCards);
    //         for (let i = 0; i < updatedCards.length; i++) {
    //             // console.log(updatedCards[i].name)
    //            newArray.push( 
                
    //             <Card key={i}
    //                 name={updatedCards[i].name}
    //                 address={updatedCards[i].address}
    //             />)
    //            }
    //     }
      
    //     // updateCards();
    //     // setMembersArray(newArray);
    // }, [membersArray]);
   
 

    return (
        <div className="cards-grid">
       {membersArray}
        </div>
    )
}

export default CardGrid;