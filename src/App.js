import { BrowserRouter, Router, Routes } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Router>
          <Routes/>
        </Router>
      </BrowserRouter>
    </div>
  );
}

export default App;
