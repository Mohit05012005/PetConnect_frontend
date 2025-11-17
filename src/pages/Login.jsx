import { useState, useContext } from "react";
import { FcGoogle } from "react-icons/fc";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", formData); // ✅ Match Express route
      const token = res.data.token;
      login(token);
       navigate("/"); // Redirect to home
    } catch (err) {
      setError(err.response?.data?.message || "Login failed!");
    }
  };
  const transfer = (e)=>{
        navigate("/signup");
  }
  const logGoogle = (e)=>{
    window.open(API.defaults.baseURL+"/auth/google","_self");
  }


    useEffect(() => {
    // Extract query parameters from URL
    const params = new URLSearchParams(location.search);
    const token = params.get("token");

    if (token) {
      console.log("Token received:", token);
             login(token);
             navigate("/");
    } else {
      console.log("No token found in URL");
    }
  }, [location]);

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-teal-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl shadow-md w-80"
      >
        <h2 className="text-2xl font-bold mb-4 text-center text-teal-700">Login</h2>

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          value={formData.email}
          required
          className="w-full p-2 mb-3 border rounded"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          value={formData.password}
          required
          className="w-full p-2 mb-4 border rounded"
        />

        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

        <button
          type="submit"
          className="w-full bg-teal-600 text-white p-2 rounded hover:bg-teal-700"
        >
          Login
        </button>
      </form>
      <p className="flex flex-row gap-2">Create a new account <p onClick={transfer} className="text-blue-700">Sign up</p> </p>
  <button
  onClick={logGoogle}
  className="
  flex
  flex-row
   mt-4
   gap-3
  "
>
  <FcGoogle size={25} />
  <span className="font-medium">Sign in with Google</span>
</button>
    </div>
  );
};

export default Login;

