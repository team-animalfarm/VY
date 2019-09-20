import React, {useState, useContext, useEffect} from 'react';
import { DropDownInfo } from './dropDownInfo';
import MenuIcon from '@material-ui/icons/Menu';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import { AppContext } from '../context';


const Card = (props) => {
    console.log(props.reviews)
    const [isModalOpen, setModalOpen] = useState(false);
    const handleDropDownClick = () => {
        setModalOpen(isModalOpen ? false: true);
    }
    const starsArray = [];
    for(let i = 0; i < props.rating; i++){
        starsArray.push(<StarBorderIcon className="star-icon"></StarBorderIcon>)
    }

    return (
        <div className="cards">
    
    <div className="card-render">
    <MenuIcon onClick={handleDropDownClick} id="hamburger-menu" className="material-icons"></MenuIcon>
          {isModalOpen ? <DropDownInfo reviews={props.reviews} phone={props.phone} /> : 
    <div className="no-render">
        <div>
          <h3 className="card-heading">
        {props.name}
    </h3>
    {/* <h5>Rating: {props.rating}</h5> */}
        {starsArray}
    </div>
    <p>Address: {props.address}</p>
    <img id="card-img" src={props.img}/>
    
  
    </div>}
          </div>
        
    </div>
    )
   
}

export default Card;