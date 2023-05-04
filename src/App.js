
import './App.css';
import "primereact/resources/themes/lara-light-indigo/theme.css";  
import 'bootstrap/dist/css/bootstrap.min.css'; 
import { Button } from 'primereact/button';  
import One from './components/One';
import Data from './tables/Data';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Navbar from './Navbar';
import ScreenData from './screen/ScreenData';
import Home from './Home';






function App() {
  return (
    <>
      <div>
      
      
      {/* <Navbar/> */}
        <BrowserRouter>
        <Routes>
        <Route path="/" exact element={<Home/>}/>
        <Route path="/table1" exact element={<One/>}/>
        <Route path="/table2" exact element={<Data/>}/>
        <Route path="/table3" exact element={<ScreenData/>}/>

        </Routes>

        </BrowserRouter>
      </div>
    </>
    
  );
}

export default App;
