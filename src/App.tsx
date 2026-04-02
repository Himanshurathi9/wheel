import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SpinPage from './pages/SpinPage';
import AdminPage from './pages/AdminPage';
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SpinPage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </BrowserRouter>
  );
}
