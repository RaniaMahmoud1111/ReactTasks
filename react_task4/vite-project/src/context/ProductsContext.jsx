import { createContext, useContext, useState, useEffect } from "react";

const mockProducts = [
  {
    id: 1,
    title: "Wireless Noise-Cancelling Headphones",
    description:
      "Premium over-ear headphones with active noise cancellation, 30-hour battery life, and studio-quality sound. Perfect for music lovers, remote workers, and frequent travelers who demand the best audio experience.",
    price: 299.99,
    rating: 4.8,
    category: "electronics",
    thumbnail: "https://dummyjson.com/image/400x300/282828/ffffff?text=Headphones",
  },
  {
    id: 2,
    title: "Men's Classic Leather Watch",
    description:
      "Elegant timepiece with genuine leather strap, sapphire crystal glass, and Swiss automatic movement. Water-resistant up to 50 meters with a timeless design that suits any occasion.",
    price: 189.99,
    rating: 4.5,
    category: "mens-watches",
    thumbnail: "https://dummyjson.com/image/400x300/1a1a2e/ffffff?text=Watch",
  },
  {
    id: 3,
    title: "Professional Skincare Set",
    description:
      "Complete 5-step skincare routine featuring vitamin C serum, hyaluronic acid moisturizer, retinol eye cream, SPF 50 sunscreen, and gentle foaming cleanser. Dermatologist-tested and suitable for all skin types.",
    price: 124.99,
    rating: 4.6,
    category: "skin-care",
    thumbnail: "https://dummyjson.com/image/400x300/3d5a80/ffffff?text=Skincare",
  },
  {
    id: 4,
    title: "Ergonomic Gaming Chair",
    description:
      "High-back gaming chair with lumbar support cushion, 4D armrests, 180° reclining, and breathable mesh fabric. Designed for long gaming sessions with maximum comfort and posture support.",
    price: 449.99,
    rating: 4.7,
    category: "furniture",
    thumbnail: "https://dummyjson.com/image/400x300/0f3460/ffffff?text=Chair",
  },
  {
    id: 5,
    title: "4K Ultra HD Smart TV 55\"",
    description:
      "Stunning 55-inch QLED display with Dolby Vision, HDR10+, built-in Alexa, Apple AirPlay, and a 120Hz refresh rate. Enjoy crisp visuals and seamless streaming with the latest smart TV technology.",
    price: 799.99,
    rating: 4.9,
    category: "electronics",
    thumbnail: "https://dummyjson.com/image/400x300/16213e/ffffff?text=Smart+TV",
  },
  {
    id: 6,
    title: "Women's Athletic Running Shoes",
    description:
      "Lightweight performance running shoes with responsive foam cushioning, breathable mesh upper, and durable rubber outsole. Engineered for road running and everyday training with excellent energy return.",
    price: 119.99,
    rating: 4.4,
    category: "womens-shoes",
    thumbnail: "https://dummyjson.com/image/400x300/e94560/ffffff?text=Shoes",
  },
  {
    id: 7,
    title: "Stainless Steel Cookware Set",
    description:
      "12-piece professional cookware set including pots, pans, lids, and utensils. Features triple-layer stainless steel construction, induction-compatible base, and dishwasher-safe design for effortless cleanup.",
    price: 229.99,
    rating: 4.3,
    category: "home-decoration",
    thumbnail: "https://dummyjson.com/image/400x300/533483/ffffff?text=Cookware",
  },
  {
    id: 8,
    title: "Luxury Perfume Collection",
    description:
      "Exquisite fragrance set featuring three signature scents: floral, woody, and citrus. Long-lasting eau de parfum crafted with premium ingredients from France. Perfect as a gift or personal indulgence.",
    price: 159.99,
    rating: 4.6,
    category: "fragrances",
    thumbnail: "https://dummyjson.com/image/400x300/a8326b/ffffff?text=Perfume",
  },
];

export const ProductsContext = createContext(null);

export function ProductsProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [usingFallback, setUsingFallback] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch("https://dummyjson.com/products?limit=80");
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();
        setProducts(data.products);
        setUsingFallback(false);
      } catch (err) {
        console.warn("Fetch failed, using mock data:", err.message);
        setProducts(mockProducts);
        setError(err.message);
        setUsingFallback(true);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <ProductsContext.Provider value={{ products, loading, error, usingFallback }}>
      {children}
    </ProductsContext.Provider>
  );
}

export function useProducts() {
  const ctx = useContext(ProductsContext);
  if (!ctx) throw new Error("useProducts must be used within ProductsProvider");
  return ctx;
}
