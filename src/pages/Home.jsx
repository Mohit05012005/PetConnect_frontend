import { useEffect, useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";
import HeroSection from "../components/HeroSection";
import FeaturedPets from "../components/FeaturedPets";
import AdoptionStories from "../components/AdoptionStories";
const Home = () => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPets = async () => {
      try {
        // ✅ Fetch from your backend route
        const res = await API.get("/pets"); 
        // Adjust to your backend response
        setPets(res.data.data || []);
      } catch (err) {
        console.error("Error fetching pets:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPets();
  }, []);

  if (loading) return <div className="text-center mt-20">Loading pets...</div>;

  return (
    <>
       <HeroSection/>
        <div className="p-6 bg-teal-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-teal-700">🐾 Available Pets</h1>
        <button
          onClick={() => navigate("/pets-sell")}
          className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700"
        >
          + Sell Pet
        </button>
      </div>

      {pets.length === 0 ? (
        <p className="text-gray-600">No pets available right now.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {pets.map((pet) => (
            <div
              key={pet._id}
              className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg cursor-pointer"
              onClick={() => navigate(`/pets/${pet._id}`)} // for single pet page later
            >
              <img
                src={`${API.defaults.baseURL}/${pet.PetImg}` || "https://placehold.co/300x200"}
                alt={pet.PetName}
                className="w-full h-40 object-cover rounded-md mb-3"
              />
              <h2 className="text-xl font-semibold">{pet.PetName}</h2>
              <p className="text-gray-600">Species: {pet.Species}</p>
              <p className="text-gray-700 font-semibold mt-1">
                Age: {pet.PetAge} years
              </p>
              <p className="text-gray-500 text-sm mt-1">
                Location: {pet.Address}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
    <FeaturedPets/>
    <AdoptionStories/>
    </>

  );
};

export default Home;
