import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DashboardRoutes from './routes/DashboardRoutes.jsx';

import Login from './pages/login/Login.jsx';
import Admin from './pages/admin/Admin.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<DashboardRoutes />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin/*" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
