import React, {useEffect, useState} from 'react';
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
      
        updateValue(e.target.value)
       
    }

    const handleClick = ()=> {
      setModalOpen(isModalOpen ? false: true);
    }

   

    useEffect(()=> {
        const fetchData = async () => {
      
       
       fetch(`/search/${inputValue}`)
        .then(response => response.json())
        .then(data => {
            updateCards(data);
        })
   
      
   
       
    }
    fetchData();
}, [inputValue]);


    return(
        <div>
        <div className="headline">
          
        <div>
        <h1 className="main-heading">PLANTfare</h1>
        </div>
        <div className="right-column">
            <form onSubmit={handleEvent}>
        <input className="search" onSubmit={handleEvent}/>
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