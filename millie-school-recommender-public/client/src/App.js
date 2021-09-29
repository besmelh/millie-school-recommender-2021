import './App.css';
import Home from './Pages/Home';
import Browse from './Pages/Browse';
import Folders from './Pages/Folders';
import Admin from './Pages/Admin';
import SchoolDetails from './Pages/SchoolDetails';

import NavBar from './Components/NavBar/NavBar';
import Footer from './Components/Footer/Footer';
import Container from '@material-ui/core/Container';
import {Route, Link} from 'react-router-dom';
import './Components/Other.css';
import { makeStyles } from '@material-ui/core/styles';



const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.up('lg')]: {
      maxWidth: '1200px',
    },
  },
}))

function App() {
  const classes = useStyles();

  return (
    <div className="App">
      <NavBar/>
      <Container className={classes.root}>
        <Route exact path="/" component={Home} />
        <Route exact path="/browse" component={Browse} />
        <Route exact path="/folders" component={Folders} />
        <Route exact path="/admin" component={Admin} />
        <Route exact path="/school-details/:millie_code" component={SchoolDetails} />
      </Container>
      <Footer/>
    </div>
  );
}

export default App;
