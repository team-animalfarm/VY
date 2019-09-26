import React from 'react';
import OutdoorGrillIcon from '@material-ui/icons/OutdoorGrill';

export const DropDownInfo = (props) => {
    const reviewsArray= [];
   for(let i = 0; i < props.reviews.length; i++){
    reviewsArray.push(<li>{props.reviews[i][0]} : {props.reviews[i][1]} </li>)
   }
    return(
        <div className="info-link">
            <p>Phone: {props.phone}</p>
             <h5 className="reviews-heading">Reviews: </h5>
             
    <p className="reviews">
    {reviewsArray}
    </p>
   
    </div>
    )
   
}