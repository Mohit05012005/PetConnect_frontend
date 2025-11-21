import { useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";
import { Camera, Loader2, ArrowLeft, PawPrint } from "lucide-react"; // Optional: install lucide-react for icons

const SellPet = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    PetName: "",
    Species: "",
    PetAge: "",
    Licence: "",
    PetImg: null,
    Address: "",
    PhoneNumber: "",
    petDescription: "",
  });

  const [previewImage, setPreviewImage] = useState(null); // For image preview
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "PetImg" && files[0]) {
      setFormData((prev) => ({ ...prev, PetImg: files[0] }));
      setPreviewImage(URL.createObjectURL(files[0])); // Show preview
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const data = new FormData();
      Object.keys(formData).forEach((key) => {
        if (formData[key] !== null && formData[key] !== "") {
          data.append(key, formData[key]);
        }
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
      setError("Failed to list your pet. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 py-12 px-4">
      {/* Back Button */}
      <div className="max-w-4xl mx-auto mb-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-teal-700 hover:text-teal-900 transition"
        >
          <ArrowLeft size={20} />
          <span>Back</span>
        </button>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-teal-500 to-emerald-600 text-white px-8 py-10 text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-white/20 backdrop-blur-sm rounded-full p-4">
                <PawPrint size={48} />
              </div>
            </div>
            <h1 className="text-4xl font-bold">List Your Pet for Sale</h1>
            <p className="mt-2 text-teal-50">Find a loving new home 🐾</p>
          </div>

          {/* Form Body */}
          <div className="p-8 md:p-12">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Image Upload with Preview */}
              <div className="flex flex-col items-center">
                <label className="block text-lg font-semibold text-gray-800 mb-4">
                  Pet Photo <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  {previewImage ? (
                    <img
                      src={previewImage}
                      alt="Pet preview"
                      className="w-64 h-64 object-cover rounded-2xl shadow-lg border-4 border-teal-100"
                    />
                  ) : (
                    <div className="w-64 h-64 bg-gray-100 border-4 border-dashed border-gray-300 rounded-2xl flex items-center justify-center">
                      <Camera size={48} className="text-gray-400" />
                    </div>
                  )}
                  <input
                    type="file"
                    name="PetImg"
                    accept="image/*"
                    onChange={handleChange}
                    required
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                </div>
                <p className="text-sm text-gray-500 mt-3">Click to upload a cute photo!</p>
              </div>

              {/* Grid for Form Fields */}
              <div className="grid md:grid-cols-2 gap-6">
                {["PetName", "Species", "PetAge", "PhoneNumber", "Address", "Licence"].map((field) => (
                  <div key={field}>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      {field.replace(/([A-Z])/g, " $1").trim()}
                      {["PetName", "Species", "PetAge", "PhoneNumber", "Address"].includes(field) && (
                        <span className="text-red-500"> *</span>
                      )}
                    </label>
                    <input
                      type={
                        field.includes("Age") || field.includes("Number")
                          ? "number"
                          : "text"
                      }
                      name={field}
                      value={formData[field]}
                      onChange={handleChange}
                      required={!["Licence"].includes(field)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-4 focus:ring-teal-200 focus:border-teal-500 transition"
                      placeholder={
                        field === "PetAge"
                          ? "e.g. 2 (in years)"
                          : field === "PhoneNumber"
                          ? "+91 9876543210"
                          : `Enter ${field.replace(/([A-Z])/g, " $1").toLowerCase()}`
                      }
                    />
                  </div>
                ))}
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Pet Description
                </label>
                <textarea
                  name="petDescription"
                  value={formData.petDescription}
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-4 focus:ring-teal-200 focus:border-teal-500 transition resize-none"
                  placeholder="Tell us about your pet's personality, habits, health, why you're selling, etc. ❤️"
                />
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl text-center font-medium">
                  ❌ {error}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white font-bold py-4 rounded-xl shadow-lg transform transition hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3 text-lg"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin" size={24} />
                    Listing Your Pet...
                  </>
                ) : (
                  <>
                    <PawPrint size={24} />
                    List Pet for Sale
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellPet;