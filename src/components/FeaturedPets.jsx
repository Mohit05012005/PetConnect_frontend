import React from "react";
import dog2 from "../assets/dog2.jpg";
import cat from "../assets/cat.jpg";
import dog from "../assets/dog.jpg"
const pets = [
  { id: 1, name: "Buddy", type: "Dog", img: dog },
  { id: 2, name: "Luna", type: "Cat", img: cat },
  { id: 3, name: "Rocky", type: "Dog", img: dog2 },
];

const FeaturedPets = () => {
  return (
    <section className="py-16 bg-gray-100">
      <h2 className="text-3xl font-bold text-center mb-10 text-teal-600">
        🏆 Featured Pets
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-6">
        {pets.map((pet) => (
          <div
            key={pet.id}
            className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition"
          >
            <img
              src={pet.img}
              alt={pet.name}
              className="w-full h-64 object-contain rounded-lg shadow-md"
            />
            <div className="p-4 text-center">
              <h3 className="text-xl font-semibold">{pet.name}</h3>
              <p className="text-gray-500">{pet.type}</p>
              <button className="mt-3 bg-teal-500 text-white px-4 py-2 rounded-full hover:bg-teal-600 transition">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedPets;
