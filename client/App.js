import React, {useEffect, useState, useRef, useLayoutEffect} from 'react';
import MapboxGLMap from './components/mapComponent';
import './styles/styles.scss';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CardGrid from './components/cardsComponent';
import {AppContext} from "./context"



const useStyles = makeStyles(theme => ({
    button: {
      margin: theme.spacing(1),
    },
    input: {
      display: 'none',
    },
  }));

const App = () => {
    const classes = useStyles();
    const [map, updateMap] = useState(null);
    const [cards, updateCards] = useState({});
    const [inputValue, updateValue] = useState(null);
    const [isModalOpen, setModalOpen] = useState(false);
    
 
    const handleEvent = (e) => {
      
        console.log(e.target.value)
        updateValue(e.target.value)
       console.log(inputValue);
    }

  


    const fetchData = () => {
      
       
      fetch(`/search/${inputValue}`)
       .then(response => response.json())
       .then(data => {
          console.log(data);
           updateCards(data);
       })
      }

       const handleClick = (e)=> {
         e.preventDefault();
        setModalOpen(isModalOpen ? false: true);
        fetchData();
      }


    return(
        <div>
        <div className="headline">
          
        <div>
        <h1 className="main-heading">PLANTfare</h1>
        </div>
        <div className="right-column">
            <form onSubmit={handleClick}>
        <input className="search" onChange={handleEvent}/>
        </form>
        <div>
     
     <Button onClick={handleClick} variant="contained" id="primary" className={classes.button}>
       Search
     </Button>
     <input
       accept="image/*"
       className={classes.input}
       id="contained-button-file"
       multiple
       type="file"
     />
   </div>
        </div>
        </div>
       <div className="map">
           <AppContext.Provider value={{...cards}}>
        <MapboxGLMap  />
        </AppContext.Provider>
        </div>
        <div className="cardGrid">
            <AppContext.Provider value={{...cards}}>
        {isModalOpen ? <CardGrid /> : null}
        </AppContext.Provider>
        </div>
        </div>
    )
 
}

export default App;