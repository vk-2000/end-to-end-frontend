import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import ContentTypeBuilder from './pages/ContentTypeBuilder';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<ContentTypeBuilder />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
