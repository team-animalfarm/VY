import React, {useState, Fragment} from 'react';
import MapboxGLMap from './components/mapComponent';
import './styles/styles.scss';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CardGrid from './components/cardsComponent';
import {AppContext} from "./context"
import EcoIcon from '@material-ui/icons/Eco';




const useStyles = makeStyles(theme => ({
    button: {
      margin: theme.spacing(1),
    },
    input: {
      display: 'none',
    },
  }));

// interface cards {
//   name: string;
//   address: string;
//   coordinates: Array<number>
//   reviews: Array<string>
// }

const App: React.FC = () => {
    const classes = useStyles({});

    const [cards, updateCards] =useState();
    const [inputValue, updateValue] = useState(null);
    const [isModalOpen, setModalOpen] = useState(false);
    
 
    const handleEvent = (e: React.ChangeEvent<HTMLInputElement>): void => {
        updateValue(e.target.value)
    }

  


    const fetchData = () => {
      fetch(`/search/${inputValue}`)
       .then(response => response.json())
       .then(data => {
          console.log(data);
           updateCards(data);
       })
      }

       const handleClick = (e: React.MouseEvent<HTMLButtonElement>): void => {
         e.preventDefault();
        setModalOpen(isModalOpen ? false: true);
        fetchData();
      }

      const handleSubmit = (e: React.FormEvent<HTMLFormElement>) : void => {
        e.preventDefault();
        setModalOpen(isModalOpen ? false: true);
        fetchData();
      }


    return(
      <Fragment>
        <div>
        <div className="headline">
          
        <div className="left-column">
        <h1 className="main-heading">Plantfare LA</h1>
        <EcoIcon className="eco-icon"></EcoIcon>
        </div>
        <div className="right-column">
            <form onSubmit={handleSubmit}>
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
        </Fragment>
    )
 
}

export default App;