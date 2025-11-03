import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../api/axios";
import one from "../assets/one.jpg";
const PetDetail = () => {
  const { id } = useParams(); // get the pet ID from URL
  const navigate = useNavigate();

  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchPet = async () => {
      try {
        const res = await API.get(`/pets/${id}`);
        setPet(res.data.data.value || {}); // store pet data
      } catch (err) {
        console.error("Error fetching pet details:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPet();
  }, [id]);

const requestPet = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    alert("Please log in to request a pet.");
    navigate("/login");
    return;
  }

  try {
    const res = await API.post(`/pets/request/${id}`);
    alert(res.data.message || "Request sent successfully!");
  } catch (err) {
    alert(err.response?.data?.message || "Failed to send request");
  }
};


  if (loading) return <div className="text-center mt-20">Loading pet details...</div>;

  if (!pet) return <div className="text-center mt-20 text-red-600">Pet not found</div>;

  return (
    <div className="p-6 bg-teal-50 min-h-screen">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 text-teal-700 hover:underline"
      >
        ← Back
      </button>

      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-6">
        <img
          src={pet.PetImg || one}
          alt={pet.PetName}
          className="w-full h-64 object-cover rounded-md mb-4"
        />
        <h1 className="text-3xl font-bold mb-2">{pet.PetName}</h1>
        <p className="text-gray-700 mb-1"><strong>Species:</strong> {pet.Species}</p>
        <p className="text-gray-700 mb-1"><strong>Age:</strong> {pet.PetAge} years</p>
        <p className="text-gray-700 mb-1"><strong>Owner:</strong> {pet.OwnerName}</p>
        <p className="text-gray-700 mb-1"><strong>Phone:</strong> {pet.PhoneNumber}</p>
        <p className="text-gray-700 mb-1"><strong>Email:</strong> {pet.mailAddress}</p>
        <p className="text-gray-700 mb-1"><strong>Address:</strong> {pet.Address}</p>
        <p className="text-gray-600 mt-4">{pet.petDescription}</p>
      </div>
        <button className="bg-blue-700 text-gray-300 p-[10px] rounded-lg hover:bg-blue-300" onClick={requestPet}>Request for the pet</button>
    </div>
  );
};

export default PetDetail;

