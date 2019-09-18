import React, {useState} from 'react';





const CardGrid = () => {
    const [restaurantsData] = useState(aboutUsData)

    const membersArray = []

    for (let i = 0; i < 4; i++) {
      membersArray.push(
        <AboutTeamMembers
          name={restaurantsData.memberNames[i]}
          bio={restaurantsData.memberBios[i]}
          key={i}
        />
      )
    }
  

    return (
        <div className="cards-grid">
       {membersArray}
        </div>
    )
}

export default CardGrid;