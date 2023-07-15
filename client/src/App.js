import './App.css';
import {BrowserRouter as Router} from "react-router-dom";
import AllRoutes from "./AllRoutes";
import Container from '@mui/material/Container';

function App() {
  return (
    <div className="App">
      {/* sm md lg xl */}
    <Container maxWidth="lg" className="compoundPage">
        <Router>
    <AllRoutes /> 
    </Router> 
      </Container>
    </div>
  );
}

export default App;
