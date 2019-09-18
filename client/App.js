import React from 'react';
import MapboxGLMap from './components/mapComponent';
import './styles/styles.scss';
import CardGrid from './components/cardsComponent';

const App = () => {
    return(
        <div>
        <div className="headline">
        <h1 className="main-heading">Vegan Yelp</h1>
        <input className="search"/>
        </div>
       <div className="map">
        <MapboxGLMap  />
        </div>
        <div className="cardGrid">
        <CardGrid />
        </div>
        </div>
    )
 
}

export default App;