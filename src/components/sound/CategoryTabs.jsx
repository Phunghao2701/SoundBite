import { CATEGORIES } from "../../data/sounds";

const CategoryTabs = ({ activeCategory, setCategory }) => {
  return (
    <div className="flex flex-wrap gap-3 mb-10 justify-center">
      {CATEGORIES.map((cat) => {
        const isActive = activeCategory === cat.query;
        return (
          <button
            key={cat.id}
            onClick={() => setCategory(cat.query)}
            className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
              isActive
                ? "bg-gradient-to-r from-primary to-secondary text-white neon-glow transform scale-105"
                : "bg-dark-800/80 text-gray-400 hover:text-white border border-white/5 hover:border-white/20 hover:bg-dark-700/80"
            }`}
          >
            {cat.name}
          </button>
        );
      })}
    </div>
  );
};
export default CategoryTabs;
