import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [myPets, setMyPets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUser(userData);
      fetchMyPets(userData.email); // or userData._id depending on backend
    } else {
      navigate("/login");
    }
  }, []);

  const fetchMyPets = async (email) => {
    try {
      const res = await API.get(`/auth/mail`);
      setMyPets(res.data.data || []);
    } catch (err) {
      console.error("Error fetching user pets:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  if (loading)
    return <div className="text-center mt-20 text-gray-600">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* User Info Section */}
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-6 mb-8">
        <h1 className="text-2xl font-semibold text-teal-700 mb-4">👤 My Profile</h1>
        {user ? (
          <div className="text-gray-700 space-y-2">
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>User ID:</strong> {user._id}</p>
          </div>
        ) : (
          <p className="text-gray-500">No user data found.</p>
        )}
        <button
          onClick={handleLogout}
          className="mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
        >
          Logout
        </button>
      </div>

      {/* My Pets Section */}
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-teal-700">🐾 My Pets for Sale</h2>
          <button
            onClick={() => navigate("/sellpet")}
            className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg"
          >
            + Add New Pet
          </button>
        </div>

        {myPets.length === 0 ? (
          <p className="text-gray-500">You haven’t listed any pets yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {myPets.map((pet) => (
              <div
                key={pet._id}
                className="bg-gray-50 p-4 rounded-xl shadow hover:shadow-md transition cursor-pointer"
                onClick={() => navigate(`/pets/${pet._id}`)}
              >
                <img
                  src={pet.PetImg || "https://placehold.co/300x200"}
                  alt={pet.PetName}
                  className="w-full h-40 object-cover rounded-md mb-3"
                />
                <h3 className="font-semibold text-lg">{pet.PetName}</h3>
                <p className="text-gray-600 text-sm">
                  {pet.Species} • {pet.PetAge} years
                </p>
                <p className="text-gray-500 text-sm mt-1">{pet.Address}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
