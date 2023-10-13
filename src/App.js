import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { Route } from 'react-router-dom';


import About from './page/About';
import Layout from './page/Nav';
import Home from './page/Hom';
import NoPage from './page/NoPage';

// import ReactDOM from "react-dom/client";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />}></Route>
            <Route path="/*" element={<NoPage />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
