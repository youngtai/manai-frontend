import React from "react";
import { ThemeProvider } from '@mui/material';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import DrawerAppBar from "./components/DrawerAppBar.js";
import TrainPage from './pages/TrainPage.js';
import CreatePage from './pages/CreatePage.js';
import { appTheme } from './themes/Theme.js';

export default function App() {
  return (
    <ThemeProvider theme={appTheme}>
      <Router>
        <Routes>
          <Route path="/" element={<DrawerAppBar/>}>
            <Route index element={<div>Home page</div>}/>
            <Route path="/train" element={<TrainPage/>}/>
            <Route path="/create" element={<CreatePage/>}/>
            <Route path="/explore" element={<div>Explore page</div>}/>
            <Route path="*" element={<div>404 Not Found</div>}/>
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}
