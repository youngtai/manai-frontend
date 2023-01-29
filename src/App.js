import {useState} from "react";
import { ThemeProvider } from '@mui/material';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import DrawerAppBar from "./components/DrawerAppBar.js";
import TrainPage from './pages/TrainPage.js';
import CreatePage from './pages/CreatePage.js';
import HomePage from './pages/HomePage.js';
import { lightTheme, darkTheme } from './themes/Theme.js';

export default function App() {
  const [theme, setTheme] = useState(lightTheme);

  function handleThemeChange(checkState) {
    if (checkState) {
      setTheme(darkTheme);
    } else {
      setTheme(lightTheme);
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<DrawerAppBar onThemeChange={handleThemeChange}/>}>
            <Route index element={<HomePage/>}/>
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
