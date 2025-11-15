import { useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";

const SellPet = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    PetName: "",
    OwnerName: "",
    Species: "",
    PetAge: "",
    Licence: "",
    PetImg: null, // Image file (not string)
    Address: "",
    PhoneNumber: "",
    mailAddress: "",
    petDescription: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // handle input change
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "PetImg") {
      setFormData((prev) => ({ ...prev, PetImg: files[0] })); // store file object
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Prepare multipart form data
      const data = new FormData();
      Object.keys(formData).forEach((key) => {
        data.append(key, formData[key]);
      });

      const res = await API.post("/pets", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data.status === "success") {
        alert("🐾 Your pet has been listed successfully!");
        navigate("/");
      }
    } catch (err) {
      console.error(err);
      setError("❌ Failed to list your pet. Please check all details and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-teal-50 to-green-50">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-2xl">
        <h1 className="text-3xl font-bold text-center text-teal-700 mb-6">
          🐶 Sell Your Pet
        </h1>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
          
          {Object.keys(formData).map((key) => (
            <div key={key}>
              <label className="block text-gray-700 font-semibold mb-1 capitalize">
                {key.replace(/([A-Z])/g, " $1")}
              </label>

              {key === "PetImg" ? (
                // Image Upload Input
                <input
                  type="file"
                  name="PetImg"
                  accept="image/*"
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-2 rounded-lg"
                  required
                />
              ) : (
                // Normal Inputs
                <input
                  type={
                    key.toLowerCase().includes("age") ||
                    key.toLowerCase().includes("number")
                      ? "number"
                      : "text"
                  }
                  name={key}
                  value={formData[key] || ""}
                  onChange={handleChange}
                  required={!["Licence"].includes(key)} // Licence optional
                  className="w-full border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-teal-500"
                  placeholder={`Enter ${key.replace(/([A-Z])/g, " $1").toLowerCase()}`}
                />
              )}
            </div>
          ))}

          {error && <p className="text-red-500 text-center">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-teal-600 text-white py-2 rounded-lg hover:bg-teal-700 transition duration-300 mt-4"
          >
            {loading ? "Listing Pet..." : "Sell Pet"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SellPet;


