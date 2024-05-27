import React , {useState} from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Register from './pages/register';
import Home from './pages/home';
import Signin from './pages/signin';
import Index from './pages/indexpage';
import SellProperty from './pages/sellProperty'
import MyProfile from './components/MyProfile'
import UpdateProduct from './components/updateProduct'
import SellerPage from './components/sellerPage';


// Create the context
export const BuyerIdContext = React.createContext();

function App() {

    const [buyerId, setBuyerId] = useState(null);

  return (
    <div className="App">
    <BuyerIdContext.Provider value={{ buyerId, setBuyerId }}> 

            <Routes>
                <Route exact path='/' element={<Index />}/>
                <Route path='/home/:id' element={<Home/>}/>
                <Route path='/register' element={<Register/>}/>
                <Route path='/signinbuyer' element={<Signin/>}/>
                <Route path='/myprofile/:id' element={<MyProfile/>}/>
                <Route path='/update/:id' element={<UpdateProduct/>}/>
                <Route path='/sellerpage/:id' element={<SellerPage/>}/>
                <Route path='/sellProperty/:id' element={<SellProperty/>}/>
            

            </Routes>

    </BuyerIdContext.Provider> 
    </div>
  );
}



export default App;

