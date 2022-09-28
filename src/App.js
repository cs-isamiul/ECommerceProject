
//import './App.css'; 
//TODO: add CSS styling
import React from 'react';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Catalog from './components/catalogRoutes/Catalog';
import Home from './components/Home';
import Error from './components/Error';
import Cart from './components/shoppingCart/Cart';

function App() {
  return (
      <div>
        <Router>
          <Routes>
           <Route exact path='/' element={<Home/>} />
           <Route path='/catalog' element={<Catalog/>} />
           <Route path='/cart' element={<Cart/>} />
           <Route path='*' element={<Error/>} />
          </Routes>
        </Router>
      </div>
  )
}

export default App