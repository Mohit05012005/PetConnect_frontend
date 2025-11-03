import React from "react";
import story1 from "../assets/story1.jpg";
import story2 from "../assets/story2.jpg";
import story3 from "../assets/story3.jpg";
const stories = [
  {
    id: 1,
    name: "Charlie & Mia",
    story: "Mia found her best friend in Charlie. They’ve been inseparable ever since!",
    img: story1,
  },
  {
    id: 2,
    name: "Max & Asha",
    story: "Asha rescued Max, and now they share a home filled with love and joy.",
    img: story3,
  },
];

const AdoptionStories = () => {
  return (
    <section className="py-16 bg-white">
      <h2 className="text-3xl font-bold text-center mb-10 text-teal-600">
        ❤️ Adoption Success Stories
      </h2>
      <div className="max-w-6xl mx-auto grid sm:grid-cols-2 gap-10 px-6">
        {stories.map((s) => (
          <div
            key={s.id}
            className="bg-gray-100 rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition"
          >
            <img src={s.img} alt={s.name} className="w-full h-64 object-contain rounded-lg shadow-md" />
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">{s.name}</h3>
              <p className="text-gray-600">{s.story}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AdoptionStories;
