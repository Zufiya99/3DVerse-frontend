import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminAuth from "./components/AdminAuth";
import Dashboard from "./components/Dashboard";
import { AuthProvider } from "./context/AuthContext";
import StudentDetails from "./components/StudentDetails";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<AdminAuth />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/student/:id" element={<StudentDetails />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
