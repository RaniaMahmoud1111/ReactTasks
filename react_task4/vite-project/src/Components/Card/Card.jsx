import { useState } from "react";

export default function Card({ product }) {
  const [showMore, setShowMore] = useState(false);

  const shortText =
    product.description.slice(0, 60) + "...";

  return (
    <div className="border p-4 rounded shadow">
      <img
        src={product.thumbnail}
        alt={product.title}
        className="w-full h-40 object-cover"
      />

      <h2 className="font-bold mt-2">{product.title}</h2>

      <p className="text-sm">
        {showMore ? product.description : shortText}
      </p>

      <button
        onClick={() => setShowMore(!showMore)}
        className="text-blue-500 mt-2"
      >
        {showMore ? "Show Less" : "Show More"}
      </button>
    </div>
  );
}