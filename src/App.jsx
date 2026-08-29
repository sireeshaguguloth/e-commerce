import React from 'react';
import LandingPage from './stores/pages/LandingPage.jsx';
import "./App.css";
import { Routes,Route} from 'react-router-dom'
import MobilePage from './stores/pages/MobilePage.jsx';
import ComputerPage from './stores/pages/ComputerPage.jsx';
import WatchePage from './stores/pages/WatchePage.jsx';
import FurniturePage from './stores/pages/FurniturePage.jsx'
import AcPage from './stores/pages/AcPage.jsx';
import FridgePage from './stores/pages/FridgePage.jsx';
import MenPage from './stores/pages/MenPage.jsx';
import WomanPage from './stores/pages/WomanPage.jsx';
import KitchenPage from './stores/pages/KitchenPage.jsx';
import TvPage from './stores/pages/TvPage.jsx';
import BookPage from './stores/pages/BookPage.jsx';
import SpeakerPage from './stores/pages/SpeakerPage.jsx';
import MobileSingle from './singles/MobileSingle.jsx';
import BookSingle from './singles/BookSingle.jsx';
import AcSingle from './singles/AcSingle.jsx';
import ComputerSingle from './singles/ComputerSingle.jsx';
import FridgeSingle from './singles/FridgeSingle.jsx';
import FurnitureSingle from './singles/FurnitureSingle.jsx';
import MenSingle from './singles/MenSingle.jsx';
import WatchSingle from './singles/WatchSingle.jsx';
import WomanSingle from './singles/WomanSingle.jsx';
import KitchenSingle from './singles/KitchenSingle.jsx';
import TvSingle from './singles/TvSingle.jsx';
import SpeakerSingle from './singles/SpeakerSingle.jsx';
import UserCart from './stores/UserCart.jsx';
const App = () =>{
  return(
    <div>
      <Routes>
        <Route path='/' element={<LandingPage />}></Route>
        <Route path='/mobiles' element={<MobilePage />}></Route>
        <Route path='/computers' element={<ComputerPage/>}></Route>
        <Route path='/watches' element={<WatchePage/>}></Route>
        <Route path='/furnitures' element={<FurniturePage/>}></Route>
        <Route path='/ac' element={<AcPage/>}></Route>
        <Route path='/fridge' element={<FridgePage/>}></Route>
        <Route path='/men' element={<MenPage />}></Route>
        <Route path='/woman' element={<WomanPage />}></Route>
        <Route path='/kitchen' element={<KitchenPage />}></Route>
        <Route path='/tv' element={<TvPage />}></Route>
        <Route path='/books' element={<BookPage />}></Route>
        <Route path='/speakers' element={<SpeakerPage />}></Route>
        
        {/* Single Product Routes */}
        <Route path='/mobiles/:id' element={<MobileSingle />}></Route>
        <Route path='/books/:id' element={<BookSingle />}></Route>
        <Route path='/ac/:id' element={<AcSingle />}></Route>
        <Route path='/computers/:id' element={<ComputerSingle />}></Route>
        <Route path='/fridge/:id' element={<FridgeSingle />}></Route>
        <Route path='/furnitures/:id' element={<FurnitureSingle />}></Route>
        <Route path='/men/:id' element={<MenSingle />}></Route>
        <Route path='/watches/:id' element={<WatchSingle />}></Route>
        <Route path='/woman/:id' element={<WomanSingle />}></Route>
        <Route path='/kitchen/:id' element={<KitchenSingle />}></Route>
        <Route path='/tv/:id' element={<TvSingle />}></Route>
        <Route path='/speakers/:id' element={<SpeakerSingle />}></Route>
        
        <Route path='/cart' element={<UserCart />}></Route>
      </Routes>
    </div>
  )
} 
export default App;