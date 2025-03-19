import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import './App.css';
import Main from './client-side/pages/home/main';
import { ThemeProvider } from './client-side/context/ThemeContext';
import './client-side/styles/theme/theme.css'
import './client-side/styles/typography/typography.css'
import Nav from './client-side/pages/nav/nav';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

function App() {

  gsap.registerPlugin(ScrollTrigger);

  return (
    <ThemeProvider>
      <div className="App">
        <BrowserRouter>
        <Nav/>
          <Routes>
            <Route path='/' element={<Main />} />
          </Routes>
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
}

export default App;
