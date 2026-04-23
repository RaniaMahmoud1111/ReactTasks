import { useEffect, useState } from "react";
import Card from "./Components/Card/Card";
export default function App() {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("all");

  // fetch data
  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data.products));
  }, []);

  // get categories
  const categories = ["all", ...new Set(products.map(p => p.category))];

  // filter
  const filteredProducts =
    category === "all"
      ? products
      : products.filter(p => p.category === category);

  return (
    <div className="p-6">
      {/* categories */}
      <div className="flex gap-3 mb-6 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={
              category === cat
                ? "category-btn-active"
                : "category-btn"
            }
          >
            {cat}
          </button>
        ))}

        
      </div>

      {/* cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filteredProducts.map((product) => (
          <Card key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}