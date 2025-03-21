import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminAuth from "./components/AdminAuth";
import Dashboard from "./components/Dashboard";
import { AuthProvider } from "./context/AuthContext";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<AdminAuth />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
