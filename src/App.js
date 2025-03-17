import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import './App.css';
import Home from './client-side/pages/home/home';
import { ThemeProvider } from './client-side/context/ThemeContext';
import './client-side/styles/theme/theme.css'

function App() {
  return (
    <ThemeProvider>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home />} />
          </Routes>
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
}

export default App;
