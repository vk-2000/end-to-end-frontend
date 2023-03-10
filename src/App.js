import './App.css';
import {
  BrowserRouter, Navigate, Route, Routes,
} from 'react-router-dom';
import Login from './pages/Login';
import ContentTypeBuilder from './pages/ContentTypeBuilder';
import Collection from './pages/Collection';
import Error from './pages/Error';
import Register from './pages/Register';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<ContentTypeBuilder />} />
          <Route path="/collections/:contentId" element={<Collection />} />
          <Route path="/error/:errorCode?" element={<Error />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
