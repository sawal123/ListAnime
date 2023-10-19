import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { Route } from 'react-router-dom';


// import About from './page/About';
import List from './page/List';
import Layout from './page/Nav';
import Home from './page/Hom';
import NoPage from './page/NoPage';
import Episode from './page/Episode';

// import ReactDOM from "react-dom/client";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/list" element={<List />}></Route>
            <Route path="episode/:mal_id/:title" element={<Episode />}></Route>
            <Route path="/*" element={<NoPage />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
