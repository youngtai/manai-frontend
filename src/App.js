import React from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import DrawerAppBar from "./DrawerAppBar.js";
import TrainPage from './pages/TrainPage.js';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DrawerAppBar/>}>
          <Route index element={<div>Home page</div>}/>
          <Route path="/train" element={<TrainPage/>}/>
          <Route path="/create" element={<div>Create images page</div>}/>
          <Route path="/explore" element={<div>Explore page</div>}/>
          <Route path="*" element={<div>404 Not Found</div>}/>
        </Route>
      </Routes>
    </Router>
  );
}
