import React, {useState, useContext, useEffect} from 'react';
import { DropDownInfo } from './dropDownInfo';
import MenuIcon from '@material-ui/icons/Menu';
import { AppContext } from '../context';


const Card = (props) => {
    const [isModalOpen, setModalOpen] = useState(false);
    const value = useContext(AppContext);
    const [heading, setHeading] = useState(null);
    const [address, setAddress] = useState(null);
    const [reviews, setReviews] = useState(null);
    console.log(value.data.geoLocatedCoordinates);
    
    useEffect(() => {

        const renderObj = value.data.closestPlaces;
        for(let i = 0; i < renderObj.length; i++){
            setHeading(renderObj[i].name)
            setAddress(renderObj[i].address)
            // for(let j = 0; renderObj[i].reviews.length; j++){
            //     setReviews(renderObj[i].reviews[j])
            // }
        }
       
        // setReviews(value.data.closestPlaces[0].reviews.map(el => ))
    })

    const handleDropDownClick = () => {
        setModalOpen(isModalOpen ? false: true);
    }
    
    return (
        <div className="cards">
    
    <div className="card-render">
    <MenuIcon onClick={handleDropDownClick} id="hamburger-menu" className="material-icons"></MenuIcon>
          {isModalOpen ? <DropDownInfo /> : 
    <div className="no-render">
          <h3 className="card-heading">
        {heading}
    </h3>
    <p>Address: {address}</p>
    <p>Reviews: {reviews}</p>
    </div>}
          </div>
        
    </div>
    )
   
}

export default Card;