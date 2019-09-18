import * as React from 'react';
import MapboxGLMap from './components/mapComponent';
import './styles/styles.scss';
import CardGrid from './components/cardsComponent';
// require("/Users/Admin/Desktop/VY/build/images/c8acc68c1918e76d34e4812b9c2132fc-plant-based-two.jpg");

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