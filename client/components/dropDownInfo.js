import React from 'react';

export const DropDownInfo = (props) => {
   
    return(
        <div className="info-link">
            <p>Phone: {props.phone}</p>
             <h5 className="reviews-heading">Reviews: </h5>
             
    <p className="reviews">
    {props.reviews[0]}
    </p>
   
    </div>
    )
   
}