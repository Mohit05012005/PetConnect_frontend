import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/SignUp";
import Navbar from "./components/Navbar";
import PetDetail from "./pages/PetDetail";
import SellPet from "./pages/SellPet";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./components/Dashboard";
import Footer from "./components/Footer";
import HeroSection from "./components/HeroSection";
import FeaturedPets from "./components/FeaturedPets";
import AdoptionStories from "./components/AdoptionStories";
function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/pets/:id" element={<PetDetail />} />
          <Route
            path="/pets-sell"
            element={
              <ProtectedRoute>
                <SellPet />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/login/success" element={<Login />} />
        </Routes>
        <Footer />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
