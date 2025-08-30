import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { AppProvider } from "./context/AppContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import { ThemeProvider } from "./context/ThemeProvider";

import Homes from "./pages/Homes";
import Specialties from "./pages/Specialties";
import DoctorsList from "./pages/DoctorsList";
import DoctorDetails from "./pages/DoctorDetails";

import "./App.css";
import DoctorRegister from "./pages/DoctorRegister";
import PatientRegister from "./pages/PatientRegister";
import Login from "./pages/Login";

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppProvider>
          <Router>
            <div className="min-h-screen flex flex-col ">
              <Navbar />
              <main className="flex-grow pt-16">
                <Routes>
                  <Route path="/" element={<Homes />} />

                  <Route path="/drregister" element={<DoctorRegister />} />
                  <Route path="/register" element={<PatientRegister />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/specialties" element={<Specialties />} />
                  <Route path="/doctors" element={<DoctorsList />} />
                  <Route path="/doctors/:id" element={<DoctorDetails />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </Router>
        </AppProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
