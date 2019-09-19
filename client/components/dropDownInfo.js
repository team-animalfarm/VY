import React from 'react';

export const DropDownInfo = (props) => {

    return(
        <div className="info-link">
             <h5>Reviews: </h5>
    <p>
    {props.reviews[0].text}
    </p>
    </div>
    )
   
}