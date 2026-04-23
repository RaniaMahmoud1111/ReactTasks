import CardItem from "./CardItem";

export default function CardList({ products }) {
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-4">
        <div className="text-6xl">🔍</div>
        <p className="text-slate-400 text-lg font-medium">No products found in this category.</p>
        <p className="text-slate-600 text-sm">Try selecting a different category above.</p>
      </div>
    );
  }

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-16">
      {products.map((product) => (
        <CardItem key={product.id} product={product} />
      ))}
    </section>
  );
}
